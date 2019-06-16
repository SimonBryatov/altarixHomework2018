"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorResponse = require('../helpers/responseHelpers').errorResponse;
module.exports = function (err, req, res, next) {
    errorResponse({ message: 'Internal Server Error', status: 500 }, res);
    next(err);
};
