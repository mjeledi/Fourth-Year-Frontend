import { RootState } from "../state";

export const selectQrCodeImage = (state : RootState) => state.qr.qrCode;