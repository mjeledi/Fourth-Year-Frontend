import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, AlertCircle, BookOpen, CheckCircle, XCircle, Award, Bell, LogOut, User, ChevronRight } from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const studentInfo = {
    name: 'John Kamau',
    regNumber: 'SCI/00123/2021',
    school: 'School of Computing and Informatics',
    course: 'Bachelor of Technology Education (Computer Studies)',
    year: '3rd Year',
    semester: 'Semester 2, 2024/2025',
    avatar: 'JK'
  };

  const attendanceStats = {
    overall: 82,
    thisWeek: 90,
    required: 75,
    atRisk: false
  };

  const todayClasses = [
    {
      id: 1,
      name: 'Data Structures & Algorithms',
      code: 'CSC 301',
      time: '8:00 AM - 10:00 AM',
      venue: 'Lab 3, SCI Building',
      lecturer: 'Dr. Jane Mutua',
      status: 'attended',
      attendedAt: '8:05 AM'
    },
    {
      id: 2,
      name: 'Database Management Systems',
      code: 'CSC 302',
      time: '10:00 AM - 12:00 PM',
      venue: 'Room 204, SCI Building',
      lecturer: 'Prof. Peter Ouma',
      status: 'ongoing',
      attendedAt: null
    },
    {
      id: 3,
      name: 'Software Engineering',
      code: 'CSC 303',
      time: '2:00 PM - 4:00 PM',
      venue: 'Lab 5, SCI Building',
      lecturer: 'Dr. Mary Wanjiku',
      status: 'upcoming',
      attendedAt: null
    }
  ];

  const courseAttendance = [
    { name: 'Data Structures', code: 'CSC 301', attended: 28, total: 32, percentage: 87.5 },
    { name: 'Database Systems', code: 'CSC 302', attended: 30, total: 32, percentage: 93.8 },
    { name: 'Software Engineering', code: 'CSC 303', attended: 26, total: 32, percentage: 81.3 },
    { name: 'Computer Networks', code: 'CSC 304', attended: 24, total: 32, percentage: 75.0 },
    { name: 'Operating Systems', code: 'CSC 305', attended: 22, total: 32, percentage: 68.8 }
  ];

  const recentAttendance = [
    { date: '2025-02-13', course: 'Data Structures', status: 'present', time: '8:05 AM' },
    { date: '2025-02-12', course: 'Database Systems', status: 'present', time: '10:03 AM' },
    { date: '2025-02-12', course: 'Software Engineering', status: 'present', time: '2:02 PM' },
    { date: '2025-02-11', course: 'Computer Networks', status: 'present', time: '8:07 AM' },
    { date: '2025-02-10', course: 'Operating Systems', status: 'absent', time: '-' },
    { date: '2025-02-10', course: 'Data Structures', status: 'present', time: '8:04 AM' }
  ];

  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-green-600 bg-green-50';
    if (percentage >= 75) return 'text-blue-600 bg-blue-50';
    if (percentage >= 65) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getAttendanceRing = (percentage) => {
    if (percentage >= 85) return 'stroke-green-500';
    if (percentage >= 75) return 'stroke-blue-500';
    if (percentage >= 65) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Manrope', sans-serif;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }

        .stagger-1 { animation-delay: 0.1s; animation-fill-mode: both; }
        .stagger-2 { animation-delay: 0.2s; animation-fill-mode: both; }
        .stagger-3 { animation-delay: 0.3s; animation-fill-mode: both; }
        .stagger-4 { animation-delay: 0.4s; animation-fill-mode: both; }

        .progress-ring {
          transition: stroke-dashoffset 0.5s ease;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {studentInfo.avatar}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{studentInfo.name}</h1>
                <p className="text-sm text-gray-600">{studentInfo.regNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-in stagger-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{attendanceStats.overall}%</span>
            </div>
            <p className="text-sm font-semibold text-gray-600">Overall Attendance</p>
            <p className="text-xs text-gray-500 mt-1">Semester average</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-in stagger-2">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{attendanceStats.thisWeek}%</span>
            </div>
            <p className="text-sm font-semibold text-gray-600">This Week</p>
            <p className="text-xs text-gray-500 mt-1">4 of 5 classes</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-in stagger-3">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">5</span>
            </div>
            <p className="text-sm font-semibold text-gray-600">Active Courses</p>
            <p className="text-xs text-gray-500 mt-1">This semester</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-in stagger-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">A-</span>
            </div>
            <p className="text-sm font-semibold text-gray-600">Performance Grade</p>
            <p className="text-xs text-gray-500 mt-1">Based on attendance</p>
          </div>
        </div>

        {/* Compliance Alert */}
        {attendanceStats.overall < attendanceStats.required && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-xl p-6 mb-8 animate-slide-in">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Attendance Alert</h3>
                <p className="text-sm text-red-800">
                  Your attendance is below the required 75%. Please attend your classes regularly to meet the compliance requirement.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Schedule */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Classes */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
                <span className="text-sm text-gray-600">Friday, February 13, 2026</span>
              </div>

              <div className="space-y-4">
                {todayClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="border-l-4 pl-4 py-3 rounded-r-xl transition-all hover:bg-gray-50"
                    style={{
                      borderColor:
                        classItem.status === 'attended'
                          ? '#10b981'
                          : classItem.status === 'ongoing'
                          ? '#3b82f6'
                          : '#9ca3af'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900">{classItem.name}</h3>
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                            {classItem.code}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{classItem.venue}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{classItem.lecturer}</p>
                      </div>
                      <div className="ml-4">
                        {classItem.status === 'attended' && (
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 text-green-600 mb-1">
                              <CheckCircle className="w-5 h-5" />
                              <span className="text-sm font-semibold">Attended</span>
                            </div>
                            <span className="text-xs text-gray-500">{classItem.attendedAt}</span>
                          </div>
                        )}
                        {classItem.status === 'ongoing' && (
                          <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold animate-pulse">
                            In Progress
                          </div>
                        )}
                        {classItem.status === 'upcoming' && (
                          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                            Mark Attendance
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Attendance Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Course Attendance Breakdown</h2>
              <div className="space-y-4">
                {courseAttendance.map((course, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.code}</p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg font-bold ${getAttendanceColor(course.percentage)}`}>
                        {course.percentage.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${course.percentage}%`,
                            backgroundColor:
                              course.percentage >= 85
                                ? '#10b981'
                                : course.percentage >= 75
                                ? '#3b82f6'
                                : course.percentage >= 65
                                ? '#f59e0b'
                                : '#ef4444'
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 font-medium min-w-[80px] text-right">
                        {course.attended} / {course.total} classes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Attendance Overview & History */}
          <div className="space-y-6">
            {/* Attendance Circle */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Attendance Status</h2>
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      className={`progress-ring ${getAttendanceRing(attendanceStats.overall)}`}
                      strokeWidth="16"
                      strokeDasharray={`${2 * Math.PI * 80}`}
                      strokeDashoffset={`${2 * Math.PI * 80 * (1 - attendanceStats.overall / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{attendanceStats.overall}%</span>
                    <span className="text-sm text-gray-600 mt-1">Overall</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">128</p>
                  <p className="text-xs text-gray-600 mt-1">Classes Attended</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-xl">
                  <p className="text-2xl font-bold text-red-600">28</p>
                  <p className="text-xs text-gray-600 mt-1">Classes Missed</p>
                </div>
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Attendance</h2>
              <div className="space-y-3">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{record.course}</p>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {record.status === 'present' ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-600">{record.time}</span>
                        </>
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                View Full History
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
