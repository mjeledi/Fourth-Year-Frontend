import { createAsyncThunk } from "@reduxjs/toolkit";

export const HttpFaceScannerThunk = createAsyncThunk(
    "recognition/scanner",
    async({ api, face, userId, resetScanner, setUserImage }, { }) => {

        const formData = new FormData();
        formData.set("image", face)

        try{
            setIsLoading(true)
            const response = await api.post(`/api/users/profile/face/${userId}`, formData)

            if(response.status === 200){
                console.log(response.data)
                setUserImage(null)
                resetScanner()
            }
        }catch(err){
            if(err.response){       ``
                console.log(err.response)
            }
        }
    }
)