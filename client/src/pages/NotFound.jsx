import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-5 text-center text-white">
      <div>
        <p className="text-emerald-400">404</p>

        <h1 className="mt-3 text-5xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 text-slate-400">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-7 inline-block rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;  