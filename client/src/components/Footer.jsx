import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold">
              VEDA<span className="text-emerald-400">.</span>
            </h3>

            <p className="mt-4 max-w-md leading-7 text-slate-400">
              Technology, learning and digital solutions presented
              through a modern business platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Explore</h4>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/about" className="hover:text-white">
                About
              </Link>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
              <Link to="/programs" className="hover:text-white">
                Programs
              </Link>
              <Link to="/internship" className="hover:text-white">
                Internship
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Support</h4>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Veda Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;