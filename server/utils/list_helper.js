const _ = require('lodash');

// 总是返回1
const dummy = (blogs) => {
    blogs; // 什么也不做，让 eslint 不报错
    return 1;
};

// 返回博客列表点赞总数
const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0);
};

// 返回点赞最高的博客
const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    const favoriteBlog = sortedBlogs[0];
    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    };
};

// 返回博客数最多的作者及博客数量
const mostBlogs = (blogs) => {
    const group = _.groupBy(blogs, 'author');
    const sortedAuthor = Object.entries(group).map(entry => {
        return {
            author: entry[0],
            blogs: entry[1].length
        };
    }).sort((a, b) => b.blogs - a.blogs);
    return sortedAuthor[0];
};

// 返回点赞数最多的作者及作者数量
const mostLikes = (blogs) => {
    const group = _.groupBy(blogs, 'author');
    const sortedAuthor = Object.entries(group).map(entry => {
        return {
            author: entry[0],
            likes: entry[1].reduce((sum, item) => sum + item.likes, 0)
        };
    }).sort((a, b) => b.likes - a.likes);
    return sortedAuthor[0];
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};