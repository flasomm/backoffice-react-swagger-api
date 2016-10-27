(function () {
    'use strict';

    var MongoClient = require('mongodb').MongoClient;
    var SwaggerExpress = require('swagger-express-mw');
    var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
    var app = require('express')();
    module.exports = app; // for testing

    var config = {
        appRoot: __dirname // required config
    };

    SwaggerExpress.create(config, function (err, swaggerExpress) {
        if (err) {
            throw err;
        }

        // Add swagger-ui (This must be before swaggerExpress.register)
        app.use(SwaggerUi(swaggerExpress.runner.swagger));

        // Add headers
        app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Website you wish to allow to connect
            res.setHeader('Content-Type', 'application/json');
            // Pass to next layer of middleware
            next();
        });

        // install middleware
        swaggerExpress.register(app);

        // Create a MonboDB connection pool and start the Node.js app
        let config = require('config');
        let db = config.db;
        let port = config.server.port || 8000;

        MongoClient.connect(db)
            .catch(err => console.error(err.stack))
            .then(db => {
                app.locals.db = db;
                app.listen(port, () => {
                    console.log('App is listening at port %d', port);
                });
            });

    });
}());