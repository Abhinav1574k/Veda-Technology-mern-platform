function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <div
      className={`mb-12 max-w-3xl ${
        centered ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;