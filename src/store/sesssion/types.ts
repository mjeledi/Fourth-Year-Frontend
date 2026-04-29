export interface RejectType {
    message: string;
}

export interface QrRequestPayload {
    sessionId: string;
    image: string;
}

export interface ClassesResponse {
    classes: []
}

export interface SessionResponse {
    sessionId: number;
}

export interface VerifyAttendanceResponse {
    message: string;
}

export interface QrCodeResponse {
    qrCode: string;
}

export interface UserResponse {
    user: {};
}

export interface VerifyAttendanceRequest {
    setIsLoading: Function;
    sessionId: string;
    code: string;
    latitude: number;
    longitude: number;
}

export interface SessionsResponse {
    sessions: [];
}

export interface CoursesResponse {
    courses: [];
}

export interface VerifyAttendanceRequest {
    setIsLoading: Function;
    sessionId: string;
    code: string;
    latitude: number;
    longitude: number;
}

export interface CreateSessionRequest {
    resetState: Function;
    setIsLoading: Function;
    classId: string;
    courseCode: string;
    courseName: string;
    courseId: string;
    startTime: string;
    endTime: string
}

export interface CreateSessionResponse {
    session: {};
}

export interface CreateClassRequest {
    className: string;
    setIsLoading: Function;
    east: {};
    west: {};
    north: {};
    south: {};
}

export interface CreateClassResponse {
    class: {};
}