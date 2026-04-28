import { createAsyncThunk } from "@reduxjs/toolkit";

export const HttpAuthThunk = createAsyncThunk(
    "auth/login",
    async({ api, email, password, setIsLoading, setErrorMsg, navigate, role }, { dispatch }) => {
        try{
            setIsLoading(true)
            const response = await api.post('/api/login', {
                email: email,
                password: password
            })

            if(response.status === 200){
                setIsLoading(false)
                const role = response.data.role;

                if((role).toLowerCase() === "student"){
                    navigate("/attend/session");
                    return
                }else if((role).toLowerCase() === "lecturer"){
                    navigate(`/dashboard/lecturer`);
                    return
                }
            }
        }catch(err){
            if(err.response){
                setIsLoading(false)
                setErrorMsg(err?.response?.data?.message?? "Login Failed")

                setTimeout(() => {
                    setErrorMsg(null)
                }, 3000)
            }
        }
    }
)