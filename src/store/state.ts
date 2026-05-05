export interface RootState {
    qr: {
        qrCode: string;
    };
    classes: {
        classes: [],
        sessions: [],
        qr: string;
        isVerified: boolean;
        
        message: string;
        isModalOpen: boolean;
        courses: [];

        user: {};
        isClassModalOpen: boolean;
        attendance: []
    }
}