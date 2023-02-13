import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'textFilter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.payload;
        }
    }
})

export const { filterChange } = slice.actions;
export default slice.reducer;