import { RootState } from "../state";

export const selectClasses = (state : RootState) => state.classes.classes;
export const selectSessions = (state : RootState) => state.classes.sessions;
export const selectQrCode = (state : RootState) => state.classes.qr;

export const selectIsVerified = (state : RootState) => state.classes.isVerified;
export const selectMessage = (state : RootState) => state.classes.message;