const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// 定义连接数据库方法
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = { mongoose, connectDB };