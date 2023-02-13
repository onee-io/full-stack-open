import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notice',
    initialState: '',
    reducers: {
        alertNotice(state, action) {
            return action.message;
        },
        clearNotice(state, action) {
            return ''
        }
    }
});

export const { alertNotice, clearNotice } = slice.actions;
export default slice.reducer;