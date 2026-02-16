import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, Users, Target, Award, ChevronRight, Filter } from 'lucide-react';

const AttendanceReports = () => {
  const [reportType, setReportType] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  // Mock data for charts
  const weeklyAttendance = [
    { day: 'Mon', attendance: 85, target: 75 },
    { day: 'Tue', attendance: 78, target: 75 },
    { day: 'Wed', attendance: 82, target: 75 },
    { day: 'Thu', attendance: 88, target: 75 },
    { day: 'Fri', attendance: 76, target: 75 }
  ];

  const coursePerformance = [
    { course: 'Data Structures', attendance: 87, performance: 'A', students: 45 },
    { course: 'Database Systems', attendance: 92, performance: 'A', students: 48 },
    { course: 'Software Engineering', attendance: 81, performance: 'B+', students: 42 },
    { course: 'Computer Networks', attendance: 75, performance: 'B', students: 40 },
    { course: 'Operating Systems', attendance: 68, performance: 'C+', students: 38 }
  ];

  const monthlyTrends = [
    { month: 'Sep', attendance: 82 },
    { month: 'Oct', attendance: 84 },
    { month: 'Nov', attendance: 79 },
    { month: 'Dec', attendance: 81 },
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 83 }
  ];

  const performanceCorrelation = [
    { range: '90-100%', count: 234, avgGrade: 'A', color: '#10b981' },
    { range: '80-89%', count: 456, avgGrade: 'B+', color: '#3b82f6' },
    { range: '75-79%', count: 312, avgGrade: 'B', color: '#f59e0b' },
    { range: '65-74%', count: 189, avgGrade: 'C+', color: '#f97316' },
    { range: 'Below 65%', count: 98, avgGrade: 'D', color: '#ef4444' }
  ];

  const complianceData = {
    compliant: 1876,
    atRisk: 234,
    nonCompliant: 156,
    total: 2266
  };

  const maxAttendance = Math.max(...weeklyAttendance.map(d => d.attendance));
  const maxMonthly = Math.max(...monthlyTrends.map(d => d.attendance));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
        .delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
        .delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
        .delay-4 { animation-delay: 0.4s; animation-fill-mode: both; }

        .chart-bar {
          transition: all 0.3s ease;
        }

        .chart-bar:hover {
          opacity: 0.8;
          transform: scaleY(1.05);
        }

        .gradient-text {
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Attendance Analytics</h1>
            <p className="text-gray-600">Comprehensive insights and performance reports</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-white border-2 border-purple-200 text-purple-700 rounded-xl font-semibold hover:border-purple-400 transition-all flex items-center gap-2 shadow-sm">
              <Filter className="w-5 h-5" />
              Filter
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 animate-fade-in-up delay-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                +5.2%
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">82.5%</p>
            <p className="text-sm text-gray-600">Overall Attendance</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 animate-fade-in-up delay-2">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                82.8%
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">1,876</p>
            <p className="text-sm text-gray-600">Students Compliant</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 animate-fade-in-up delay-3">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                10.3%
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">234</p>
            <p className="text-sm text-gray-600">At-Risk Students</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 animate-fade-in-up delay-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Top 40%
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">B+</p>
            <p className="text-sm text-gray-600">Avg Performance</p>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Attendance Histogram */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Weekly Attendance Pattern</h2>
                <p className="text-sm text-gray-600">Current week • February 10-14, 2026</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>

            <div className="space-y-6">
              {weeklyAttendance.map((day, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">{day.day}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">Target: {day.target}%</span>
                      <span className={`font-bold ${day.attendance >= day.target ? 'text-green-600' : 'text-red-600'}`}>
                        {day.attendance}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-12 bg-gray-100 rounded-xl overflow-hidden">
                    {/* Target line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
                      style={{ left: `${(day.target / 100) * 100}%` }}
                    ></div>
                    {/* Attendance bar */}
                    <div
                      className="chart-bar h-full rounded-xl flex items-center justify-end pr-4 text-white font-bold text-sm"
                      style={{
                        width: `${day.attendance}%`,
                        background: day.attendance >= day.target
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                      }}
                    >
                      {day.attendance}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
                <span className="text-sm text-gray-600">Above Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded"></div>
                <span className="text-sm text-gray-600">Below Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-4 bg-gray-400"></div>
                <span className="text-sm text-gray-600">75% Target Line</span>
              </div>
            </div>
          </div>

          {/* Compliance Distribution */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Status</h2>
            
            {/* Donut Chart Representation */}
            <div className="relative w-56 h-56 mx-auto mb-8">
              <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="40"
                />
                {/* Compliant segment - 82.8% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 80 * 0.828} ${2 * Math.PI * 80}`}
                  strokeDashoffset="0"
                />
                {/* At-Risk segment - 10.3% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 80 * 0.103} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`${-2 * Math.PI * 80 * 0.828}`}
                />
                {/* Non-Compliant segment - 6.9% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 80 * 0.069} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`${-2 * Math.PI * 80 * 0.931}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-gray-900">{complianceData.total}</p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="font-semibold text-gray-900">Compliant</span>
                </div>
                <span className="font-bold text-green-600">{complianceData.compliant}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="font-semibold text-gray-900">At-Risk</span>
                </div>
                <span className="font-bold text-yellow-600">{complianceData.atRisk}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="font-semibold text-gray-900">Non-Compliant</span>
                </div>
                <span className="font-bold text-red-600">{complianceData.nonCompliant}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Correlation & Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Attendance-Performance Correlation */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance vs Performance</h2>
            <p className="text-sm text-gray-600 mb-8">Correlation analysis across all students</p>

            <div className="space-y-4">
              {performanceCorrelation.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700 w-24">{item.range}</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold text-xs">
                        Grade {item.avgGrade}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">{item.count} students</span>
                  </div>
                  <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="chart-bar h-full rounded-lg flex items-center justify-end pr-4 text-white font-bold text-sm"
                      style={{
                        width: `${(item.count / 500) * 100}%`,
                        backgroundColor: item.color
                      }}
                    >
                      {item.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-purple-700">Insight:</span> Students with 90%+ attendance
                achieve an average grade of <span className="font-bold">A</span>, demonstrating a strong
                positive correlation between attendance and academic performance.
              </p>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Semester Trends</h2>
            <p className="text-sm text-gray-600 mb-8">Monthly attendance progression</p>

            <div className="space-y-6">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700 w-16">{month.month}</span>
                    <span className="font-bold text-purple-600">{month.attendance}%</span>
                  </div>
                  <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="chart-bar h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
                      style={{ width: `${(month.attendance / maxMonthly) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-2xl font-bold text-green-600">+3.7%</p>
                <p className="text-xs text-gray-600 mt-1">vs Last Semester</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-2xl font-bold text-blue-600">82.3%</p>
                <p className="text-xs text-gray-600 mt-1">Semester Average</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance Table */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Course Performance Breakdown</h2>
              <p className="text-sm text-gray-600">Attendance rates by course</p>
            </div>
            <button className="px-4 py-2 text-purple-600 font-semibold hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2">
              View Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Course</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-700">Students</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-700">Attendance</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-700">Performance</th>
                  <th className="text-right py-4 px-4 font-bold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {coursePerformance.map((course, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900">{course.course}</p>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">{course.students}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-full rounded-full"
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
                        <span className="font-bold text-gray-900">{course.attendance}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold text-sm">
                        {course.performance}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`px-3 py-1 rounded-lg font-semibold text-xs ${
                          course.attendance >= 85
                            ? 'bg-green-100 text-green-700'
                            : course.attendance >= 75
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {course.attendance >= 85 ? 'Excellent' : course.attendance >= 75 ? 'Good' : 'Needs Attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
