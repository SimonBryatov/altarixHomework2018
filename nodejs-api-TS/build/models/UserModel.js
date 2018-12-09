"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
