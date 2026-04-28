import { useState } from "react";
import { aiActions } from "../../app/ai/aiSlice";
import { useAppDispatch } from "../../hooks/dispatch";
import { HttpDeleteSessionHandler } from "../../app/ai/sessionThunks";
import Spinner from "../../loaders/Spinner";

export default function DeleteSession() {

    const dispatch = useAppDispatch();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function HttpDeleteSession(){
      try{
        await dispatch(HttpDeleteSessionHandler({ setIsLoading })).unwrap()
      }catch(err: any){
        setError(err?.message?? "Failed to delete session.")

        setTimeout(() => {
          setError("")
        }, 4000)
      }
    }

    return <section className="w-full py-6 px-4 space-y-3 mx-auto overflow-auto">
      <p className="text-lg font-semibold">Delete Session</p>

      <p className="text-sm text-gray-600 leading-7">
        You’re about to permanently delete this <span className="font-bold text-black">Hello</span> session. This action will remove all associated data, activity logs, and any temporary state tied to this session.
      </p>

      <p className="text-sm text-gray-600 leading-7">
        If you’re unsure, you can cancel and review the session details before proceeding.
      </p>
      <div className={`flex ${isLoading? 'justify-between' : 'justify-end'}`}>
        {isLoading && <div className="flex space-x-2 mt-3">
          <Spinner color="border-green-600"/>
          <p className="text-sm text-green-600 font-medium">Deleting Session</p>
        </div>}

        <div className="space-x-4">
          <button className="border py-2 px-4 rounded-lg text-sm font-medium" onClick={() => dispatch(aiActions.DeleteModalState(false))}>Cancel</button>
          <button onClick={HttpDeleteSession} className="border bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium">Delete</button>
        </div>
      </div>  
      { error && <p className="text-sm font-medium text-red-600 text-center">{error}</p>}
  </section>
}
