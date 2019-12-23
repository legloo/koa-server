"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const utils_1 = require("./components/utils");
const config = require("./config");
class Image extends mongoose.SchemaType {
    constructor(key, options) {
        super(key, options, 'Image');
    }
    // `cast()` takes a parameter that can be anything. You need to
    // validate the provided `val` and throw a `CastError` if you
    // can't convert it.
    cast(val) {
        if (!val) {
            throw new utils_1.ImageProcessError();
        }
        return val;
    }
}
exports.Image = Image;
function setupMongoose() {
    mongoose.Schema.Types['Image'] = Image;
    mongoose.connect(config.mongo.uri, config.mongo.options);
    mongoose.connection.on('error', function (err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    });
}
exports.setupMongoose = setupMongoose;
