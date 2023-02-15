import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';
import { setNotification } from "./noticeReducer";

const slice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            const createdBlog = action.payload;
            return state.concat(createdBlog);
        },
        modifyBlog(state, action) {
            const updatedBlog = action.payload;
            return state.map(item => item.id !== updatedBlog.id ? item : updatedBlog);
        },
        removeBlog(state, action) {
            const id = action.payload;
            return state.filter(item => item.id !== id);
        }
    }
});

export const { setBlogs, appendBlog, modifyBlog, removeBlog } = slice.actions;

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAllBlogs();
        dispatch(setBlogs(blogs));
    }
}

export const createBlog = blog => {
    return async dispatch => {
        const createdBlog = await blogService.createBlog(blog);
        dispatch(appendBlog(createdBlog));
        dispatch(setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`));
    }
}

export const updateBlog = blog => {
    return async dispatch => {
        const updatedBlog = await blogService.updateBlog(blog);
        dispatch(modifyBlog(updatedBlog));
    }
}

export const deleteBlog = id => {
    return async dispatch => {
        await blogService.deleteBlog(id);
        dispatch(removeBlog(id));
    }
}

export default slice.reducer;