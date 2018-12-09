const { errorResponse } = require('../helpers/responseHelpers')
const { checkToken } = require('../helpers/jwtHelpers');
const UserModel = require('../models/UserModel');
import {Response, NextFunction} from 'express';
import IRequest from '@/interfaces/IRequest';

module.exports = async (req: IRequest, res:Response, next:NextFunction) => {
    try {
    let userData = checkToken(req.cookies.jwt);
    req.userData = userData; 
    let user = await UserModel.find({login: userData.login}, (err: Error) => {if (err) next(err)});   
    if (user[0].jwtActiveUUID !== userData.uuid) throw 1;
    next();
    } catch(err) {
        errorResponse({message: 'Auth failed: invalid token provided', status: 401}, res)
    }
}