import IErrorResponseMsg from '@/interfaces/IErrorResponseData';
import ISuccesResponseData from '@/interfaces/ISuccesResponseData';
import {Response} from 'express';

function successResponse(res: Response, data: ISuccesResponseData, status: number): void {
    res.status(status).json(JSON.stringify(data));
} 

function errorResponse(err: IErrorResponseMsg, res: Response): void {
    res.statusMessage = err.message;
    res.status(err.status).send(err.message);
}

module.exports = {successResponse, errorResponse}