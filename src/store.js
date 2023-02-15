import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdotesReducer';
import blogReducer from './reducers/blogReducer';
import filterReducer from './reducers/filterReducer';
import noteReducer from './reducers/noteReducer';
import noticeReducer from './reducers/noticeReducer';
import textFilterReducer from './reducers/textFilterReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
        notes: noteReducer,
        blogs: blogReducer,
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        textFilter: textFilterReducer,
        notice: noticeReducer,
        user: userReducer
    }
})

console.log(store.getState());

export default store;