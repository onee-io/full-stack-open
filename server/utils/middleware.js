const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

// 提取授权 Token
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    next();
};

// 提取用户信息
const userExtractor = async (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' });
        }
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return response.status(401).json({ error: 'user invalid' });
        }
        request.user = user;
        next();
    } else {
        return response.status(401).json({ error: 'token missing' });
    }
};

// 处理未知路由
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

// 处理异常
const errorHandler = (error, request, response, next) => {
    logger.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' });
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' });
    }
    next(error);
};

module.exports = {
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
};