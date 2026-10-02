import { useEffect, useState } from "react";

import SectionHeading from "../components/SectionHeading";
import ProgramCard from "../components/ProgramCard";
import api from "../services/api";

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const response = await api.get("/programs");
        setPrograms(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load programs.");
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  return (
    <main>
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Technology Programs
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Learn. Build. Grow.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Explore technology-focused programs and learning areas.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Programs"
            title="Technology learning paths."
          />

          {loading && (
            <p className="text-slate-500">
              Loading programs...
            </p>
          )}

          {error && (
            <p className="rounded-xl bg-red-50 p-4 text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <ProgramCard
                  key={program._id}
                  program={program}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Programs;