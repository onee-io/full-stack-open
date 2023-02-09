const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, repsonse) => {
    const notes = await Note.find({});
    repsonse.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id);
    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

notesRouter.post('/', async (request, response) => {
    const { content, important } = request.body;
    const note = new Note({
        content,
        important: important || false,
        date: new Date()
    });
    const savedNote = await note.save();
    response.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
    const { content, important } = request.body;
    // { new: true } 用于将更新后的文档返回到 updatedNote 上
    const updatedNote = await Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    );
    if (updatedNote) {
        response.json(updatedNote);
    } else {
        response.status(404).end();
    }
});

module.exports = notesRouter;