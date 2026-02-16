import { useState } from "react";

export default function CreateAccount() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [strength, setStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    if (name === "password") checkStrength(value);
  };

  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    setStrength(score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Signup data:", form);
      setLoading(false);
      alert("Account created successfully!");
    }, 2000);
  };

  const strengthColor =
    strength <= 2
      ? "bg-red-500 w-1/3"
      : strength === 3
      ? "bg-amber-400 w-2/3"
      : "bg-emerald-500 w-full";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-xl">AMS</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2">
            Join the Attendance Management System
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/70 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First name"
                className="input"
                onChange={handleChange}
                required
              />
              <input
                name="lastName"
                placeholder="Last name"
                className="input"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className={`input ${emailError && "border-red-500"}`}
                onChange={handleChange}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Role */}
            <select
              name="role"
              className="input"
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="admin">Administrator</option>
              <option value="teacher">Teacher</option>
              <option value="staff">Staff</option>
              <option value="coordinator">Coordinator</option>
            </select>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                onChange={handleChange}
                required
              />
              {form.password && (
                <div className="h-1 bg-slate-700 rounded mt-2 overflow-hidden">
                  <div className={`h-full transition-all ${strengthColor}`} />
                </div>
              )}
              <p className="text-xs text-slate-400 mt-1">
                Use 8+ characters with letters, numbers & symbols
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={`input ${passwordError && "border-red-500"}`}
                onChange={handleChange}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                name="terms"
                onChange={handleChange}
                required
              />
              I agree to the Terms & Privacy Policy
            </label>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {/* Login */}
            <p className="text-center text-slate-400 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
