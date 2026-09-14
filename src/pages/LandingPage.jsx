import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-50 via-orange-50 to-white text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
              AI
            </div>
            <div>
              <p className="text-xs text-slate-400 tracking-widest uppercase">
                Interview Prep
              </p>
              <p className="text-sm font-semibold text-slate-900">
                Help you to grow
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/70 border border-slate-200 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="text-xs tracking-widest uppercase text-orange-500 font-semibold mb-3">
            Interview Prep
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
            Professional interview prep, focused on what’s live today.
          </h1>
          <p className="text-slate-600 max-w-2xl mb-6">
            Create a session with your role and experience, generate AI questions,
            and review everything in your dashboard. No extras, just the essentials.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Start Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white/70 transition"
            >
              Go to Login
            </button>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="bg-white/80 border border-orange-100 rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Create Session
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Role + experience → focused setup.
              </p>
            </div>
            <div className="bg-white/80 border border-orange-100 rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Generate Questions
              </p>
              <p className="text-xs text-slate-500 mt-1">
                AI builds a tailored list instantly.
              </p>
            </div>
            <div className="bg-white/80 border border-orange-100 rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Review Dashboard
              </p>
              <p className="text-xs text-slate-500 mt-1">
                All sessions stay organized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
