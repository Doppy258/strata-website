export function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#060605] px-6 py-32 text-white">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8A838]/10 blur-3xl" />
      <div className="liquid-glass-strong relative mx-auto max-w-5xl rounded-[2rem] px-6 py-14 text-center md:px-14 md:py-20">
        <p className="mb-6 font-body text-sm text-white/65">{"// Pilot inquiries"}</p>
        <h2 className="mx-auto max-w-4xl font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-7xl">
          Stop designing buildings to endure force. Remove the force.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl font-body text-base font-light leading-snug text-white/68 md:text-lg">
          Strata is preparing pilot partnerships with owners, engineers, and public agencies building
          in seismic zones.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <button className="liquid-glass w-full rounded-full px-8 py-4 font-body text-base font-medium text-white transition-transform active:scale-[0.98] sm:w-auto">
            Read the Research
          </button>
          <button className="w-full rounded-full bg-[#E8A838] px-8 py-4 font-body text-base font-semibold text-[#060605] transition-transform active:scale-[0.98] sm:w-auto">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
