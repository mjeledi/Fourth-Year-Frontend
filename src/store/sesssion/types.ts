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