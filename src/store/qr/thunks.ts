import { createAsyncThunk } from "@reduxjs/toolkit";
import { QrRequestPayload, QrResponse, RejectType, SessionResponse } from "./types";
import { api } from "../../api";

export const HttpFetchQrCode = createAsyncThunk<QrRequestPayload, QrResponse, { rejectValue: RejectType }>(
    "qr/fetchQrCode", async({ sessionId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/qr/image/${sessionId}`, {
                responseType: 'blob'
            });

            if (response.status !== 200) {
                throw new Error("Failed to fetch QR code");
            }

            const url = URL.createObjectURL(response.data);

            const data = await response.data;
            return { sessionId, image: url};
        } catch (error : any) {
            return rejectWithValue({ message: error?.response?.data?.message || error.message || "An error occurred while fetching the QR code" });
        }
    }
)

export const HttpStartSession = createAsyncThunk<void, SessionResponse, { rejectValue: RejectType }>(
    "qr/startSession", async({}, { rejectWithValue }) => {
        return 1;
    }
)