"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa = require("koa");
const serve = require("koa-static");
const mount = require("koa-mount");
const path = require("path");
const config = require("../config");
function setupDocs(app) {
    const docsPath = path.join(config.root, 'swagger-ui');
    app.use(mount('/api-docs/', new koa().use(serve(docsPath))));
    const tmpDocsPath = path.join(config.root, 'tmp', 'swagger-ui');
    app.use(mount('/api-docs/', new koa().use(serve(tmpDocsPath))));
}
exports.setupDocs = setupDocs;
