const express = require('express');
const morgan = require('morgan');

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.json()); // 用于访问 request 中的 body 属性
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); // 记录访问日志

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
];

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, repsonse) => {
    repsonse.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

app.post('/api/notes', (request, response) => {
    const body = request.body;
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(notes),
    };
    notes = notes.concat(note);
    response.json(note);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }
    console.log(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase()));
    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase()) !== undefined) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(persons),
    };
    persons = persons.concat(person);
    response.json(person);
});

app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${persons.length} prople</p>
    <p>${new Date()}</p>
    `);
});

const generateId = (arr) => {
    const maxId = arr.length > 0
        ? Math.max(...arr.map(n => n.id))
        : 0
    return maxId + 1
};

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});