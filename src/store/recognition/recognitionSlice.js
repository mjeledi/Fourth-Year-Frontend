import { createSlice } from "@reduxjs/toolkit";

const recognitionSlice = createSlice({
    name: 'recognitionSlice',
    initialState : {
        face: {}
    },
    reducers: {
        faceStateHandler: (state, action) => {
            state.face = action.payload;
        }
    }
})

export const recognitionActions = recognitionSlice.actions
export default recognitionSlice
