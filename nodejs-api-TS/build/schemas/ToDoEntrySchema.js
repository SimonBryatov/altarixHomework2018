"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ToDoEntrySchema = new Schema({
    creatorLogin: String,
    caption: String,
    status: { type: String, default: 'incompleted' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = ToDoEntrySchema;
