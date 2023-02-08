const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

// 连接 MongoDB
const password = process.argv[2]
const url = `mongodb+srv://onee:${password}@cluster0.adpv8gx.mongodb.net/full_stack_open?retryWrites=true&w=majority`
mongoose.set('strictQuery', true);
mongoose.connect(url)

// 定义数据结构
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    // 新增数据
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({ name, number })
    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    // 查询所有数据
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}