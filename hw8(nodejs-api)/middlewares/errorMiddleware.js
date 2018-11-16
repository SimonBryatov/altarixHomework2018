const {errorResponse} = require('../helpers/responseHelpers')

module.exports = (err, req, res, next) => {
    errorResponse({message: 'Internal Server Error', status: 500}, res);
    next(err);
}