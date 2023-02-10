import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
}

const config = () => {
    return {
        headers: { Authorization: token }
    }
}

const getAllBlogs = async () => {
    const response = await axios.get(baseUrl, config());
    return response.data;
}

const createBlog = async (blog) => {
    const response = await axios.post(baseUrl, blog, config());
    return response.data;
}

const updateBlog = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config());
    return response.data;
}

const deleteBlog = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, config());
}

export default {
    setToken,
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog
}