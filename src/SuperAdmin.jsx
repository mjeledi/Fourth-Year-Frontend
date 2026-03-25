import React, { useState } from 'react';
import { 
  Shield, Users, Building2, Settings, Activity, Database, 
  UserPlus, SchoolIcon, Eye, Search, Filter, Download, 
  AlertTriangle, CheckCircle, Clock, MoreVertical, Edit, 
  Trash2, Lock, Unlock, RefreshCw, BarChart3, FileText,
  Server, Wifi, Camera, Bell, ChevronDown, Plus, X
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, schools, admins, logs, settings
  const [showModal, setShowModal] = useState(null); // 'add-school', 'add-admin', 'edit-school', etc.
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('today');

  // Mock Data
  const systemStats = {
    totalSchools: 6,
    totalAdmins: 15,
    totalStudents: 2845,
    totalLecturers: 234,
    activeUsers: 1876,
    systemUptime: '99.8%',
    databaseSize: '2.3 GB',
    apiCalls: 45678
  };

  const schools = [
    { 
      id: 1, 
      name: 'School of Computing and Informatics', 
      code: 'SCI',
      students: 645, 
      lecturers: 45,
      admins: 3,
      status: 'active',
      attendance: 85.2,
      created: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'School of Medicine', 
      code: 'MED',
      students: 523, 
      lecturers: 67,
      admins: 2,
      status: 'active',
      attendance: 91.4,
      created: '2024-01-15'
    },
    { 
      id: 3, 
      name: 'School of Engineering', 
      code: 'ENG',
      students: 498, 
      lecturers: 52,
      admins: 2,
      status: 'active',
      attendance: 76.8,
      created: '2024-01-15'
    },
    { 
      id: 4, 
      name: 'School of Education', 
      code: 'EDU',
      students: 412, 
      lecturers: 38,
      admins: 2,
      status: 'active',
      attendance: 81.3,
      created: '2024-01-20'
    },
    { 
      id: 5, 
      name: 'School of Business and Economics', 
      code: 'BUS',
      students: 387, 
      lecturers: 28,
      admins: 2,
      status: 'active',
      attendance: 73.5,
      created: '2024-01-20'
    },
    { 
      id: 6, 
      name: 'School of Agriculture', 
      code: 'AGR',
      students: 380, 
      lecturers: 24,
      admins: 2,
      status: 'inactive',
      attendance: 79.1,
      created: '2024-02-01'
    }
  ];

  const adminUsers = [
    {
      id: 1,
      name: 'Dr. John Kamau',
      email: 'j.kamau@university.ac.ke',
      role: 'School Admin',
      school: 'School of Computing and Informatics',
      status: 'active',
      lastLogin: '2 hours ago',
      created: '2024-01-15',
      permissions: ['manage_students', 'manage_lecturers', 'view_reports']
    },
    {
      id: 2,
      name: 'Prof. Mary Wanjiku',
      email: 'm.wanjiku@university.ac.ke',
      role: 'School Admin',
      school: 'School of Medicine',
      status: 'active',
      lastLogin: '1 day ago',
      created: '2024-01-16',
      permissions: ['manage_students', 'manage_lecturers', 'view_reports']
    },
    {
      id: 3,
      name: 'Dr. Peter Omondi',
      email: 'p.omondi@university.ac.ke',
      role: 'School Admin',
      school: 'School of Engineering',
      status: 'active',
      lastLogin: '3 hours ago',
      created: '2024-01-16',
      permissions: ['manage_students', 'view_reports']
    },
    {
      id: 4,
      name: 'Jane Akinyi',
      email: 'j.akinyi@university.ac.ke',
      role: 'School Admin',
      school: 'School of Education',
      status: 'suspended',
      lastLogin: '2 weeks ago',
      created: '2024-01-20',
      permissions: ['view_reports']
    }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: '2025-02-13 08:15:23',
      user: 'Dr. John Kamau',
      action: 'Created new admin account',
      details: 'Added admin for School of Computing',
      type: 'user_management',
      severity: 'info',
      ipAddress: '192.168.10.45'
    },
    {
      id: 2,
      timestamp: '2025-02-13 07:45:12',
      user: 'System',
      action: 'Database backup completed',
      details: 'Automated backup successful (2.3 GB)',
      type: 'system',
      severity: 'success',
      ipAddress: 'localhost'
    },
    {
      id: 3,
      timestamp: '2025-02-13 07:30:05',
      user: 'Prof. Mary Wanjiku',
      action: 'Modified school settings',
      details: 'Updated compliance threshold for Medicine',
      type: 'configuration',
      severity: 'warning',
      ipAddress: '192.168.20.12'
    },
    {
      id: 4,
      timestamp: '2025-02-13 06:20:18',
      user: 'System',
      action: 'Failed login attempt',
      details: 'Multiple failed login attempts from 41.90.xxx.xxx',
      type: 'security',
      severity: 'error',
      ipAddress: '41.90.45.67'
    },
    {
      id: 5,
      timestamp: '2025-02-13 05:10:33',
      user: 'Super Admin',
      action: 'Created new school',
      details: 'Added School of Agriculture',
      type: 'school_management',
      severity: 'info',
      ipAddress: '192.168.1.100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-in {
          animation: slideIn 0.4s ease-out;
        }

        .stagger-1 { animation-delay: 0.1s; animation-fill-mode: both; }
        .stagger-2 { animation-delay: 0.2s; animation-fill-mode: both; }
        .stagger-3 { animation-delay: 0.3s; animation-fill-mode: both; }
        .stagger-4 { animation-delay: 0.4s; animation-fill-mode: both; }

        .modal-backdrop {
          backdrop-filter: blur(4px);
          background: rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Super Admin Panel</h1>
                <p className="text-sm text-indigo-100">Full System Control & Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 hover:bg-white/20 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-xl">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Super Admin</p>
                  <p className="text-xs text-indigo-100">System Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[88px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'System Overview', icon: Activity },
              { id: 'schools', label: 'Schools Management', icon: Building2 },
              { id: 'admins', label: 'Admin Accounts', icon: Users },
              { id: 'logs', label: 'System Logs', icon: FileText },
              { id: 'settings', label: 'System Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 animate-slide-in stagger-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{systemStats.totalSchools}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Total Schools</p>
                <p className="text-xs text-gray-500 mt-1">Active across system</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 animate-slide-in stagger-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{systemStats.totalAdmins}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Admin Accounts</p>
                <p className="text-xs text-gray-500 mt-1">School administrators</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 animate-slide-in stagger-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{systemStats.activeUsers.toLocaleString()}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Active Users</p>
                <p className="text-xs text-gray-500 mt-1">Currently online</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 animate-slide-in stagger-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">System Uptime</p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowModal('add-school')}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold">Add New School</p>
                    <p className="text-xs text-indigo-100">Create school department</p>
                  </div>
                </button>

                <button
                  onClick={() => setShowModal('add-admin')}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all"
                >
                  <UserPlus className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold">Create Admin Account</p>
                    <p className="text-xs text-purple-100">Add school administrator</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('logs')}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-xl transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold">View System Logs</p>
                    <p className="text-xs text-blue-100">Monitor all activities</p>
                  </div>
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">System Resources</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">Database Size</span>
                      <span className="font-bold text-gray-900">{systemStats.databaseSize}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">API Calls Today</span>
                      <span className="font-bold text-gray-900">{systemStats.apiCalls.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">Active Sessions</span>
                      <span className="font-bold text-gray-900">1,234</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {systemLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        log.severity === 'success' ? 'bg-green-500' :
                        log.severity === 'error' ? 'bg-red-500' :
                        log.severity === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{log.action}</p>
                        <p className="text-xs text-gray-600">{log.user} • {log.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCHOOLS MANAGEMENT TAB */}
        {activeTab === 'schools' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Schools Management</h2>
                <p className="text-sm text-gray-600 mt-1">Manage all university schools and departments</p>
              </div>
              <button
                onClick={() => setShowModal('add-school')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New School
              </button>
            </div>

            {/* Schools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school, index) => (
                <div key={school.id} className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-slide-in stagger-${(index % 4) + 1}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{school.code}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{school.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          school.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {school.status}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students</span>
                      <span className="font-bold text-gray-900">{school.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Lecturers</span>
                      <span className="font-bold text-gray-900">{school.lecturers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Admins</span>
                      <span className="font-bold text-gray-900">{school.admins}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className={`font-bold ${
                        school.attendance >= 85 ? 'text-green-600' :
                        school.attendance >= 75 ? 'text-blue-600' :
                        'text-red-600'
                      }`}>{school.attendance}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedItem(school);
                        setShowModal('edit-school');
                      }}
                      className="flex-1 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN ACCOUNTS TAB */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Admin Account Management</h2>
                <p className="text-sm text-gray-600 mt-1">Create and manage school administrator accounts</p>
              </div>
              <button
                onClick={() => setShowModal('add-admin')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Create Admin Account
              </button>
            </div>

            {/* Admins Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Admin Details</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">School</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Status</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Last Login</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Permissions</th>
                      <th className="text-center py-4 px-6 font-bold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((admin) => (
                      <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-gray-900">{admin.name}</p>
                            <p className="text-sm text-gray-600">{admin.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-700">{admin.school}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            admin.status === 'active' ? 'bg-green-100 text-green-700' :
                            admin.status === 'suspended' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {admin.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-700">{admin.lastLogin}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-xs text-gray-600">{admin.permissions.length} permissions</p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-indigo-600" />
                            </button>
                            {admin.status === 'active' ? (
                              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                <Lock className="w-4 h-4 text-red-600" />
                              </button>
                            ) : (
                              <button className="p-2 hover:bg-green-50 rounded-lg transition-colors">
                                <Unlock className="w-4 h-4 text-green-600" />
                              </button>
                            )}
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM LOGS TAB */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">System-Wide Activity Logs</h2>
                <p className="text-sm text-gray-600 mt-1">Monitor all system activities and security events</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Logs
                </button>
              </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Timestamp</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">User</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Action</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Type</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">Severity</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-700 font-mono">{log.timestamp}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-semibold text-gray-900">{log.user}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-900 font-medium">{log.action}</p>
                          <p className="text-xs text-gray-600">{log.details}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            {log.type}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {log.severity === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                            {log.severity === 'error' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                            {log.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                            {log.severity === 'info' && <Activity className="w-4 h-4 text-blue-600" />}
                            <span className={`text-xs font-semibold ${
                              log.severity === 'success' ? 'text-green-700' :
                              log.severity === 'error' ? 'text-red-700' :
                              log.severity === 'warning' ? 'text-yellow-700' :
                              'text-blue-700'
                            }`}>
                              {log.severity.toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-700 font-mono">{log.ipAddress}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
              <p className="text-sm text-gray-600 mt-1">Manage global system settings and configurations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  General Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">System Maintenance Mode</p>
                      <p className="text-xs text-gray-600">Disable user access for maintenance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">Auto Backup</p>
                      <p className="text-xs text-gray-600">Daily automatic database backup</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-gray-900">Email Notifications</p>
                      <p className="text-xs text-gray-600">System alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      defaultValue="90"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Attendance Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Attendance Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Compliance Threshold (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="75"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">Facial Recognition</p>
                      <p className="text-xs text-gray-600">Enable face detection</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-gray-900">Proximity Check</p>
                      <p className="text-xs text-gray-600">Verify student location</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* System Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Maintenance
                </h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Backup Database Now
                  </button>
                  <button className="w-full py-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Export System Data
                  </button>
                  <button className="w-full py-3 bg-orange-50 text-orange-700 rounded-xl font-semibold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                    <Activity className="w-5 h-5" />
                    Clear System Cache
                  </button>
                  <button className="w-full py-3 bg-red-50 text-red-700 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Reset System Settings
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                Save All Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in">
            {/* Add School Modal */}
            {showModal === 'add-school' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New School</h2>
                  <button
                    onClick={() => setShowModal(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., School of Computing and Informatics"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., SCI"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Students
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Lecturers
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Brief description of the school..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowModal(null)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      Create School
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Add Admin Modal */}
            {showModal === 'add-admin' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create Admin Account</h2>
                  <button
                    onClick={() => setShowModal(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="admin@university.ac.ke"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Assign to School
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none">
                      <option value="">Select a school...</option>
                      {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Permissions
                    </label>
                    <div className="space-y-2">
                      {['manage_students', 'manage_lecturers', 'view_reports', 'edit_settings'].map((perm) => (
                        <label key={perm} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm text-gray-700 capitalize">{perm.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowModal(null)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      Create Admin
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;