import { useEffect, useState } from 'react';
import { BookOpen, Users, Clock, TrendingUp,Camera } from 'lucide-react';
import StartSessionModal from './modals/session/StartSessionModal';
import { useAppDispatch } from './store/hooks';
import { HttpFetchClasses, HttpFetchSessions, HttpLecturerCourses } from './store/sesssion/thunks';
import { useSelector } from 'react-redux';
import { selectClassModal, selectCourses, selectIsModalOpen, selectSessions, selectUser } from './store/sesssion/selector';
import { sessionActions } from './store/sesssion/slice';
import { HttpFetchUser } from './store/sesssion/user-thunks';
import ClassModal from './modals/class/ClassModal';
import { useNavigate } from 'react-router';

const LecturerDashboard = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isModalOpen = useSelector(selectIsModalOpen)
  const isClassModalOpen = useSelector(selectClassModal)

  const user = useSelector(selectUser)
  const courses = useSelector(selectCourses)
  const sessions = useSelector(selectSessions).filter((s) => s.is_active === true)

  const totalStudents = sessions.reduce((total, session) => total + (session.students), 0);
  const totalAttended = sessions.reduce((sum, s) => sum + (s.students_attendance), 0);
  const attendancePercentage = (totalStudents === 0 ? 0 : (totalAttended / totalStudents) * 100).toFixed(1);

  const lecturerInfo = {
    name: 'Dr. Rebecca Manoah',
    department: 'School of Computing and Informatics',
    courses: 3,
    totalStudents: 135
  };

  useEffect(() => {
    async function fetchClasses() {
      try {
        await dispatch(HttpFetchClasses()).unwrap();
        await dispatch(HttpLecturerCourses()).unwrap();
        await dispatch(HttpFetchUser()).unwrap();
        await dispatch(HttpFetchSessions()).unwrap();
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }

    fetchClasses();
  }, []);

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-yellow-50">

      <StartSessionModal isOpen={isModalOpen}/>
      <ClassModal isOpen={isClassModalOpen}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .pulse-dot {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="capitalize w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user?.full_name?.split(' ').map(n => n[0]).join('') || 'L'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{capitalize(user?.full_name?? "")}</h1>
                <p className="text-sm text-gray-600 ">{lecturerInfo.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={(e) => {
                e.preventDefault();
                dispatch(sessionActions.ClassModalStateHandler(true));
              }} className="px-5 py-2.5 border border-green-600 text-green-600 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                Create Class
              </button>
              <button onClick={(e) => {
                e.preventDefault();
                dispatch(sessionActions.ModalStateHandler(true));
              }} className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Start Session
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{sessions.length}</p>
            <p className="text-sm text-gray-600">Active Sessions</p>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalAttended}</p>
            <p className="text-sm text-gray-600">Total Students Attended</p>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{attendancePercentage}%</p>
            <p className="text-sm text-gray-600">Avg Attendance</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Sessions & My Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Sessions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Sessions</h2>
              </div>

              <div className="space-y-4">
                {sessions.map((session, index) => (
                  <div
                    key={session?.session_id?? index}
                    className={`rounded-xl p-5 border-l-4 ${
                      session.is_active ? 'bg-green-50 border-green-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">

                        <div className='flex justify-between'>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-gray-900">{session?.course_name?? ""}</h3>
                            <span className="px-2 py-0.5 bg-white rounded text-xs font-semibold text-gray-600">
                              {session?.course_code?? ""}
                            </span>
                            {session?.is_active && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-600 text-white rounded text-xs font-semibold">
                                <span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot"></span>
                                Live
                              </span>
                            )}
                          </div>
                          <div>
                            <button onClick={() => navigate(`/session/attendance/${btoa(session.session_id)}`)} className='bg-green-600 text-sm font-semibold px-6 py-3 rounded-xl text-white'>View attendance</button>
                          </div>
                        </div>


                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDateTime(session?.start_time?? "")}</span>
                            <span>-</span>
                            <span>{formatDateTime(session?.end_time?? "")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{session?.class_name?? ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{session?.students_attendance?? 0}</p>
                          <p className="text-xs text-gray-600">Present</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-400">{session?.students - session?.students_attendance}</p>
                          <p className="text-xs text-gray-600">Absent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{((session?.students_attendance / session?.students) * 100).toFixed(1) }%</p>
                          <p className="text-xs text-gray-600">Attendance Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Courses */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
              </div>

              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div
                    key={course?.course_id?? index}
                    className="bg-gradient-to-r from-green-50 to-green-50 rounded-xl p-5 border border-green-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900">{course?.course_name?? ""}</h3>
                          <span className="px-2 py-0.5 bg-white rounded text-xs font-semibold text-gray-600">
                            {course?.course_code?? ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
