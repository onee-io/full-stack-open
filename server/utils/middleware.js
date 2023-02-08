const logger = require('./logger');

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
    }
    next(error);
};

module.exports = {
    unknownEndpoint,
    errorHandler
};