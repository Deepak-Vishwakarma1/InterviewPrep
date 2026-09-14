
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [notice, setNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      setNotice({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      setIsSubmitting(true);
      setNotice(null);
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      setNotice({
        type: "success",
        text: "Signup successful! Redirecting to login...",
      });
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      console.log(error.response);
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      setNotice({ type: "error", text: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-50 via-amber-50 to-white px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur border border-orange-100 p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
            AI
          </div>
          <div>
            <p className="text-xs text-slate-400 tracking-widest uppercase">
              Interview Prep
            </p>
            <p className="text-sm font-semibold text-slate-900">Sign Up</p>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
          Create your account
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          Start your AI-powered interview preparation
        </p>

        {notice && (
          <div
            className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
              notice.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {notice.text}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border border-slate-200 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-slate-200 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Create a password"
          className="w-full border border-slate-200 rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          disabled={isSubmitting}
          className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition duration-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="flex items-center my-5">
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <p className="px-3 text-slate-400 text-xs uppercase tracking-widest">
            Or
          </p>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
