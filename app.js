(function () {
    'use strict';

    const MongoClient = require('mongodb').MongoClient;
    const SwaggerExpress = require('swagger-express-mw');
    const jwt = require('jsonwebtoken');
    const express = require('express');
    const config = require('config');
    const path = require('path');
    const app = new express();

    let swaggerConfig = {
        appRoot: __dirname,
        mapErrorsToJson: true,
        swaggerSecurityHandlers: {
            api_key: (req, authOrSecDef, scopes, next) => {
                if (scopes) {
                    jwt.verify(scopes, config.get('jwtSecret'), {}, (err) => {
                        if (err) {
                            return cb(new Error('Invalid token'));
                        }
                        next();
                    });
                } else {
                    next(new Error('Unauthorized'));
                }
            }
        }
    };

    SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
        if (err) {
            throw err;
        }

        app.use(express.static(path.join(__dirname, 'api', 'swagger')));
        // Add headers
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.header("Access-Control-Allow-Headers", "Content-Type, X-API-KEY, Authorization");
            res.header('Content-Type', 'application/json; charset=utf-8');
            next();
        });

        // install middleware
        swaggerExpress.register(app);

        // Create a MonboDB connection pool and start the Node.js app
        let db = config.get('database');
        let host = config.get('api.host') || 'localhost';
        let port = config.get('api.port') || 8000;

        MongoClient.connect(db)
            .catch(err => console.error(err.stack))
            .then(db => {
                app.locals.db = db;
                app.listen(port, host, () => {
                    console.log('App is listening at port %d', port);
                });
            });
    });
}());