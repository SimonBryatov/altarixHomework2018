import jwt from 'jsonwebtoken';
const cert = process.env.JWT_SECRET as string;
import IUserAuthCredentials from '@/interfaces/IUserAuthCredentials';

function issueToken(userData: IUserAuthCredentials) {
    return jwt.sign(userData, cert, {expiresIn: '14d'});
}

function checkToken(token: string) {
    try {
        return jwt.verify(token, cert);
    } catch {
        throw {message: 'Invalid token provided', status: 401};
    }
}

module.exports = {issueToken, checkToken}