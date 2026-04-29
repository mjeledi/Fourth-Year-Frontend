import { useState } from "react";
import Spinner from "../../loaders/Spinner";
import { useSelector } from "react-redux";
import { selectClasses, selectCourses } from "../../store/sesssion/selector";
import ClassSelector from "./ClassSelector";
import { useAppDispatch } from "../../store/hooks";
import { sessionActions } from "../../store/sesssion/slice";
import CourseSelector from "./CourseSelector";
import { HttpCreateSession } from "../../store/sesssion/thunks";
import SessionTimeForm from "./SessionTimeFrom";

export default function StartSession() {

  const dispatch = useAppDispatch();

  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const classes = useSelector(selectClasses);
  const courses = useSelector(selectCourses);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  function resetState() {
    setStep(1);
    setSelectedCourse(null);
    setSelectedClass(null);
    setError("");
    setStartTime("")
    setEndTime("")
    setIsLoading(false);

    dispatch(sessionActions.ModalStateHandler(false));
  }


  // * Handle session start
  const handleStartSession = async () => {
    if (!selectedClass || !selectedCourse) {
      setError("Please select both class and course");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const classId = selectedClass.class_id;
      const courseCode = selectedCourse.course_code;
      const courseName = selectedCourse.course_name;
      const courseId = selectedCourse.course_id;

      await dispatch(HttpCreateSession({ setIsLoading, classId, courseCode, courseName, courseId, resetState, startTime, endTime })).unwrap();
    } catch (err : any) {
      setIsLoading(false);
      setError(err.message || "Failed to start session");
    }
  };

  const formatDateTime = (dateString : string) => {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function handleDateTimeSelection(){
    if (new Date(endTime) <= new Date(startTime)) {
      setError("End time must be after start time");

      setTimeout(() => {
        setError("")
      }, 3000)
      return;
    }

    setStep(4)
  }

  return <section className="w-full py-6 px-4 space-y-4 mx-auto max-h-[70vh] overflow-auto">

            <p className="text-lg font-semibold">Start Session</p>
            <p className="text-sm text-gray-600 leading-7">You’re about to start a new session. Follow the steps below.</p>

            {step === 1 && <div>
              <ClassSelector classes={classes} onSelect={(cls: any) => { setSelectedClass(cls) }}/>
                <div className="flex justify-between mt-4">
                  <button onClick={() => resetState()} className="border py-2 px-4 rounded-lg text-sm font-medium">Cancel</button>
                  <button
                    disabled={Object.keys(selectedClass || {}).length === 0}
                    onClick={() => setStep(2)}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium disabled:opacity-50"
                  >Next</button>
                </div>
              </div>}

            {step === 2 &&  <div>
              <CourseSelector courses={courses} onSelect={(course: any) => setSelectedCourse(course)}/>

              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(1)} className="border py-2 px-4 rounded-lg text-sm font-medium">Back</button>
                <button disabled={!selectedCourse} onClick={() => setStep(3)} 
                  className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium disabled:opacity-50">
                    Next
                </button>
              </div>
            </div>}

            { step === 3 && <div>
              <SessionTimeForm endTime={endTime} startTime={startTime} setEndTime={setEndTime} setStartTime={setStartTime}/>

              <div className="mt-3 space-y-2 text-gray-500">
                  <p>Start: {formatDateTime(startTime)}</p>
                  <p>End: {formatDateTime(endTime)}</p>
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(1)} className="border py-2 px-4 rounded-lg text-sm font-medium">Back</button>
                <button disabled={!selectedCourse} onClick={handleDateTimeSelection} 
                  className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium disabled:opacity-50">
                    Next
                </button>
              </div>
            </div>}

            {step === 4 && (
                <>
                    <p className="font-medium">Confirm Details</p>

                    <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg">
                        <p><strong>Class:</strong> {selectedClass?.class_name}</p>
                        <p><strong>Course:</strong> {selectedCourse?.course_name}</p>
                    </div>

                    <div className="mt-3 space-y-2 text-gray-500">
                        <p>Start: {formatDateTime(startTime)}</p>
                        <p>End: {formatDateTime(endTime)}</p>
                    </div>

                    <div className={`flex ${isLoading ? 'justify-between' : 'justify-end'}`}>

                        {isLoading && (
                            <div className="flex space-x-2 mt-3">
                                <Spinner color="border-green-600" />
                                <p className="text-sm text-green-600 font-medium">
                                    Starting Session...
                                </p>
                            </div>
                        )}

                        <div className="space-x-4 mt-4">
                            <button
                                onClick={() => setStep(2)}
                                className="border py-2 px-4 rounded-lg text-sm font-medium"
                            >
                                Back
                            </button>

                            <button
                                onClick={handleStartSession}
                                className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                            >
                                Start Session
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* ❌ ERROR */}
            {error && (
                <p className="text-sm font-medium text-red-600 text-center">
                    {error}
                </p>
            )}
  </section>
}