const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('notes', { content: 1, date: 1 })
        .populate('blogs', { url: 1, title: 1, author: 1 });
    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;
    if (password.length < 3) {
        return response.status(400).send({ error: 'password too short' });
    }
    const id = await User.exists({ username });
    if (id) {
        return response.status(400).json({ error: 'username must be unique' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
        username,
        name,
        passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

module.exports = usersRouter;