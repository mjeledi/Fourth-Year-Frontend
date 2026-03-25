import { createAsyncThunk } from "@reduxjs/toolkit";

export const HttpAuthThunk = createAsyncThunk(
    "auth/login",
    async({ api, username, password, setIsLoading, setErrorMsg, navigate, role }, { dispatch }) => {
        try{
            setIsLoading(true)
            const response = await api.post('/api/users/login', {
                username: username,
                password: password
            })

            if(response.status === 200){
                setIsLoading(false)
                console.log('SIGNING UP AS : ', role)

                if(role === "student"){

                    const studentId = response.data.data.user.id;
                    console.log("STUDENT ID", studentId)

                    const encodedId = btoa(studentId)
                    navigate(`/recognition/${encodedId}`);
                    return
                }

                navigate(`/dashboard/${role}`);
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