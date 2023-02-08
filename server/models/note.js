const mongoose = require('mongoose');

// 定义数据结构
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean,
});
noteSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = document._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);
