const mongoose = require('mongoose');
const Blog = require('../models/blog');
const config = require('../utils/config');
const supertest = require('supertest');
const helper = require('./test_blog_helper');
const app = require('../app');

const api = supertest(app);

beforeAll(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.MONGODB_URI);
}, 100000);

beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of helper.initialBlogs) {
        const newBlog = new Blog(blog);
        await newBlog.save();
    }
});

describe('初始化博客列表', () => {
    test('博客列表以 JSON 格式返回', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('博客列表数量与初始数量一致', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('博客的唯一标识被命名为 id', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    });
});

describe('查询博客', () => {
    test('查询已存在的博客', async () => {
        const blogs = await helper.blogsInDb();
        const blogToView = blogs[0];
        const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
        expect(resultBlog.body).toEqual(processedBlogToView);
    });

    test('查询 ID 格式正确但不存在的博客', async () => {
        const validExistingId = await helper.nonExistingId();
        await api.get(`/api/blogs/${validExistingId}`).expect(404);
    });

    test('查询 ID 格式不正确的博客', async () => {
        const invalidId = 12345;
        await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
});

describe('创建博客', () => {
    test('博客被正常创建', async () => {
        const newBlog = {
            title: 'toBeDefined',
            author: 'jest',
            url: 'https://jestjs.io/docs/expect#tobedefined',
            likes: 0
        };
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        const titles = blogsAtEnd.map(blog => blog.title);
        expect(titles).toContain(newBlog.title);
    });

    test('创建博客缺失 likes 值时默认为 0', async () => {
        const newBlog = {
            title: 'likes is 0',
            author: 'test',
            url: 'https://jestjs.io/docs/expect#tobedefined'
        };
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
    });

    test('创建博客缺失 title 或 url 将返回 400 状态码并创建失败', async () => {
        const newBlog = {
            author: 'jest',
            likes: 0
        };
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
});

describe('更新博客', () => {
    test('更新已存在的博客', async () => {
        const updateBlog = { author: 'onee' };
        const blogs = await helper.blogsInDb();
        const blogToUpdate = blogs[0];
        expect(updateBlog.author).not.toBe(blogToUpdate.author);
        const resultBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(resultBlog.body.author).toBe(updateBlog.author);
        const updatedBlogs = await helper.blogsInDb();
        expect(updatedBlogs[0].author).toBe(updateBlog.author);
        expect(updatedBlogs).toHaveLength(blogs.length);
    });

    test('更新不存在的博客', async () => {
        const validExistingId = await helper.nonExistingId();
        const updateBlog = { author: 'onee' };
        await api.put(`/api/blogs/${validExistingId}`).send(updateBlog).expect(404);
    });
});

describe('删除博客', () => {
    test('删除已存在的博客', async () => {
        const blogsAtStart = await helper.blogsInDb();
        await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(204);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        const urls = blogsAtEnd.map(blog => blog.url);
        expect(urls).not.toContain(blogsAtStart[0].url);
    });
});

afterAll(() => {
    mongoose.connection.close();
});