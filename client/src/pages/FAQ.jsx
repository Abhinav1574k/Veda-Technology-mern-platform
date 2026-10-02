import { useEffect, useState } from "react";

import SectionHeading from "../components/SectionHeading";
import FAQItem from "../components/FAQItem";
import api from "../services/api";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const response = await api.get("/faqs");
        setFaqs(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  return (
    <main>
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            FAQ
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Frequently asked questions.
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            title="Questions & answers"
            description="Find quick answers to common questions."
            centered
          />

          {loading ? (
            <p className="text-center text-slate-500">
              Loading FAQs...
            </p>
          ) : (
            <div className="rounded-2xl border border-slate-200 px-6">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq._id}
                  faq={faq}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default FAQ;