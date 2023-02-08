const commonRouter = require('express').Router();
const Note = require('../models/note');

commonRouter.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

commonRouter.get('/info', (request, response) => {
    Note.count({}).then(count => {
        response.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${new Date()}</p>
        `);
    });
});

module.exports = commonRouter;