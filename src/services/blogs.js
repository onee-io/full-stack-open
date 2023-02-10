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

export default {
    setToken,
    getAllBlogs,
    createBlog
}