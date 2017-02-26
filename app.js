(function () {
    'use strict';

    const MongoClient = require('mongodb').MongoClient;
    const SwaggerExpress = require('swagger-express-mw');
    const SwaggerUi = require('swagger-tools/middleware/swagger-ui');
    const jwt = require('jsonwebtoken');
    const app = require('express')();
    const config = require('config');

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

        // Add swagger-ui (This must be before swaggerExpress.register)
        app.use(SwaggerUi(swaggerExpress.runner.swagger));
        // Add headers
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.header('Content-Type', 'application/json');
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