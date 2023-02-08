const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const middleware = require('./utils/middleware');
const commonRouter = require('./controllers/common');
const notesRouter = require('./controllers/notes');
const phonebookRouter = require('./controllers/phonebook');

const app = express();

// 自定义 morgan 日志参数
morgan.token('body', (req) => JSON.stringify(req.body));

// 配置路由前中间件
app.use(cors()); // 允许跨域请求
app.use(express.static('build')); // 优先访问 build 目录下静态资源
app.use(express.json()); // 用于访问 request 中的 body 属性
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); // 记录访问日志

// 配置路由
app.use('/', commonRouter);
app.use('/api/notes', notesRouter);
app.use('/api/persons', phonebookRouter);

// 配置路由后中间件
app.use(middleware.unknownEndpoint); // 处理未知路由
app.use(middleware.errorHandler); // 异常处理

module.exports = app;