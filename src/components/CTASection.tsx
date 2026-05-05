export function CTASection() {
  return (
    <section id="contact" className="bg-[#1A1A2E] text-white py-32 px-6 border-b border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-8">
          What if we stopped building stronger and started building smarter?
        </h2>
        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Strata is developing the world's first commercial seismic metamaterial foundation. We're looking for partners, advisors, and believers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-lg border border-white/20 hover:bg-white/5 transition-colors duration-300">
            Read the Research
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-lg bg-accent text-white hover:bg-accent/90 hover:scale-[0.98] transition-all duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
