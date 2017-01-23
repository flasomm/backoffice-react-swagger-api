'use strict';

const Promise = require('es6-promise').Promise;
const mongo = require('mongodb');
const winston = require('winston');
const jwt = require('jsonwebtoken');
const config = require('config');
const crypto = require('crypto');
const _ = require('lodash');

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    login: login,
    validateToken: validateToken
};

/**
 * Get all users for pagination with skip and limit.
 *
 * @param req
 * @param res
 */
function getUsers(req, res) {
    let skip = req.swagger.params.skip.value;
    let limit = req.swagger.params.limit.value;
    let queryUsers = new Promise((resolve, reject) => {
        const db = req.app.locals.db;
        db.collection('users').find({}, {skip: skip, limit: limit}).toArray((err, docs) => {
            if (err) {
                return reject(err);
            }
            resolve(docs);
        });
    });

    queryUsers.then((docs) => {
        res.json(docs);
    }).catch((error) => {
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
    let uid = req.swagger.params.uid.value;
    let oid = new mongo.ObjectID(uid);
    let queryUser = new Promise((resolve, reject) => {
        const db = req.app.locals.db;
        db.collection('users').findOne({_id: oid}, (err, doc) => {
            if (err) {
                return reject(err);
            }
            resolve(doc);
        });
    });

    queryUser.then((doc) => {
        if (doc === null) {
            res.status(404).json({'message': 'User not found'});
        }
        res.json(doc);
    }).catch((error) => {
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
    let user = req.swagger.params.user.value;
    user.created = new Date();
    user.updated = new Date();
    user.status = 1;
    user.activated = false;
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');

    let queryAdd = new Promise((resolve, reject) => {
        const db = req.app.locals.db;
        db.collection('users').insertOne(user, (err, r) => {
            if (err) {
                return reject(err);
            }
            resolve(r.insertedCount);
        });
    });

    queryAdd.then((count) => {
        if (count === 1) {
            res.json(user);
        }
    }).catch((error) => {
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
    let uid = req.swagger.params.uid.value;
    let user = req.swagger.params.user.value;
    let oid = new mongo.ObjectID(uid);
    user.updated = new Date();
    if (!_.isNil(user.password)) {
        user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    }

    let queryUpdate = new Promise((resolve, reject) => {
        const db = req.app.locals.db;
        db.collection('users').findOneAndUpdate({_id: oid},
            {$set: user},
            {returnOriginal: false}, (err, r) => {
                if (err) {
                    return reject(err);
                }
                resolve(r);
            });
    });

    queryUpdate.then((r) => {
        if (r.lastErrorObject.n === 1) {
            res.json(r.value);
        } else if (r.value === null) {
            res.status(404).json({'message': 'User not found'});
        }
    }).catch((error) => {
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
    let uid = req.swagger.params.uid.value;
    let oid = new mongo.ObjectID(uid);
    let queryDelete = new Promise(function (resolve, reject) {
        const db = req.app.locals.db;
        db.collection('users').findOneAndDelete({_id: oid}, (err, r) => {
            if (err) {
                return reject(err);
            }
            resolve(r);
        });
    });

    queryDelete.then((r) => {
        if (r.lastErrorObject.n === 1) {
            res.json(r.value);
        } else if (r.value === null) {
            res.status(404).json({'message': 'User not found'});
        }

    }).catch((error) => {
        winston.error(error.message);
        res.status(500).json({'code': error.code, 'message': error.message});
    });
}

/**
 * Log in user to system.
 *
 * @param req
 * @param res
 */
function login(req, res) {
    let credential = req.swagger.params.credential.value;
    let hash = crypto.createHash('sha256').update(credential.password).digest('hex');
    let queryUser = new Promise(function (resolve, reject) {
        const db = req.app.locals.db;
        db.collection('users').findOne(
            {email: credential.email, password: hash, active: true},
            (err, doc) => {
                if (err) {
                    return reject(err);
                }
                resolve(doc);
            });
    });

    queryUser.then((doc) => {
        if (doc === null) {
            res.status(404).json({'message': 'User not found'});
        } else {
            let profile = {
                id: doc._id,
                username: doc.username,
                firstname: doc.firstname,
                lastname: doc.lastname,
                email: doc.email
            };
            let token = jwt.sign(profile, config.jwtSecret, {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            });

            res.json({
                id: profile.id,
                username: profile.username,
                token: token
            });
        }
    }).catch((error) => {
        winston.error(error.message);
        res.status(500).json({'code': error.code, 'message': error.message});
    });
}

/**
 * Validate jwt token.
 *
 * @param req
 * @param res
 */
function validateToken(req, res) {
    let body = req.swagger.params.jwt.value;
    jwt.verify(body.token, config.jwtSecret, (err, user) => {
        if (err) {
            res.status(401).json({'code': 1, 'message': err.message});
        }
        if (user) {
            let oid = new mongo.ObjectID(user.id);
            let queryUser = new Promise((resolve, reject) => {
                const db = req.app.locals.db;
                db.collection('users').findOne({_id: oid}, (err, doc) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(doc);
                });
            });

            queryUser.then((doc) => {
                if (doc === null) {
                    res.status(404).json({'message': 'User not found'});
                }
                res.json({
                    token: body.token
                });


            }).catch((error) => {
                winston.error(error.message);
                res.status(500).json({'code': error.code, 'message': error.message});
            });
        }
    })
}