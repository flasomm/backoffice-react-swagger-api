module.exports = {
    api_key: function (req, authOrSecDef, scopes, next) {
        if ('9TIL054RthNuYoP2M96OAjJrd5Cfl5qN' === scopes) {
            next();
        } else {
            next(new Error('access denied!'));
        }
    }
};