import SectionHeading from "../components/SectionHeading";

function About() {
  return (
    <main>
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            About
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Technology and digital experiences.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Learn more about Veda Technology and the areas represented
            through this business platform.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Company"
            title="Built around technology and practical learning."
          />

          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              This section provides a structured introduction to the
              organization, its technology focus and its business
              activities.
            </p>

            <p>
              Company-specific information will be populated from
              verified public Veda Technology sources as the platform
              moves toward production.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;