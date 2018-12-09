"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function successResponse(res, data, status) {
    res.status(status).json(JSON.stringify(data));
}
function errorResponse(err, res) {
    res.statusMessage = err.message;
    res.status(err.status).send(err.message);
}
module.exports = { successResponse: successResponse, errorResponse: errorResponse };
