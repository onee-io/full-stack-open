const app = require('./app');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

mongoose.set('strictQuery', true);
mongoose.connect(config.MONGODB_URI).then((conn) => {
    // 兼容 Cyclic 架构，需在连接数据库后再监听服务启动
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(config.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`);
    });
}).catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
    process.exit(1);
});