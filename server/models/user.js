const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true
    },
    name: String,
    passwordHash: {
        type: String,
        minLength: 3,
        required: true
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);