import { createSlice } from "@reduxjs/toolkit";
import { HttpFetchQrCode } from "./thunks";

export const QRSlice = createSlice({
    name: "qr",
    initialState: {
        sessionId: "",
        qrCode: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(HttpFetchQrCode.fulfilled, (state: { qrCode: string }, action) => {
            const { image } = action.payload;
            state.qrCode = image;
        });
    }
})

export const qrActions = QRSlice.actions;
export default QRSlice