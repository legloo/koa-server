"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("koa-passport");
const local_1 = require("./local");
// Passport Configuration
// require('./local/passport').setup(Auth)
// require('./mobile/wechat/passport').setup(Auth)
// require('./google/passport').setup(User, config)
// require('./twitter/passport').setup(User, config)
// require('./qq/passport').setup(User, config)
// router.use('/local', require('./local').default)
// router.use('/mobile/wechat', require('./mobile/wechat').default)
// router.use('/oauth2/wechat', require('./oauth2/wechat').default)
// router.use('/twitter', require('./twitter').default)
// router.use('/google', require('./google').default)
// router.use('/qq', require('./qq').default)
// router.use('/token', require('./token').default)
function setupAuth(app) {
    app.use(passport.initialize());
    local_1.setupAuthLocal(app);
    passport.serializeUser(function (user, done) {
        console.log('se');
        done(null, user['_id']);
    });
    passport.deserializeUser(function (user, done) {
        console.log('dese');
        done(null, user);
    });
}
exports.setupAuth = setupAuth;
