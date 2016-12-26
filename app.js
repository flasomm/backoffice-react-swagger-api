(function () {
    'use strict';

    var MongoClient = require('mongodb').MongoClient;
    var SwaggerExpress = require('swagger-express-mw');
        var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
    var jwt = require('jsonwebtoken');
    var app = require('express')();
    var config = require('config');

    var swaggerConfig = {
        appRoot: __dirname,
        mapErrorsToJson: true,
        swaggerSecurityHandlers: {
            api_key: function (req, authOrSecDef, scopes, next) {
                if (scopes) {
                    jwt.verify(scopes, config.get('jwtSecret'), {}, function(err) {
                        if(err) {
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

    SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
        if (err) {
            throw err;
        }

        // Add swagger-ui (This must be before swaggerExpress.register)
        app.use(SwaggerUi(swaggerExpress.runner.swagger));
        // Add headers
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Content-Type', 'application/json');
            next();
        });

        // install middleware
        swaggerExpress.register(app);

        // Create a MonboDB connection pool and start the Node.js app
        let db = config.get('database');
        let host = config.get('api.host') || localhost;
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