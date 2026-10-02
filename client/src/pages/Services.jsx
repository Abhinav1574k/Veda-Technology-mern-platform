import { useEffect, useState } from "react";

import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import api from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <main>
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Services
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            IT & Digital Services
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Explore the technology and digital service areas represented
            by the platform.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What we offer"
            title="Explore the service areas."
          />

          {loading && (
            <p className="text-slate-500">
              Loading services...
            </p>
          )}

          {error && (
            <p className="rounded-xl bg-red-50 p-4 text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Services;