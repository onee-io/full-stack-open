import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './reducers/noteReducer';
import anecdoteReducer from './reducers/anecdotesReducer';
import filterReducer from './reducers/filterReducer';
import textFilterReducer from './reducers/textFilterReducer';
import noticeReducer from './reducers/noticeReducer';

const store = configureStore({
    reducer: {
        notes: noteReducer,
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        textFilter: textFilterReducer,
        notice: noticeReducer
    }
})

console.log(store.getState())

export default store;