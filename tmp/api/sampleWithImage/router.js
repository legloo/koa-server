"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller_1 = require("./controller");
let router = new Router({
    prefix: '/api/sampleWithImages'
});
router.get('/', controller_1.default.index);
router.post('/', controller_1.default.create);
router.get('/:id', controller_1.default.show);
router.put('/:id', controller_1.default.update);
router.patch('/:id', controller_1.default.update);
router.delete('/:id', controller_1.default.destroy);
exports.default = router;
