import jwt from 'jsonwebtoken';
import IUserAuthCredentials from '@/interfaces/IUserAuthCredentials';
const cert = process.env.JWT_SECRET as string;

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