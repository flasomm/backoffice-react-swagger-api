import cookie from 'react-cookie';
import 'whatwg-fetch';
import {isNil} from 'lodash';
const config = require('config');

class Auth {

    constructor() {
        this.serverUrl = this.getServerUrl();
    }

    login(email, password, cb, withCookie) {
        fetch(this.serverUrl + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(function (res) {
            return res.json().then(function (json) {
                if (res.ok && !isNil(json.token) && withCookie === true) {
                    cookie.save('jwtToken', json.token, {path: '/'});
                    cookie.save('uid', json.id, {path: '/'});
                    cookie.save('username', json.username, {path: '/'});
                    cookie.save('email', email, {path: '/'});
                }
                cb(json.token, res);
            });
        });
    }

    verifyToken() {
        var self = this;
        let token = this.getToken();
        if (!token) {
            return;
        }
        fetch(this.serverUrl + '/validateToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        }).then(function (res) {
            if (res.status === 401) {
                self.logout();
                window.location.replace("/login");
            }
        });
    }

    getServerUrl() {
        return `http://${config.api.host}:${config.api.port}`;
    }

    getToken() {
        return cookie.load('jwtToken');
    }

    getUserId() {
        return cookie.load('uid');
    }

    getUsername() {
        return cookie.load('username');
    }

    logout() {
        cookie.remove('email', {path: '/'});
        cookie.remove('uid', {path: '/'});
        cookie.remove('username', {path: '/'});
        cookie.remove('jwtToken', {path: '/'});
    }

    isAuthenticated() {
        return !!cookie.load('jwtToken');
    }
}

module.exports = new Auth();