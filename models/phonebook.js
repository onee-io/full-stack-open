const { mongoose } = require('./mongoose');

// 定义数据结构
const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
personSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = document._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
})

module.exports = mongoose.model('Person', personSchema)