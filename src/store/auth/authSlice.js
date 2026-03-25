import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState : {
        user: {}
    },
    reducers: {
        UserStateHandler: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const authActions = authSlice.actions
export default authSlice
