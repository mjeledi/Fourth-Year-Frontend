import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClassesResponse, QrCodeResponse, RejectType, SessionsResponse, VerifyAttendanceRequest, VerifyAttendanceResponse } from "./types";
import { api } from "../../api";

export const HttpFetchClasses = createAsyncThunk<ClassesResponse, void, { rejectValue: RejectType }>(
    "classes/fetchClasses", async(_, { rejectWithValue }) => {
        try {
            const response = await api.get(`api/classes`);

            if (response.status !== 200) {
                throw new Error("Failed to fetch classes");
            }

            const data = await response.data.classes;
            return data;
        } catch (error : any) {
            return rejectWithValue({ message: error?.response?.data?.message || error.message || "An error occurred while fetching the classes" });
        }
    }
)

export const HttpFetchSessions = createAsyncThunk<SessionsResponse, void, { rejectValue: RejectType }>(
    "sessions/fetchSessions", async(_, { rejectWithValue }) => {
        try {
            const response = await api.get(`api/sessions`);

            if (response.status !== 200) {
                throw new Error("Failed to fetch sessions");
            }

            const data = await response.data.sessions;
            return data;
        } catch (error : any) {
            return rejectWithValue({ message: error?.response?.data?.message || error.message || "An error occurred while fetching the sessions" });
        }
    }
)

export const HttpFetchQrCode = createAsyncThunk<QrCodeResponse, void, { rejectValue: RejectType }>(
    "sessions/fetchQrCode", async(_, { rejectWithValue }) => {
        try {
            const response = await api.get(`api/qrcode`);

            if (response.status !== 200) {
                throw new Error("Failed to fetch QR code");
            }

            const data = await response.data.qr;
            return data;
        } catch (error : any) {
            return rejectWithValue({ message: error?.response?.data?.message || error.message || "An error occurred while fetching the QR code" });
        }
    }
)

export const HttpVerifyAttendance = createAsyncThunk<VerifyAttendanceResponse, VerifyAttendanceRequest, { rejectValue: RejectType }>(
    "sessions/verifyAttendance", async({ sessionId, code, latitude, longitude, setIsLoading }, { rejectWithValue }) => {
        try {
            setIsLoading(true);
            const payload = {
                "session_id" :sessionId,
                "code": code,
                "latitude": String(latitude),
                "longitude": String(longitude)
            };
            const response = await api.post(`api/attendance/verify`, payload);

            if (response.status !== 200) {
                setIsLoading(false);
                throw new Error("Failed to verify attendance");
            }

            const data = await response.data.message;
            return data;
        } catch (error : any) {
            setIsLoading(false);
            return rejectWithValue({ message: error?.response?.data?.error || error.message || "An error occurred while verifying attendance" });
        }
    }
)