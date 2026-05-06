"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StatsStrip() {
  const containerRef = useRef<HTMLElement>(null);
  const val1Ref = useRef<HTMLSpanElement>(null);
  const val2StartRef = useRef<HTMLSpanElement>(null);
  const val2EndRef = useRef<HTMLSpanElement>(null);
  const val3StartRef = useRef<HTMLSpanElement>(null);
  const val3EndRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.from(".evidence-card", {
          y: 28,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        })
          .to(val1Ref.current, { innerHTML: -9.3, duration: 2, ease: "power2.out", snap: { innerHTML: 0.1 } }, "-=0.6")
          .to(val2StartRef.current, { innerHTML: 7, duration: 1.5, ease: "power2.out", snap: { innerHTML: 1 } }, "-=2")
          .to(val2EndRef.current, { innerHTML: 5.5, duration: 1.5, ease: "power2.out", snap: { innerHTML: 0.1 } }, "-=2")
          .to(val3StartRef.current, { innerHTML: 2.6, duration: 2, ease: "power2.out", snap: { innerHTML: 0.1 } }, "-=2")
          .to(val3EndRef.current, { innerHTML: 7.8, duration: 2, ease: "power2.out", snap: { innerHTML: 0.1 } }, "-=2");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (val1Ref.current) val1Ref.current.innerHTML = "-9.3";
        if (val2StartRef.current) val2StartRef.current.innerHTML = "7";
        if (val2EndRef.current) val2EndRef.current.innerHTML = "5.5";
        if (val3StartRef.current) val3StartRef.current.innerHTML = "2.6";
        if (val3EndRef.current) val3EndRef.current.innerHTML = "7.8";
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section id="science" ref={containerRef} className="relative bg-[#060605] px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-body text-sm text-white/65">{"// Validated science"}</p>
            <h2 className="max-w-2xl font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-7xl">
              Not stronger buildings. Calmer ground.
            </h2>
          </div>
          <p className="max-w-md font-body text-sm font-light leading-snug text-white/70 md:text-right">
            The physics comes from periodic structures and local resonance, translated into civil
            materials that can be placed below grade.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="evidence-card liquid-glass rounded-[1.5rem] p-6">
            <div className="font-heading text-5xl italic leading-none tracking-[-1px] text-[#E8A838] md:text-6xl">
              <span ref={val1Ref}>0.0</span> dB
            </div>
            <h3 className="mt-8 font-body text-base font-semibold text-white">Seismic wave attenuation</h3>
            <p className="mt-2 font-body text-sm font-light leading-snug text-white/62">
              Reported in a full-scale field test of buried metamaterial elements.
            </p>
          </article>

          <article className="evidence-card liquid-glass rounded-[1.5rem] p-6">
            <div className="font-heading text-5xl italic leading-none tracking-[-1px] text-[#E8A838] md:text-6xl">
              M<span ref={val2StartRef}>0</span> to M<span ref={val2EndRef}>0.0</span>
            </div>
            <h3 className="mt-8 font-body text-base font-semibold text-white">Motion reduction target</h3>
            <p className="mt-2 font-body text-sm font-light leading-snug text-white/62">
              A design objective for reducing what a protected structure actually feels.
            </p>
          </article>

          <article className="evidence-card liquid-glass rounded-[1.5rem] p-6">
            <div className="font-heading text-5xl italic leading-none tracking-[-1px] text-[#E8A838] md:text-6xl">
              <span ref={val3StartRef}>0.0</span>-<span ref={val3EndRef}>0.0</span> Hz
            </div>
            <h3 className="mt-8 font-body text-base font-semibold text-white">Band gap coverage</h3>
            <p className="mt-2 font-body text-sm font-light leading-snug text-white/62">
              Tuned to the range where destructive earthquake energy concentrates.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
