"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("koa-passport");
const passport_local_1 = require("passport-local");
const utils_1 = require("../../components/utils");
function localAuthenticate(Auth, username, password, done) {
    Auth.findOne({
        username: username
    }).exec()
        .then(user => {
        if (!user) {
            return done(new utils_1.AuthError('This username is not registered'));
        }
        console.log(user);
        user.authenticate(password, (error, authenticated) => {
            if (error) {
                return done(error);
            }
            if (!authenticated) {
                return done(new utils_1.AuthError('This password is not correct'));
            }
            else {
                return done(null, user);
            }
        });
    })
        .catch(error => done(error));
}
function setup(Auth) {
    passport.use(new passport_local_1.Strategy({
        usernameField: 'username',
        passwordField: 'password' // this is the virtual field on the model
    }, function (username, password, done) {
        return localAuthenticate(Auth, username, password, done);
    }));
}
exports.setup = setup;
