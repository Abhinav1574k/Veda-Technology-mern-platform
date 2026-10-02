import { ArrowRight } from "lucide-react";

function ProgramCard({ program }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
        {program.category}
      </p>

      <h3 className="mt-4 text-xl font-bold text-slate-950">
        {program.title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {program.description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:text-emerald-600">
        Explore program
        <ArrowRight size={17} />
      </div>
    </article>
  );
}

export default ProgramCard;