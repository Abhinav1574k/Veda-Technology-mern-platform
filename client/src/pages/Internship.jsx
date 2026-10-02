import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function Internship() {
  const points = [
    "Practical technology learning",
    "Hands-on development experience",
    "Structured project work",
    "Exposure to modern development practices",
  ];

  return (
    <main>
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Internship & Training
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Turn learning into practical experience.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Explore internship and training opportunities presented
            through the platform.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Training approach
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Learn through practical development.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              The internship and training section is designed to
              communicate available learning opportunities and their
              practical development focus.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-8">
            <div className="space-y-5">
              {points.map((point) => (
                <div key={point} className="flex gap-3">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-600"
                    size={20}
                  />

                  <span className="text-slate-700">{point}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 font-semibold text-white hover:bg-emerald-600"
            >
              Ask about opportunities
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Internship;