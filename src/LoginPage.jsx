import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, UserCircle, Lock, School } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useApi } from './context/ApiProvider';
import { HttpAuthThunk } from './store/auth/authThunks';
import Spinner from './loaders/Spinner';

const LoginPage = () => {
  
  const { api } = useApi()
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'student',
    school: ''
  });

  const [ errorMsg, setErrorMsg ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const schools = [
    'School of Computing and Informatics',
    'School of Education',
    'School of Medicine',
    'School of Business and Economics',
    'School of Engineering',
    'School of Agriculture'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(HttpAuthThunk({ 
        api, 
        username: formData.username, 
        password: formData.password,
        setIsLoading,
        setErrorMsg,
        navigate,
        role: formData.userType
      }))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Sora', sans-serif;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: translateY(-2px);
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.85);
        }
      `}</style>

      {/* Login Card */}
      <div className="relative w-full max-w-5xl flex rounded-3xl shadow-2xl overflow-hidden glass-effect border border-white/50">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <School className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Lectureye</h1>
                <p className="text-emerald-100 text-sm">Smart Attendance System</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Secure, Intelligent,<br />Offline-First
            </h2>
            <p className="text-emerald-50 text-lg leading-relaxed">
              Revolutionizing university attendance with AI-powered facial recognition,
              built for African educational institutions.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
              <div>
                <p className="text-white font-semibold">75% Compliance Tracking</p>
                <p className="text-emerald-100 text-sm">Automated monitoring and alerts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
              <div>
                <p className="text-white font-semibold">Anti-Spoofing Technology</p>
                <p className="text-emerald-100 text-sm">Live face detection prevents fraud</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
              <div>
                <p className="text-white font-semibold">Works Offline</p>
                <p className="text-emerald-100 text-sm">Reliable in low-connectivity areas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['student', 'lecturer', 'admin', 'superadmin'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: type })}
                    className={`py-3 px-4 rounded-xl font-medium text-sm capitalize transition-all duration-200 ${
                      formData.userType === type
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200 transform scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* School Selection (for admin/lecturer) */}
            {(formData.userType === 'admin') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  School/Department
                </label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all duration-200 input-focus appearance-none text-gray-700"
                    required
                  >
                    <option value="">Select your school</option>
                    {schools.map((school) => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Email Input */}
            { (formData.userType === 'admin' || formData.userType === 'student' || formData.userType === 'lecturer' || formData.userType === 'superadmin' ) && <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all duration-200 input-focus text-gray-700"
                  required
                />
              </div>
            </div>}

            { (formData.userType === 'admin'  || formData.userType === 'student' ||  formData.userType === 'lecturer' || formData.userType === 'superadmin')&& <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all duration-200 input-focus text-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>}

            {/* Remember Me & Forgot Password */}
            { (formData.userType === 'admin' || formData.userType === 'lecturer'|| formData.userType === 'supeadmin') && <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                Forgot password?
              </a>
            </div>}

            {/* Submit Button */}
            { (formData.userType === 'admin' || formData.userType === 'student' || formData.userType === 'lecturer'|| formData.userType === 'superadmin') && <button
              type="submit"
              disabled={isLoading}
              className="disabled:bg-green-600 w-full flex justify-center space-x-3 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-200 transform hover:-translate-y-0.5 transition-all duration-200"
            >
             { formData.userType !== "student" && <p>{isLoading? "Authenticating"  : "Sign In"}</p>}
             { formData.userType === "student" && <p>{isLoading? "Authenticating"  : "Log In To Scan Your Face"}</p>}
             { isLoading && <Spinner size={22}/>}
            </button>}

            { errorMsg && <p className='text-center text-base font-bold text-red-500 mt-3'>{errorMsg}</p>}
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Contact IT Support
              </a>
            </p>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mt-8 pt-8 border-t border-gray-200 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <School className="w-5 h-5" />
              <span className="font-bold">Lectureye</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Masinde Muliro University of Science and Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
