"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const utils_1 = require("../../components/utils");
const config_1 = require("../../config");
exports.default = mongoose.model('Samplewithimage', new mongoose.Schema({
    name: String,
    image: {
        type: mongoose.Schema.Types['Image']
    }
})
    .plugin(paginate)
    .plugin(utils_1.mongooseImages, {
    baseDir: config_1.root + '/static/media',
    generateUrl: (baseUrl, path) => {
        return '/static/media/' + path;
    }
}));
