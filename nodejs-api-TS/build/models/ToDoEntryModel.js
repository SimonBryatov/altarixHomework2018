"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var ToDoEntrySchema = require('../schemas/ToDoEntrySchema');
var ToDoEntryModel = mongoose.model('ToDoEntry', ToDoEntrySchema);
module.exports = ToDoEntryModel;
