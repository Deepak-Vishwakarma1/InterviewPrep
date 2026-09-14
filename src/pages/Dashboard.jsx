import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
      setError("Unable to load sessions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createSession = async () => {
    if (!role || !experience) return alert("Fill all fields");

    try {
      setCreating(true);
      setError("");
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        questions: [],
      });
    } catch (error) {
      console.log(error.response);
      setError("Unable to create session. Please try again.");
    } finally {
      setCreating(false);
    }

    setRole("");
    setExperience("");
    fetchSessions();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-50 via-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              AI
            </div>
            <div>
              <p className="text-xs text-slate-400 tracking-widest uppercase">
                Interview Prep
              </p>
              <p className="text-sm font-semibold text-slate-900">
                Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/70 border border-slate-200 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/70 border border-slate-200 transition"
            >
              Back
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/70 border border-slate-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Header */}
        <div className="mb-10 flex flex-col gap-2">
          <p className="text-xs tracking-widest uppercase text-orange-500 font-semibold">
            Interview Prep
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Your Sessions Dashboard
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Create focused sessions and generate questions tailored to your role
            and experience level.
          </p>
        </div>

        {/* Create Session Card */}
        <div className="relative bg-white/90 backdrop-blur border border-orange-100 p-6 rounded-3xl shadow-sm mb-10 overflow-hidden">
          <div className="absolute -top-12 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-orange-200 to-amber-100 opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 opacity-50" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Create New Session
              </h2>
              <p className="text-sm text-slate-500">
                Add role and experience to generate the right difficulty.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              {sessions.length} total sessions
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.5fr_0.7fr_auto] gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-500">Role</label>
              <input
                placeholder="Frontend Developer"
                value={role}
                className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-500">Experience</label>
              <input
                placeholder="2 years"
                value={experience}
                className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <button
              onClick={createSession}
              disabled={creating}
              className="self-end bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "Create Session"}
            </button>
          </div>

          {error ? (
            <div className="mt-4 text-sm text-red-600">{error}</div>
          ) : null}
        </div>

        {/* Sessions */}
        {loading ? (
          <div className="text-slate-500">Loading sessions...</div>
        ) : sessions.length === 0 ? (
          <div className="text-center text-slate-500 mt-12">
            <p className="text-lg">No sessions yet</p>
            <p className="text-sm">Create your first session to get started</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <div
                key={s._id}
                onClick={() => navigate(`/interview/${s._id}`)}
                className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <h2 className="font-semibold text-lg text-slate-900">
                    {s.role}
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  {s.experience} experience
                </p>
                <div className="mt-4 text-xs text-slate-400 group-hover:text-orange-500 transition">
                  Open session
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
