import { useState } from "react"

export default function AdminLogin() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert("Connect this to backend authentication")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">
            Attendance Management System
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" className="accent-blue-500" />
                Keep me signed in
              </label>
              <a href="#" className="text-blue-400 hover:text-amber-400">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transition relative"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs bg-emerald-400/10 border border-emerald-400/20 rounded-lg py-2">
              <span>Don't have an account </span>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Need help?{" "}
            <a href="#" className="text-blue-400 hover:text-amber-400 font-medium">
              Contact IT Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
