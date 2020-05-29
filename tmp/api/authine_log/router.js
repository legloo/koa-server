"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller_1 = require("./controller");
const service_1 = require("../../auth/service");
let router = new Router({
    prefix: '/api/authine_logs'
});
// router.post('/', isAuthenticated(), controller.create);
// router.get('/:id', OwnsOrHasRole('admin', Address, 'user'), controller.show);
router.get('/', service_1.isAuthenticated(), controller_1.default.index);
router.post('/', controller_1.default.create);
router.get('/:id', controller_1.default.show);
router.put('/:id', controller_1.default.update);
router.patch('/:id', controller_1.default.update);
router.delete('/:id', controller_1.default.destroy);
exports.default = router;
