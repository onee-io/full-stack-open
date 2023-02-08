const mongoose = require('mongoose');

// 定义数据结构
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /\d{2,3}-\d{1,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
});

// 指定 json 格式
personSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = document._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);