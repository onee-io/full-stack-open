const mongoose = require('mongoose');

// 定义数据结构
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: Number
});

// 指定 json 格式
blogSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = document._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);