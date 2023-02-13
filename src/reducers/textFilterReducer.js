import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'textFilter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.filter
        }
    }
})

export const { textFilter } = slice.actions;
export default slice.reducer;