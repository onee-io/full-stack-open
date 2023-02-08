require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./models/mongoose');
const Note = require('./models/note');
const Person = require('./models/phonebook');

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors()); // 允许跨域请求
app.use(express.static('build')); // 优先访问 build 目录下静态资源
app.use(express.json()); // 用于访问 request 中的 body 属性
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); // 记录访问日志

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, repsonse) => {
    Note.find({}).then(notes => {
        repsonse.json(notes);
    });
});

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note);
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error));
});

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end();
    }).catch(error => next(error));
});

app.post('/api/notes', (request, response) => {
    const body = request.body;
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    });
    note.save().then(savedNote => {
        response.json(savedNote);
    });
});

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body;
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }
    const note = {
        content: body.content,
        important: body.important || false,
    }
    // { new: true } 用于将更新后的文档返回到 updatedNote 上
    Note.findByIdAndUpdate(request.params.id, note, { new: true }).then(updatedNote => {
        response.json(updatedNote);
    }).catch(error => next(error));
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end();
    }).catch(error => next(error));
});

app.post('/api/persons', async (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }
    const find = await Person.find({ name: body.name });
    if (find.length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }
    const person = new Person({
        name: body.name,
        number: body.number
    });
    person.save().then(savedPerson => {
        response.json(savedPerson);
    });
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }
    const person = {
        name: body.name,
        number: body.number
    };
    Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(updatedPerson => {
        response.json(updatedPerson);
    }).catch(error => next(error));
});

app.get('/info', (request, response) => {
    Note.count().then(count => {
        response.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${new Date()}</p>
        `);
    });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint); // 处理未知路由

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error);
};
app.use(errorHandler); // 异常处理

connectDB().then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
