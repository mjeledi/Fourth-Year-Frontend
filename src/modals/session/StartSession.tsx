import { useState } from "react";
import Spinner from "../../loaders/Spinner";
import { useSelector } from "react-redux";
import { selectClasses } from "../../store/sesssion/selector";
import ClassSelector from "./ClassSelector";

export default function StartSession() {

    // const dispatch = useAppDispatch();

    const classes = useSelector(selectClasses)
    console.log(classes)
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // async function HttpDeleteSession(){
    //   try{
    //     await dispatch(HttpDeleteSessionHandler({ setIsLoading })).unwrap()
    //   }catch(err: any){
    //     setError(err?.message?? "Failed to delete session.")

    //     setTimeout(() => {
    //       setError("")
    //     }, 4000)
    //   }
    // }

    return <section className="w-full py-6 px-4 space-y-3 mx-auto h-[70vh] overflow-auto">
      <p className="text-lg font-semibold">Select ClassRoom</p>

      <p className="text-sm text-gray-600 leading-7">
        You’re about to start a new session. This action will initialize the session and allow you to begin tracking attendance.
      </p>

      <div className="w-full">
        <ClassSelector classes={classes} onSelect={() => {}}/>
      </div>

      <div className={`flex ${isLoading? 'justify-between' : 'justify-end'}`}>
        {isLoading && <div className="flex space-x-2 mt-3">
          <Spinner color="border-green-600"/>
          <p className="text-sm text-green-600 font-medium">Starting Session</p>
        </div>}

        <div className="space-x-4">
          <button className="border py-2 px-4 rounded-lg text-sm font-medium" onClick={() => {}}>Cancel</button>
          <button onClick={() => {}} className="border bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium">Start</button>
        </div>
      </div>  
      { error && <p className="text-sm font-medium text-red-600 text-center">{error}</p>}
  </section>
}
