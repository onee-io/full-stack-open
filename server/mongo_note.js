const mongoose = require('mongoose');
const logger = require('./utils/logger');

if (process.argv.length < 3) {
    logger.info('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

// 连接 MongoDB
const password = process.argv[2];
const url = `mongodb+srv://onee:${password}@cluster0.adpv8gx.mongodb.net/full_stack_open?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true);
mongoose.connect(url);

// 定义数据结构
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});
const Note = mongoose.model('Note', noteSchema);

if (process.argv.length === 5) {
    // 新增数据
    const content = process.argv[3];
    const important = process.argv[4];
    const note = new Note({ content, important, date: new Date() });
    note.save().then(() => {
        logger.info(`Added ${content} important ${important} to note`);
        mongoose.connection.close();
    });
} else {
    // 查询所有数据
    Note.find({}).then(result => {
        result.forEach(note => {
            logger.info(note);
        });
        mongoose.connection.close();
    });
}