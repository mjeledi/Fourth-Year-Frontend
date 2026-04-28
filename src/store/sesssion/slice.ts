import { createSlice } from "@reduxjs/toolkit";
import { HttpFetchClasses, HttpFetchQrCode, HttpFetchSessions, HttpVerifyAttendance } from "./thunks";

export const SessionSlice = createSlice({
    name: "session",
    initialState: {
        sessionId: "",
        classes: [] as any,
        sessions: [] as any,
        qr: "" as any,
        message: "" as any,
        isVerified: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(HttpFetchClasses.fulfilled, (state, action) => {
            const data = action.payload;
            state.classes = data;
        })

        builder.addCase(HttpFetchSessions.fulfilled, (state, action) => {
            const data = action.payload;
            state.sessions = data;
        })

        builder.addCase(HttpFetchQrCode.fulfilled, (state, action) => {
            const data = action.payload;
            state.qr = data;    
        })

        builder.addCase(HttpVerifyAttendance.fulfilled, (state, action) => {
            const data = action.payload;
            state.message = data;
            state.isVerified = true;
        })

    }
})

export const sessionActions = SessionSlice.actions;
export default SessionSlice