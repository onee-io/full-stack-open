const Note = require('../models/note');

const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true,
    },
];

// 生成一个不存在的笔记 ID
const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon', date: new Date() });
    await note.save();
    await note.remove();
    return note._id.toString();
};

// 返回数据库中所有笔记
const notesInDb = async () => {
    const notes = await Note.find({});
    return notes.map(note => note.toJSON());
};

module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb
};