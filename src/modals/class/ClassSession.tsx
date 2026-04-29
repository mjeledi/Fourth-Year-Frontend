import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { sessionActions } from "../../store/sesssion/slice";
import Spinner from "../../loaders/Spinner";
import PositionLocation from "./PositionLocation";
import { HttpCreateClassHandler } from "../../store/sesssion/thunks";
export default function ClassSession() {

  const dispatch = useAppDispatch();

  
  const [className, setClassName] = useState("");
  const [points, setPoints] = useState({ east: null, west: null, north: null, south: null });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async() => {
    if (!points.east || !points.west || !points.north || !points.south) {
      alert("Please capture all 4 points before submitting");
      return;
    }

    // try{
    //   await dispatch(HttpCreateClassHandler({ className: className, setIsLoading, east: points.east, west: points.west, north: points.north, 
    //     south: points.south
    //    })).unwrap()
    // }catch(err : any){
    //   setError(err.message?? "Error occurred while creating class")

    //   setTimeout(() => {
    //     setError("")
    //   }, 3000)
    //   return
    // }

    const payload = { class_name: className, ...points };
    console.log("Submitting payload:", payload);
  };
  

  return <section className="w-full py-6 px-4 space-y-4 mx-auto max-h-[70vh] overflow-auto">
    <p className="text-lg font-semibold">Create Class</p>
    <p className="text-sm text-gray-600 leading-7">You’re about to capture class location. Follow the steps below.</p>

    <PositionLocation points={points} setPoints={setPoints} setClassName={setClassName} className={className}/>

    <div className={`flex ${isLoading? 'justify-between' : 'justify-end'}`}>
            {isLoading && <div className="flex space-x-2 mt-3">
              <Spinner color="border-green-600"/>
              <p className="text-sm text-green-600 font-medium">Creating Class</p>
            </div>}
    
      <div className="space-x-4">
        <button className="border py-2 px-4 rounded-lg text-sm font-medium" onClick={() => dispatch(sessionActions.ClassModalStateHandler(false))}>Cancel</button>
        <button onClick={handleSubmit} className="border bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium">Create Class</button>
      </div>
    </div>  
    { error && <p className="text-sm font-medium text-red-600 text-center">{error}</p>}
  </section>
}