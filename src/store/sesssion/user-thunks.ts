import { createAsyncThunk } from "@reduxjs/toolkit";
import { RejectType, UserResponse } from "./types";
import { api } from "../../api";

export const HttpFetchUser = createAsyncThunk<UserResponse, void, { rejectValue: RejectType }>(
    "sessions/fetchUser", async(_, { rejectWithValue }) => {
        try {
            const response = await api.get(`api/profile/me`);

            if (response.status !== 200) {
                throw new Error("Failed to fetch user data");
            }

            const data = await response.data.user;
            return data;
        } catch (error : any) {
            return rejectWithValue({ message: error?.response?.data?.error || error.message || "An error occurred while fetching the user data" });
        }
    }
)