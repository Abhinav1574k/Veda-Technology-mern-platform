import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Layers3,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import ProgramCard from "../components/ProgramCard";
import FAQItem from "../components/FAQItem";

import { company, services, programs, faqs } from "../data/siteData";

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
              {company.tagline}
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Technology that
              <span className="block text-emerald-400">
                moves forward.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              {company.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="rounded-full border border-slate-700 px-6 py-3.5 font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-400"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Technology, learning and digital services."
            description="Explore the major areas presented through the Veda Technology platform."
          />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-7">
              <Code2 className="text-emerald-600" size={30} />
              <h3 className="mt-5 text-xl font-bold">Digital Services</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Explore technology and digital service offerings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-7">
              <GraduationCap className="text-emerald-600" size={30} />
              <h3 className="mt-5 text-xl font-bold">Learning Programs</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Discover technology-focused learning and training areas.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-7">
              <Layers3 className="text-emerald-600" size={30} />
              <h3 className="mt-5 text-xl font-bold">Practical Development</h3>
              <p className="mt-3 leading-7 text-slate-600">
                A platform designed around practical technology experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Technology and digital services."
            description="A structured view of the services presented by the platform."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-semibold text-emerald-700"
            >
              View all services
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Programs"
            title="Build technology skills through practical learning."
            description="Explore the technology program structure presented by the platform."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Internship */}
      <section className="bg-emerald-600 py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Internship & Training
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Learn by building.
            </h2>

            <p className="mt-5 leading-8 text-emerald-50">
              Explore the internship and training information available
              through the platform.
            </p>
          </div>

          <Link
            to="/internship"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Explore Internship
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions."
            description="Quick answers to common questions about the platform."
            centered
          />

          <div className="rounded-2xl border border-slate-200 px-6">
            {faqs.slice(0, 4).map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Start a conversation
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Have a question?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
            Reach out through the contact section to learn more.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-3.5 font-semibold text-white transition hover:bg-emerald-600"
          >
            Contact Veda Technology
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;