import React, { useEffect, useState } from 'react';
import { BookOpen, Users, Clock, CheckCircle, XCircle, Calendar, TrendingUp, Download, Search, Filter, Bell, ChevronRight, AlertTriangle, Camera } from 'lucide-react';
import StartSessionModal from './modals/session/StartSessionModal';
import { useAppDispatch } from './store/hooks';
import { HttpFetchClasses } from './store/sesssion/thunks';

const LecturerDashboard = () => {

  const dispatch = useAppDispatch();
  
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [viewMode, setViewMode] = useState('today'); // today, week, semester

  const lecturerInfo = {
    name: 'Dr. Rebecca Manoah',
    department: 'School of Computing and Informatics',
    courses: 3,
    totalStudents: 135
  };

  const courses = [
    {
      id: 1,
      code: 'CSC 301',
      name: 'Data Structures & Algorithms',
      students: 45,
      schedule: 'Mon, Wed, Fri 8:00-10:00 AM',
      venue: 'Lab 3',
      attendance: 87.5,
      sessionsToday: 1,
      nextClass: '2:00 PM'
    },
    {
      id: 2,
      code: 'CSC 401',
      name: 'Advanced Algorithms',
      students: 38,
      schedule: 'Tue, Thu 10:00 AM-12:00 PM',
      venue: 'Room 204',
      attendance: 82.3,
      sessionsToday: 0,
      nextClass: 'Tomorrow 10:00 AM'
    },
    {
      id: 3,
      code: 'CSC 501',
      name: 'Research Methods',
      students: 52,
      schedule: 'Wed 2:00-4:00 PM',
      venue: 'Lecture Hall 1',
      attendance: 91.2,
      sessionsToday: 1,
      nextClass: 'In Progress'
    }
  ];

  const todaySessions = [
    {
      id: 1,
      course: 'Data Structures & Algorithms',
      code: 'CSC 301',
      time: '8:00 AM - 10:00 AM',
      venue: 'Lab 3',
      status: 'completed',
      present: 42,
      total: 45,
      percentage: 93.3,
      duration: '120 mins'
    },
    {
      id: 2,
      course: 'Research Methods',
      code: 'CSC 501',
      time: '2:00 PM - 4:00 PM',
      venue: 'Lecture Hall 1',
      status: 'ongoing',
      present: 48,
      total: 52,
      percentage: 92.3,
      duration: '45 mins elapsed'
    }
  ];

  const recentAttendance = [
    { name: 'John Kamau', regNo: 'SCI/00123/2021', course: 'CSC 301', time: '8:05 AM', status: 'present', method: 'facial' },
    { name: 'Mary Wanjiku', regNo: 'SCI/00234/2021', course: 'CSC 301', time: '8:07 AM', status: 'present', method: 'facial' },
    { name: 'Peter Omondi', regNo: 'SCI/00345/2022', course: 'CSC 301', time: '8:10 AM', status: 'present', method: 'facial' },
    { name: 'Alice Njeri', regNo: 'SCI/00456/2020', course: 'CSC 301', time: '-', status: 'absent', method: '-' },
    { name: 'Brian Otieno', regNo: 'SCI/00567/2021', course: 'CSC 301', time: '8:15 AM', status: 'late', method: 'facial' }
  ];

  const lowAttendanceStudents = [
    { name: 'Alice Njeri', regNo: 'SCI/00234/2021', course: 'CSC 301', attendance: 68.5, absent: 10 },
    { name: 'David Mwangi', regNo: 'SCI/00345/2022', course: 'CSC 401', attendance: 71.2, absent: 9 },
    { name: 'Carol Adhiambo', regNo: 'SCI/00456/2020', course: 'CSC 301', attendance: 69.8, absent: 8 }
  ];

  useEffect(() => {
    async function fetchClasses() {
      try {
        await dispatch(HttpFetchClasses()).unwrap();
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }

    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">

      <StartSessionModal isOpen={false}/>
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
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {lecturerInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{lecturerInfo.name}</h1>
                <p className="text-sm text-gray-600">{lecturerInfo.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 hover:bg-orange-50 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={(e) => {
                // TODO TASKS: IMPLEMENT START SESSION LOGIC
                console.log("STARTING SESSION")
              }} className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
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
          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{lecturerInfo.courses}</p>
            <p className="text-sm text-gray-600">Active Courses</p>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{lecturerInfo.totalStudents}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">87.0%</p>
            <p className="text-sm text-gray-600">Avg Attendance</p>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
            <p className="text-sm text-gray-600">Students at Risk</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Sessions & My Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Sessions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Sessions</h2>
                <span className="text-sm text-gray-600">Friday, February 13, 2026</span>
              </div>

              <div className="space-y-4">
                {todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className={`rounded-xl p-5 border-l-4 ${
                      session.status === 'completed'
                        ? 'bg-green-50 border-green-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900">{session.course}</h3>
                          <span className="px-2 py-0.5 bg-white rounded text-xs font-semibold text-gray-600">
                            {session.code}
                          </span>
                          {session.status === 'ongoing' && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-600 text-white rounded text-xs font-semibold">
                              <span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot"></span>
                              Live
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{session.venue}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{session.present}</p>
                          <p className="text-xs text-gray-600">Present</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-400">{session.total - session.present}</p>
                          <p className="text-xs text-gray-600">Absent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{session.percentage}%</p>
                          <p className="text-xs text-gray-600">Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Courses */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900">{course.name}</h3>
                          <span className="px-2 py-0.5 bg-white rounded text-xs font-semibold text-gray-600">
                            {course.code}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {course.schedule}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Next class: {course.nextClass}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-2xl font-bold ${
                          course.attendance >= 85 ? 'text-green-600' :
                          course.attendance >= 75 ? 'text-blue-600' :
                          'text-red-600'
                        }`}>
                          {course.attendance}%
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Attendance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${course.attendance}%`,
                            backgroundColor:
                              course.attendance >= 85
                                ? '#10b981'
                                : course.attendance >= 75
                                ? '#3b82f6'
                                : '#ef4444'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
          </div>

          {/* Right Column - At-Risk Students & Quick Actions */}
          <div className="space-y-6">
            {/* Students Needing Attention */}
            {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-900">Needs Attention</h2>
              </div>

              <div className="space-y-3">
                {lowAttendanceStudents.map((student, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.regNo}</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                        {student.attendance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{student.course}</span>
                      <span>{student.absent} absences</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Contact Students
              </button>
            </div> */}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-lg font-bold mb-4">This Week's Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Classes Conducted</span>
                  <span className="text-2xl font-bold">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Attendance Marks</span>
                  <span className="text-2xl font-bold">312</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Attendance</span>
                  <span className="text-2xl font-bold">89.2%</span>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
