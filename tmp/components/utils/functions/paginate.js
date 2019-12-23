"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function paginate(model, ctx, filters, options) {
    let _filters = {};
    let _options = {};
    if (filters) {
        _filters = _.merge(_filters, filters);
    }
    if (options) {
        _options = _.merge(_options, options);
    }
    if (ctx.request.query._filters) {
        let reqFilters = JSON.parse(ctx.request.query._filters);
        _filters = _.merge(_filters, reqFilters);
    }
    if (ctx.request.query._options) {
        let reqOptions = JSON.parse(ctx.request.query._options);
        _options = _.merge(_options, reqOptions);
    }
    return model.paginate(_filters, _options);
}
exports.paginate = paginate;
