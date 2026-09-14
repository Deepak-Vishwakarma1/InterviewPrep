import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email and password");
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
            <p className="text-sm font-semibold text-slate-900">Login</p>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
          Welcome back
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          Login to continue your interview preparation
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-slate-200 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          name="email"
          value={form.email}
          onChange={handleForm}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border border-slate-200 rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          name="password"
          value={form.password}
          onChange={handleForm}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition duration-200"
        >
          Login
        </button>

        <div className="flex items-center my-5">
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <p className="px-3 text-slate-400 text-xs uppercase tracking-widest">
            Or
          </p>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
