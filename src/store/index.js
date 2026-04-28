import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import QRSlice from "./qr/slice";
import SessionSlice from "./sesssion/slice";

const store = configureStore({
    reducer : {
        classes: SessionSlice.reducer,
        qr: QRSlice.reducer,
        auth: authSlice.reducer,
    }
})

export default store