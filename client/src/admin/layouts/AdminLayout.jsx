import {
  BarChart3,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Programs",
    path: "/admin/programs",
    icon: GraduationCap,
  },
  {
    label: "FAQs",
    path: "/admin/faqs",
    icon: FileQuestion,
  },
  {
    label: "Inquiries",
    path: "/admin/inquiries",
    icon: MessageSquare,
  },
];

function AdminLayout() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-slate-950 text-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-800 px-6 py-6">
            <p className="text-xl font-bold">
              VEDA<span className="text-emerald-400">.</span>
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
              Admin Panel
            </p>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-500 text-slate-950"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />

                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-slate-800 p-4">
            <div className="mb-4 px-2">
              <p className="truncate text-sm font-semibold">
                {user?.name}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Veda Technology
              </p>

              <h1 className="mt-1 text-lg font-bold text-slate-950">
                Administration
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold text-emerald-700">
                Admin
              </span>
            </div>
          </div>
        </header>

        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;