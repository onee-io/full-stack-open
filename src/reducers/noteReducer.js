import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes';

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

// 通过 redux thunk 定义异步操作
export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAllNotes();
        dispatch(setNotes(notes));
    };
}

export const createNote = content => {
    return async dispatch => {
        const newNote = await noteService.createNote({ content });
        dispatch(appendNote(newNote));
    };
}

export default noteSlice.reducer;