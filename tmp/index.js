"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const koa = require("koa");
const logger = require("koa-logger");
const favicon = require("koa-favicon");
const convert = require("koa-convert");
const body = require("koa-better-body");
const qs = require("qs");
const serve = require("koa-static");
const mount = require("koa-mount");
const session = require("koa-session-minimal");
const store = require("koa-generic-session-mongo");
const compress = require("koa-compress");
const conditional = require("koa-conditional-get");
const etag = require("koa-etag");
const config = require("./config");
const router_1 = require("./router");
const mongoose_1 = require("./mongoose");
const docs_1 = require("./docs");
const socket_1 = require("./socket");
// Connect to MongoDB
mongoose_1.setupMongoose();
exports.app = new koa();
exports.app.use(logger());
exports.app.use(favicon(config.root + '/static/favicon.ico'));
exports.app.use(convert(body({
    querystring: qs
})));
exports.app.use(session({
    key: config.secrets.session,
    store: new store()
}));
exports.app.use(compress());
exports.app.use(conditional());
exports.app.use(etag());
socket_1.setupSocket(exports.app);
router_1.setupRouters(exports.app);
docs_1.setupDocs(exports.app);
console.log(config.root);
exports.app.use(mount('/static', new koa().use(serve(config.root + '/static'))));
exports.app.listen(3000);
console.log('started');
