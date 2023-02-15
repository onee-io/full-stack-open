import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';
import loginService from '../services/login';
import { initializeBlogs } from "./blogReducer";
import { setNotification } from "./noticeReducer";

const slice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        updateUser(state, action) {
            const user = action.payload;
            return user;
        }
    }
})

export const { updateUser } = slice.actions;

export const initUser = () => {
    return async dispatch => {
        const loginedUserJSON = window.localStorage.getItem('blogsUser');
        if (loginedUserJSON) {
            const loginedUser = JSON.parse(loginedUserJSON);
            blogService.setToken(loginedUser.token);
            dispatch(updateUser(loginedUser));
            dispatch(initializeBlogs());
        } else {
            dispatch(logout);
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const loginedUser = await loginService.login({ username, password });
            window.localStorage.setItem('blogsUser', JSON.stringify(loginedUser));
            blogService.setToken(loginedUser.token);
            dispatch(updateUser(loginedUser));
            dispatch(initializeBlogs());
        } catch (error) {
            dispatch(setNotification(error.response.data.error));
        }
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('blogsUser');
        blogService.setToken(null);
        dispatch(updateUser(null));
    }
}

export default slice.reducer;