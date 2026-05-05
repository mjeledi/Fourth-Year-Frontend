import { useParams } from "react-router";
import { useAppDispatch } from "./store/hooks";
import { useEffect, useState } from "react";
import { HttpFetchSessionAttendance, HttpFetchSessionAttendanceReport } from "./store/sesssion/attendanceThunks";
import { useSelector } from "react-redux";
import { selectAttendance } from "./store/sesssion/selector";
import AttendanceTable from "./SessionTable";

export default function SessionAttendance(){

    const dispatch = useAppDispatch();
    const params = useParams();

    const sessionId = atob(params.session_id);
    const attendance = useSelector(selectAttendance);

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchSessionAttendance() {
          try {
            await dispatch(HttpFetchSessionAttendance({ session_id : sessionId, setIsLoading })).unwrap();
          } catch (error) {
            console.error("Error fetching classes:", error);
          }
        }
    
        fetchSessionAttendance();
    }, []);

    async function DownloadReportHandler(){
        try{
            await dispatch(HttpFetchSessionAttendanceReport({ session_id : sessionId })).unwrap()
        }catch(err){
            console.log(err)
        }
    }

    return <section className="px-8 py-6 space-y-6">

        <div className="flex justify-between">
            <div>
            <h1 className="text-2xl font-semibold">Attendance Report</h1>
            <p className="text-gray-600 text-base mt-1">
                View and manage student attendance records for this session. 
                This includes student details, course information, and timestamps of attendance.
            </p>
            </div>
            <div>
                <button onClick={DownloadReportHandler} className="bg-green-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-green-700">Download Report</button>
            </div>
        </div>

        {/* Summary / Metadata */}
        {attendance && attendance.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-black/10 shadow">

            <div>
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium">
                {attendance[0].course_code} - {attendance[0].course_name || "N/A"}
            </p>
            </div>

            <div>
            <p className="text-sm text-gray-500">Venue</p>
            <p className="font-medium">
                {attendance[0].venue || "Not specified"}
            </p>
            </div>

            <div>
            <p className="text-sm text-gray-500">Total Records</p>
            <p className="font-medium">
                {attendance.length}
            </p>
            </div>

        </div>
        )}

        {/* Table or Empty State */}
        <div className="bg-white rounded-xl border p-4 border-black/10">

        {attendance && attendance.length > 0 ? (
            <>
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Student Attendance List</h2>
                <p className="text-base text-gray-500">
                Below is the list of students who have recorded attendance for this session.
                </p>
            </div>

            <AttendanceTable attendance={attendance} />
            </>
        ) : (
            <div className="text-center py-10">
            <p className="text-gray-500">No attendance records found.</p>
            <p className="text-sm text-gray-400 mt-1">
                Attendance data will appear here once students check in.
            </p>
            </div>
        )}

        </div>

    </section>
}