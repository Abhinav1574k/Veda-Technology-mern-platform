import { ArrowUpRight } from "lucide-react";

function ServiceCard({ service }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          {service.category}
        </span>

        <ArrowUpRight
          size={20}
          className="text-slate-300 transition group-hover:text-emerald-600"
        />
      </div>

      <h3 className="mt-7 text-xl font-bold text-slate-950">
        {service.title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {service.description}
      </p>
    </article>
  );
}

export default ServiceCard;