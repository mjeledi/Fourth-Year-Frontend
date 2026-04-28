import { useSelector } from "react-redux";
import { useAppDispatch } from "./store/hooks";
import { selectSessions } from "./store/sesssion/selector";
import { HttpFetchSessions } from "./store/sesssion/thunks";
import SessionSelector from "./SessionSelector";
import { useEffect } from "react";
import { useNavigate } from 'react-router';

export const AttendSession = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const sessions = useSelector(selectSessions);

    useEffect(() => {
        async function fetchSessions() {
          try {
            await dispatch(HttpFetchSessions()).unwrap();
          } catch (error) {
            console.error("Error fetching sessions:", error);
          }
        }
    
        fetchSessions();
    }, []);

    return <div className="flex flex-col h-[80vh] overflow-auto mt-20 items-center">
        <SessionSelector sessions={sessions} onProceed={(session) => {
          navigate(`/scan?sessionId=${btoa(session.session_id)}`);
        }}/>
    </div>
}

export default AttendSession