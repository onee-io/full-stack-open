const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const supertest = require('supertest');
const helper = require('./test_user_helper');
const app = require('../app');

const api = supertest(app);

beforeAll(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.MONGODB_URI);
}, 100000);

// beforeEach(async () => {
//     await User.deleteMany({});
//     for (const user of helper.initialUsers) {
//         const newUser = new User(user);
//         await newUser.save();
//     }
// });

beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
});

describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };
        await api.post('/api/users').send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        };
        const result = await api.post('/api/users').send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error).toContain('username must be unique');
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });

    test('creation fails with password too short', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'sa',
        };
        const result = await api.post('/api/users').send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error).toContain('password too short');
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });
});

afterAll(() => {
    mongoose.connection.close();
});