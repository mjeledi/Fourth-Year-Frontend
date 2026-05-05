import { createSlice } from "@reduxjs/toolkit";
import { HttpCreateClassHandler, HttpCreateSession, HttpFetchClasses, HttpFetchQrCode, HttpFetchSessions, HttpLecturerCourses, HttpVerifyAttendance } from "./thunks";
import { HttpFetchUser } from "./user-thunks";
import { HttpFetchSessionAttendance } from "./attendanceThunks";

export const SessionSlice = createSlice({
    name: "session",
    initialState: {
        sessionId: "",
        classes: [] as any,
        sessions: [] as any,

        qr: "" as any,
        message: "" as any,
        isVerified: false,

        isModalOpen: false,
        courses: [] as any,
        user: {} as any,

        isClassModalOpen: false,
        attendance: [] as any
    },
    reducers: {
        AttendanceMarked: (state,action) => {
            state.isVerified = action.payload
            state.message = ""
        },
        ModalStateHandler: (state, action) => {
            state.isModalOpen = action.payload;
        },
        ClassModalStateHandler: (state, action) => {
            state.isClassModalOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HttpFetchSessionAttendance.fulfilled, (state, action) => {
            const attendance = action.payload
            state.attendance = attendance
        })

        builder.addCase(HttpCreateClassHandler.fulfilled, (state, action) => {
            const data = action.payload
            state.isClassModalOpen = false
            state.classes = [...state.classes, data]
        })

        builder.addCase(HttpFetchUser.fulfilled, (state, action) => {
            const data = action.payload;
            state.user = data;
        })

        builder.addCase(HttpCreateSession.fulfilled, (state, action) => {
            const data = action.payload;
            state.sessions = [...state.sessions, data];
            state.isModalOpen = false;
        })

        builder.addCase(HttpLecturerCourses.fulfilled, (state, action) => {
            const data = action.payload;
            state.courses = data;
        })

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