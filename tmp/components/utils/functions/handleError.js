"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
function handleError(ctx, error, statusCode = 500) {
    if (error instanceof Error) {
        let json = {
            name: error.name,
            message: error.message
        };
        // boom.
        let be = __1.getErrorStatus(error);
        // be.output.payload.details = {
        //   name: error.name
        // };
        //   let errors = (<any>error).errors;
        //   if (errors) be.output.payload.details.errors = errors;
        // ctx.status = getErrorStatusCode(error);
        // ctx.body = JSON.stringify(json);
        // } else {
        //   be = boom.wrap(error, 500);
        ctx.status = be.output.statusCode;
        ctx.body = be.output.payload;
    }
}
exports.handleError = handleError;
