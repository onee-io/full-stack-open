const phonebookRouter = require('express').Router();
const Person = require('../models/phonebook');

phonebookRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

phonebookRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error));
});

phonebookRouter.post('/', async (request, response, next) => {
    const { name, number } = request.body;
    const id = await Person.exists({ name });
    if (id) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }
    const person = new Person({ name, number });
    person.save().then(savedPerson => {
        response.json(savedPerson);
    }).catch(error => next(error));
});

phonebookRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(() => {
        response.status(204).end();
    }).catch(error => next(error));
});

phonebookRouter.put('/:id', (request, response, next) => {
    const { name, number } = request.body;
    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    ).then(updatedPerson => {
        response.json(updatedPerson);
    }).catch(error => next(error));
});

module.exports = phonebookRouter;