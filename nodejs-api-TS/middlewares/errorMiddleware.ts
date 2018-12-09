export {};
const {errorResponse} = require('../helpers/responseHelpers')
import {Request, Response, NextFunction} from 'express';

module.exports = (err: Error, req: Request, res: Response, next: NextFunction) => {
    errorResponse({message: 'Internal Server Error', status: 500}, res);
    next(err);
}