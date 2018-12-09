export {};
const mongoose = require('mongoose');
const ToDoEntrySchema = require('../schemas/ToDoEntrySchema');

const ToDoEntryModel = mongoose.model('ToDoEntry', ToDoEntrySchema);

module.exports = ToDoEntryModel;