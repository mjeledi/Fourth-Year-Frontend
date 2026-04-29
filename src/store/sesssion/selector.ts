import { RootState } from "../state";

export const selectClasses = (state : RootState) => state.classes.classes;
export const selectSessions = (state : RootState) => state.classes.sessions;
export const selectQrCode = (state : RootState) => state.classes.qr;

export const selectIsVerified = (state : RootState) => state.classes.isVerified;
export const selectMessage = (state : RootState) => state.classes.message;
export const selectIsModalOpen = (state : RootState) => state.classes.isModalOpen;

export const selectCourses = (state : RootState) => state.classes.courses;
export const selectUser = (state : RootState) => state.classes.user;
export const selectClassModal = (state : RootState) => state.classes.isClassModalOpen;