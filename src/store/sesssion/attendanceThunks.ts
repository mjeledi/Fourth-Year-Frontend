import { createAsyncThunk } from "@reduxjs/toolkit";
import { RejectType, SessionAttendancePayload, SessionAttendanceResponse } from "./types";
import { api } from "../../api";

export const HttpFetchSessionAttendance = createAsyncThunk<SessionAttendanceResponse, SessionAttendancePayload, { rejectValue: RejectType }>(
    "sessions/fetchSessionsAttendance", async({ session_id, setIsLoading }, { rejectWithValue }) => {
        try {
            setIsLoading(true)
            const response = await api.get(`api/attendance/${session_id}`);

            if (response.status !== 200) {
                setIsLoading(false)
                throw new Error("Failed to fetch sessions");
            }

            setIsLoading(false)
            const data = await response.data.attendance;
            return data;
        } catch (error : any) {
            setIsLoading(false)
            return rejectWithValue({ message: error?.response?.data?.message || error.message || "An error occurred while fetching the sessions" });
        }
    }
)

export const HttpFetchSessionAttendanceReport = createAsyncThunk<void, SessionAttendancePayload, { rejectValue: RejectType }>(
    "sessions/fetchSessionsAttendanceReport", async ({ session_id }, { rejectWithValue }) => {
        try {
            const response = await api.get(`api/attendance/report/${session_id}`, { responseType: "blob" });

            if (response.status !== 200) {
                throw new Error("Failed to fetch attendance report");
            }

            // * Create downloadable file
            const blob = new Blob([response.data], { type: "text/csv" });

            // * Extract filename
            const contentDisposition = response.headers["content-disposition"];
            let fileName = `attendance_${session_id}.csv`;

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/);
                if (match?.[1]) fileName = match[1];
            }

            // * Trigger download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();

            // * Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error: any) {
            return rejectWithValue({ message: error?.response?.data?.message || error.message || "Error downloading attendance report" });
        }
    }
);
