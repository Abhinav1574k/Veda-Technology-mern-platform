import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import api from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      loading: true,
      success: "",
      error: "",
    });

    try {
      await api.post("/inquiries", form);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setStatus({
        loading: false,
        success: "Your inquiry has been submitted successfully.",
        error: "",
      });
    } catch (error) {
      console.error(error);

      setStatus({
        loading: false,
        success: "",
        error:
          error.response?.data?.message ||
          "Unable to submit your inquiry.",
      });
    }
  };

  return (
    <main>
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Contact
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Let's start a conversation.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Have a question about services, programs or opportunities?
            Get in touch.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Get in touch"
              title="We're listening."
              description="Send an inquiry using the form."
            />

            <div className="space-y-5">
              <div className="flex gap-4">
                <Mail className="text-emerald-600" />

                <div>
                  <p className="font-semibold text-slate-950">
                    Email
                  </p>

                  <p className="text-sm text-slate-600">
                    Contact information will be connected after
                    verification.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="text-emerald-600" />

                <div>
                  <p className="font-semibold text-slate-950">
                    Phone
                  </p>

                  <p className="text-sm text-slate-600">
                    Contact information will be connected after
                    verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-3"
          >
            {status.success && (
              <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                {status.success}
              </div>
            )}

            {status.error && (
              <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                {status.error}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </span>

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                  placeholder="Your name"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </span>

                <input
                  required
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Subject
              </span>

              <input
                required
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                placeholder="How can we help?"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Message
              </span>

              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                placeholder="Write your message..."
              />
            </label>

            <button
              disabled={status.loading}
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.loading ? "Sending..." : "Send Inquiry"}
              <Send size={17} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;