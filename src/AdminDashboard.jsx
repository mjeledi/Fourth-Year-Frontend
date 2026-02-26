import React, { useState } from 'react';
import { Users, TrendingUp, AlertCircle, Download, Filter, Search, Calendar, Building2, Clock, UserCheck, UserX, MoreVertical, ChevronDown, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedSchool, setSelectedSchool] = useState('All Schools');
  const [dateRange, setDateRange] = useState('This Week');
  const [searchQuery, setSearchQuery] = useState('');

  const schools = [
    'All Schools',
    'School of Computing and Informatics',
    'School of Education',
    'School of Medicine',
    'School of Business and Economics',
    'School of Engineering'
  ];

  const summaryStats = {
    totalStudents: 2845,
    presentToday: 2234,
    absentToday: 611,
    averageAttendance: 78.5,
    complianceRate: 82.3,
    atRiskStudents: 156
  };

  const schoolStats = [
    { school: 'Computing & Informatics', students: 645, attendance: 85.2, atRisk: 23, trend: 'up' },
    { school: 'Medicine', students: 523, attendance: 91.4, atRisk: 12, trend: 'up' },
    { school: 'Engineering', students: 498, attendance: 76.8, atRisk: 45, trend: 'down' },
    { school: 'Education', students: 412, attendance: 81.3, atRisk: 28, trend: 'up' },
    { school: 'Business & Economics', students: 387, attendance: 73.5, atRisk: 38, trend: 'down' },
    { school: 'Agriculture', students: 380, attendance: 79.1, atRisk: 10, trend: 'up' }
  ];

  const recentActivity = [
    {
      id: 1,
      student: 'John Kamau',
      regNo: 'SCI/00123/2021',
      action: 'Marked Present',
      course: 'Data Structures',
      time: '8:05 AM',
      status: 'success'
    },
    {
      id: 2,
      student: 'Mary Wanjiku',
      regNo: 'MED/00456/2020',
      action: 'Marked Present',
      course: 'Anatomy',
      time: '8:03 AM',
      status: 'success'
    },
    {
      id: 3,
      student: 'Peter Omondi',
      regNo: 'ENG/00789/2022',
      action: 'Failed Scan',
      course: 'Thermodynamics',
      time: '8:02 AM',
      status: 'warning'
    },
    {
      id: 4,
      student: 'Jane Akinyi',
      regNo: 'EDU/00234/2021',
      action: 'Marked Present',
      course: 'Pedagogy',
      time: '8:01 AM',
      status: 'success'
    },
    {
      id: 5,
      student: 'David Mwangi',
      regNo: 'BUS/00567/2020',
      action: 'Below 75%',
      course: 'Accounting',
      time: '7:58 AM',
      status: 'alert'
    }
  ];

  const atRiskStudents = [
    { name: 'Alice Njeri', regNo: 'SCI/00234/2021', school: 'Computing', attendance: 68.5, courses: 3 },
    { name: 'Brian Otieno', regNo: 'ENG/00345/2022', school: 'Engineering', attendance: 71.2, courses: 4 },
    { name: 'Carol Adhiambo', regNo: 'BUS/00456/2020', school: 'Business', attendance: 69.8, courses: 2 },
    { name: 'Dennis Kiprop', regNo: 'EDU/00567/2021', school: 'Education', attendance: 72.3, courses: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }

        .mono {
          font-family: 'Fira Code', monospace;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.4s ease-out;
        }

        .stat-card {
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Multi-School Attendance Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="glass-effect rounded-2xl p-6 mb-8 border border-white/50 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* School Selector */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all appearance-none text-gray-700 font-medium"
                >
                  {schools.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Date Range Selector */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all appearance-none text-gray-700 font-medium"
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Semester</option>
                  <option>Custom Range</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Student name or reg number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="stat-card glass-effect rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{summaryStats.totalStudents.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Total Students</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{summaryStats.presentToday}</p>
                <p className="text-xs text-gray-500">Present Today</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-600">{summaryStats.absentToday}</p>
                <p className="text-xs text-gray-500">Absent Today</p>
              </div>
            </div>
          </div>

          <div className="stat-card glass-effect rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{summaryStats.averageAttendance}%</p>
                <p className="text-sm text-gray-600 mt-1">Avg Attendance</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${summaryStats.averageAttendance}%` }}
                ></div>
              </div>
              <span className="text-xs font-semibold text-green-600">+2.3%</span>
            </div>
          </div>

          <div className="stat-card glass-effect rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{summaryStats.atRiskStudents}</p>
                <p className="text-sm text-gray-600 mt-1">At-Risk Students</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold">
                Below 75%
              </div>
              <span className="text-xs text-gray-500">Requires intervention</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* School Performance */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-effect rounded-2xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">School Performance</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                {schoolStats.map((school, index) => (
                  <div
                    key={index}
                    className="bg-white/70 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{school.school}</h3>
                        <p className="text-sm text-gray-600">{school.students} students enrolled</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <span className="text-2xl font-bold text-gray-900">{school.attendance}%</span>
                          {school.trend === 'up' ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{school.atRisk} at risk</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${school.attendance}%`,
                            backgroundColor:
                              school.attendance >= 85
                                ? '#10b981'
                                : school.attendance >= 75
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

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <span className="text-sm text-gray-600">Live updates</span>
              </div>

              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white/70 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.status === 'success'
                            ? 'bg-green-100'
                            : activity.status === 'warning'
                            ? 'bg-yellow-100'
                            : 'bg-red-100'
                        }`}
                      >
                        {activity.status === 'success' ? (
                          <UserCheck className="w-5 h-5 text-green-600" />
                        ) : activity.status === 'warning' ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <UserX className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{activity.student}</p>
                          <span className="text-xs text-gray-500 mono">{activity.regNo}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {activity.action} - {activity.course}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 font-medium">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - At-Risk Students & Quick Actions */}
          <div className="space-y-6">
            {/* At-Risk Students */}

            {/* System Status */}
            <div className="glass-effect rounded-2xl p-6 border border-white/50 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Face Recognition</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Database Sync</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Backup Status</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                    Running
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
