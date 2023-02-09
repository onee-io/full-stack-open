const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user;
    const blog = new Blog({
        ...request.body,
        user: user._id,
        likes: request.body.likes || 0
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (!blog.user || blog.user.toString() !== user._id.toString()) {
        return response.status(403).json({ error: 'forbidden' });
    }
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true, runValidators: true, context: 'query' }
    );
    if (updatedBlog) {
        response.json(updatedBlog);
    } else {
        response.status(404).end();
    }
});

module.exports = blogsRouter;