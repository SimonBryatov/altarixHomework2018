import {Request} from 'express';
import IUserAuthCredentials from '@/interfaces/IUserAuthCredentials'
export default interface IRequest extends Request {
    userData: IUserAuthCredentials
}