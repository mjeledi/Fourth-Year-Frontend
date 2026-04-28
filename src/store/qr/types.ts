export interface RejectType {
    message: string;
}

export interface QrRequestPayload {
    sessionId: string;
    image: string;
}

export interface QrResponse {
    sessionId: string;
    image: string;
}

export interface SessionResponse {
    sessionId: number;
}