const jwt = require('jsonwebtoken');
const cert = process.env.JWT_SECRET;

function issueToken(userData) {
    return jwt.sign(userData, cert, {expiresIn: '14d'});
}

function checkToken(token) {
    try {
        return jwt.verify(token, cert);
    } catch {
        throw {message: 'Invalid token provided', status: 401};
    }
}

module.exports = {issueToken, checkToken}