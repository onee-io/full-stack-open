const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

// 用户认证
// blogsRouter.get('/', middleware.userExtractor, async (request, response) => {
//     const user = request.user;
//     const blogs = await Blog.find({
//         user: user._id
//     }).populate('user', { username: 1, name: 1 });
//     response.json(blogs);
// });

// blogsRouter.get('/:id', middleware.userExtractor, async (request, response) => {
//     const user = request.user;
//     const blog = await Blog.findOne({
//         _id: request.params.id,
//         user: user._id
//     }).populate('user', { username: 1, name: 1 });
//     if (blog) {
//         response.json(blog);
//     } else {
//         response.status(404).end();
//     }
// });

// 无需认证
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user;
    // 创建博客
    const newBlog = new Blog({
        ...request.body,
        user: user._id,
        likes: request.body.likes || 0
    });
    const savedBlog = await newBlog.save();
    // 更新用户博客列表
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    // 关联查询创建的博客
    const blog = await Blog.findOne({
        _id: savedBlog._id,
        user: user._id
    }).populate('user', { username: 1, name: 1 });
    response.status(201).json(blog);
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
    const user = request.user;
    // 更新博客
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true, runValidators: true, context: 'query' }
    );
    if (updatedBlog) {
        // 查询更新后的博客
        const blog = await Blog.findOne({
            _id: request.params.id,
            user: user._id
        }).populate('user', { username: 1, name: 1 });
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

module.exports = blogsRouter;