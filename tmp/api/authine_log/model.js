"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
exports.default = mongoose.model('Authinelog', new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    workItem: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
})
    .plugin(paginate));
