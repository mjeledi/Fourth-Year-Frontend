import { IoCheckmarkSharp } from "react-icons/io5";
import { useAppDispatch } from "../store/hooks";
import { sessionActions } from "../store/sesssion/slice";
import { useNavigate } from "react-router";

export default function AttendanceMarked() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    return (
        <section className="p-6 space-y-6">

            {/* Success Icon */}
            <div className="flex justify-center mt-20">
                <div className="bg-green-100 p-6 rounded-full">
                    <IoCheckmarkSharp className="size-20 text-green-600" />
                </div>
            </div>

            {/* Title */}
            <p className="text-center font-bold text-[20px]">
                Attendance <span className="text-primary">Marked Successfully</span>
            </p>

            {/* Message */}
            <p className="text-center text-gray-600 text-sm">
                Your attendance has been recorded successfully. You can now continue with your session.
            </p>

            {/* Button */}
            <div className="flex justify-center pt-4">
                <button onClick={() => { 
                    navigate('/', { replace: true });
                    dispatch(sessionActions.AttendanceMarked(false))}
                } className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
                    Proceed
                </button>
            </div>

        </section>
    );
}