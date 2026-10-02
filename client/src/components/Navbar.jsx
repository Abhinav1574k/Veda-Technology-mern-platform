import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Programs", path: "/programs" },
  { label: "Internship", path: "/internship" },
  { label: "FAQ", path: "/faq" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-slate-950"
        >
          VEDA<span className="text-emerald-600">.</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-emerald-600"
                    : "text-slate-600 hover:text-slate-950"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-800 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-2 rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Contact Veda Technology
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;