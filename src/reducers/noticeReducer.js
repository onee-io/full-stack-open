import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notice',
    initialState: '',
    reducers: {
        setMessage(state, action) {
            return action.payload;
        }
    }
});

export const { setMessage } = slice.actions;

export const setNotification = (message, timeout = 5000) => {
    return async dispatch => {
        dispatch(setMessage(message));
        setTimeout(() => dispatch(setMessage('')), timeout);
    };
}

export default slice.reducer;