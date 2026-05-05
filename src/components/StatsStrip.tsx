"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function StatsStrip() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Refs for numbers we will animate
  const val1Ref = useRef<HTMLSpanElement>(null);
  const val2StartRef = useRef<HTMLSpanElement>(null);
  const val2EndRef = useRef<HTMLSpanElement>(null);
  const val3StartRef = useRef<HTMLSpanElement>(null);
  const val3EndRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Create a timeline that triggers when stats enter viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Simple fade up for the container
      tl.from(containerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate numbers
      tl.to(val1Ref.current, {
        innerHTML: -9.3,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 0.1 },
      }, "-=0.4");
      
      tl.to(val2StartRef.current, {
        innerHTML: 7,
        duration: 1.5,
        ease: "power2.out",
        snap: { innerHTML: 1 },
      }, "-=2");
      
      tl.to(val2EndRef.current, {
        innerHTML: 5.5,
        duration: 1.5,
        ease: "power2.out",
        snap: { innerHTML: 0.1 },
      }, "-=2");

      tl.to(val3StartRef.current, {
        innerHTML: 2.6,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 0.1 },
      }, "-=2");

      tl.to(val3EndRef.current, {
        innerHTML: 7.8,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 0.1 },
      }, "-=2");
    });
    
    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Make sure final values are set directly
      if (val1Ref.current) val1Ref.current.innerHTML = "-9.3";
      if (val2StartRef.current) val2StartRef.current.innerHTML = "7";
      if (val2EndRef.current) val2EndRef.current.innerHTML = "5.5";
      if (val3StartRef.current) val3StartRef.current.innerHTML = "2.6";
      if (val3EndRef.current) val3EndRef.current.innerHTML = "7.8";
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-background py-24 px-6 border-b border-border-gray relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-16 text-center">
          Validated Science
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="font-mono text-5xl md:text-6xl font-medium text-accent mb-4 tracking-tighter">
              <span ref={val1Ref}>0.0</span> <span className="text-3xl">dB</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Seismic wave attenuation</h3>
            <p className="text-sm text-foreground/60">First full-scale field test, 2025</p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center relative">
            <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-px h-24 bg-border-gray" />
            <div className="font-mono text-5xl md:text-6xl font-medium text-accent mb-4 tracking-tighter">
              M<span ref={val2StartRef}>0</span> → M<span ref={val2EndRef}>0.0</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Magnitude reduction</h3>
            <p className="text-sm text-foreground/60">MIT Lincoln Lab simulations</p>
            <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-px h-24 bg-border-gray" />
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="font-mono text-5xl md:text-6xl font-medium text-accent mb-4 tracking-tighter">
              <span ref={val3StartRef}>0.0</span>–<span ref={val3EndRef}>0.0</span> <span className="text-3xl">Hz</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Band gap coverage</h3>
            <p className="text-sm text-foreground/60">Matches destructive earthquake frequencies</p>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="italic text-foreground/70 text-lg">
            "The physics of periodic structures has been proven for 50+ years in semiconductor design. We're applying it to the ground beneath your feet."
          </p>
        </div>
      </div>
    </section>
  );
}
