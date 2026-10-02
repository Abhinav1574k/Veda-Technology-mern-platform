import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-950">
          {faq.question}
        </span>

        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180 text-emerald-600" : "text-slate-400"
          }`}
        />
      </button>

      {open && (
        <div className="pb-6 pr-8 leading-7 text-slate-600">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default FAQItem;