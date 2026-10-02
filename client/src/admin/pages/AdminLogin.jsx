import { useEffect, useState } from "react";
import { LockKeyhole, LogIn, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function AdminLogin() {
  const { user, login } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard", {
        replace: true,
      });
    }
  }, [user, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(
        form.email,
        form.password
      );

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center text-white">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950">
            <ShieldCheck size={28} />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Veda Admin
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to manage the platform.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-7 shadow-2xl"
        >
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </span>

            <input
              required
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </span>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                required
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500"
              />
            </div>
          </label>

          <button
            disabled={loading}
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}

            <LogIn size={18} />
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Authorized administrators only.
        </p>
      </div>
    </main>
  );
}

export default AdminLogin;