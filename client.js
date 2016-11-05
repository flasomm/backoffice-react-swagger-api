#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const Express = require('express');
const webpack = require('webpack');
const config = require('./config/webpack.config');

const isDeveloping = process.env.NODE_ENV !== 'prod';
const serverOptions = {
    contentBase: 'src',
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: true,
        chunkModules: true,
        modules: true
    }
};

const app = new Express();

if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = require('webpack-dev-middleware')(compiler, serverOptions);

    app.use(middleware);
    app.use(require('webpack-hot-middleware')(compiler));
    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });
} else {
    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

const port = isDeveloping ? JSON.parse(config.externals.config).client.port : 3000;

app.listen(port, '0.0.0.0', function onAppListening(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('==> Webpack development server listening on port %s', port);
    }
});