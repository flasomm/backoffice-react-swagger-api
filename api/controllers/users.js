'use strict';

var Promise = require('es6-promise').Promise;
var mongo   = require('mongodb');
var config  = require('config');
var winston = require('winston');

module.exports = {
    getUsers   : getUsers,
    getUserById: getUserById,
    addUser    : addUser,
    updateUser : updateUser,
    deleteUser : deleteUser
};

/**
 * Get all users for pagination with skip and limit.
 *
 * @param req
 * @param res
 */
function getUsers(req, res) {
    var skip       = req.swagger.params.skip.value;
    var limit      = req.swagger.params.limit.value;
    var queryUsers = new Promise(function (resolve, reject) {
        const db = req.app.locals.db;
        db.collection('users').find({}, {skip: skip, limit: limit}).toArray(function (err, docs) {
            if (err) return reject(err);
            resolve(docs);
        });
    });

    queryUsers.then(function (docs) {
        res.json(docs);
    }).catch(function (error) {
        winston.error(error.message);
        res.status(500).json({'code': error.code, 'message': error.message});
    });
}

/**
 * Get a user by id.
 *
 * @param req
 * @param res
 */
function getUserById(req, res) {
    var uid       = req.swagger.params.uid.value;
    var oid       = new mongo.ObjectID(uid);
    var queryUser = new Promise(function (resolve, reject) {
        const db = req.app.locals.db;
        db.collection('users').findOne({_id: oid}, function (err, doc) {
            if (err) return reject(err);
            resolve(doc);
        });
    });

    queryUser.then(function (doc) {
        if (doc === null) {
            res.status(404).json({'message': 'User not found'});
        }
        res.json(doc);
    }).catch(function (error) {
        winston.error(error.message);
        res.status(500).json({'code': error.code, 'message': error.message});
    });
}

/**
 * Add a user.
 *
 * @param req
 * @param res
 */
function addUser(req, res) {
    var user       = req.swagger.params.user.value;
    user.created   = new Date();
    user.updated   = new Date();
    user.status    = 1;
    user.activated = 0;
    var queryAdd   = new Promise(function (resolve, reject) {
        const db = req.app.locals.db;
        db.collection('users').insertOne(user, function (err, r) {
            if (err) return reject(err);
            resolve(r.insertedCount);
        });
    });

    queryAdd.then(function (count) {
        if (count === 1) {
            res.json(user);
        }
    }).catch(function (error) {
        if (error.code === 11000) {
            res.status(409).json({'message': 'Duplicate email'});
        }
        winston.error(error.message);
        res.status(500).json({'code': error.code, 'message': error.message});
    });
}

/**
 * Update a user by id.
 *
 * @param req
 * @param res
 */
function updateUser(req, res) {
    var uid         = req.swagger.params.uid.value;
    var user        = req.swagger.params.user.value;
    var oid         = new mongo.ObjectID(uid);
    user.updated    = new Date();
    var queryUpdate = new Promise(function (resolve, reject) {
        const db = req.app.locals.db;
        db.collection('users').findOneAndUpdate({_id: oid},
            {$set: user},
            {
                returnOriginal: false
            }, function (err, r) {
                if (err) return reject(err);
                resolve(r);
            });
    });

    queryUpdate.then(function (r) {
        if (r.lastErrorObject.n === 1) {
            res.json(r.value);
        } else if (r.value === null) {
            res.status(404).json({'message': 'User not found'});
        }
    }).catch(function (error) {
        if (error.code === 11000) {
            res.status(409).json({'message': 'Duplicate email'});
        }
        winston.error(error.message);
        res.status(500).json({'code': error.code, 'message': error.message});
    });
}

/**
 * Delete a user by id.
 *
 * @param req
 * @param res
 */
function deleteUser(req, res) {
    var uid         = req.swagger.params.uid.value;
    var oid         = new mongo.ObjectID(uid);
    var queryDelete = new Promise(function (resolve, reject) {
        const db = req.app.locals.db;
        db.collection('users').findOneAndDelete({_id: oid}, function (err, r) {
            if (err) return reject(err);
            resolve(r);
        });
    });

    queryDelete.then(function (r) {
        if (r.lastErrorObject.n === 1) {
            res.json(r.value);
        } else if (r.value === null) {
            res.status(404).json({'message': 'User not found'});
        }

    }).catch(function (error) {
        winston.error(error.message);
        res.status(500).json({'code': error.code, 'message': error.message});
    });
}