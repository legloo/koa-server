"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller = require("./controller");
const service_1 = require("../service");
const model_1 = require("../model");
const passport_1 = require("./passport");
let router = new Router({
    prefix: '/api/auth/local'
});
router.post('/', controller.signIn);
router.post('/signup', controller.signUp);
router.post('/reset', service_1.isAuthenticated(), controller.reset);
function setupAuthLocal(app) {
    passport_1.setup(model_1.default);
    app.use(router.routes());
}
exports.setupAuthLocal = setupAuthLocal;
