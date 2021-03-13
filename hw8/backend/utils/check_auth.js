const { AuthenticationError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');
require('dotenv-defaults').config();

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            const user = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) throw new AuthenticationError('Invalid/Expired token');
                return decoded;
            })
            return user;
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('authorization header must be provided');
}