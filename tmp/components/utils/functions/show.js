"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function show(model, ctx, options) {
    let _options = {};
    if (options) {
        _options = _.merge(_options, options);
    }
    if (ctx.request.query._options) {
        try {
            let reqOptions = JSON.parse(ctx.request.query._options);
            _options = _.merge(_options, reqOptions);
        }
        catch (error) {
            return Promise.reject({
                name: error.name,
                message: error.message
            });
        }
    }
    let query = model.findById(ctx.params.id);
    if (_options.select)
        query = query.select(_options.select);
    if (_options.populate)
        query = query.populate(_options.populate);
    return query.exec();
}
exports.show = show;
