"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function InfoSections() {
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Staggered reveal for cards
      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    });

    return () => mm.revert();
  }, { scope: cardsRef });

  return (
    <>
      {/* How It Works */}
      <section id="technology" className="bg-[#F5F3EF] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-20 text-center">
            Three Layers of Protection
          </h2>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="flex flex-col">
              <div className="h-48 bg-white rounded-2xl flex items-center justify-center mb-8 border border-border-gray shadow-sm overflow-hidden">
                {/* SVG Graphic for Bragg Scattering */}
                <svg viewBox="0 0 200 150" className="w-full h-full p-6">
                  <g stroke="#1A1A2E" strokeWidth="2" fill="none">
                    <line x1="20" y1="75" x2="60" y2="75" stroke="#E8A838" strokeWidth="4" />
                    <line x1="100" y1="20" x2="100" y2="130" strokeDasharray="4 4" />
                    <line x1="130" y1="20" x2="130" y2="130" strokeDasharray="4 4" />
                    <line x1="160" y1="20" x2="160" y2="130" strokeDasharray="4 4" />
                    
                    {/* Reflected waves */}
                    <path d="M90,50 Q70,75 90,100" stroke="#E8A838" strokeWidth="2" opacity="0.6" />
                    <path d="M80,40 Q50,75 80,110" stroke="#E8A838" strokeWidth="2" opacity="0.4" />
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-display text-foreground mb-4">Bragg Scattering</h3>
              <p className="text-foreground/70 leading-relaxed">
                Periodic column spacing creates frequency band gaps. Seismic waves at target frequencies physically cannot propagate — they reflect and scatter.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col">
              <div className="h-48 bg-white rounded-2xl flex items-center justify-center mb-8 border border-border-gray shadow-sm overflow-hidden">
                {/* SVG Graphic for Local Resonance */}
                <svg viewBox="0 0 200 150" className="w-full h-full p-6">
                  <g fill="none">
                    {/* Tuning fork shape */}
                    <path d="M90,110 L90,130 M70,50 L70,110 Q70,120 90,120 Q110,120 110,110 L110,50" stroke="#1A1A2E" strokeWidth="8" strokeLinecap="round" />
                    
                    {/* Ripples */}
                    <circle cx="70" cy="50" r="15" stroke="#E8A838" strokeWidth="2" opacity="0.8" />
                    <circle cx="70" cy="50" r="25" stroke="#E8A838" strokeWidth="2" opacity="0.4" />
                    <circle cx="110" cy="50" r="15" stroke="#E8A838" strokeWidth="2" opacity="0.8" />
                    <circle cx="110" cy="50" r="25" stroke="#E8A838" strokeWidth="2" opacity="0.4" />
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-display text-foreground mb-4">Local Resonance</h3>
              <p className="text-foreground/70 leading-relaxed">
                Each column vibrates at its tuned frequency, re-emitting energy 180° out of phase. The incoming wave meets its mirror image and cancels out.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col">
              <div className="h-48 bg-white rounded-2xl flex items-center justify-center mb-8 border border-border-gray shadow-sm overflow-hidden">
                {/* SVG Graphic for Wave Redirection */}
                <svg viewBox="0 0 200 150" className="w-full h-full p-6">
                  <g fill="none">
                    <circle cx="100" cy="75" r="30" fill="#1A1A2E" opacity="0.05" stroke="#1A1A2E" strokeWidth="2" />
                    
                    {/* Flowing arrows */}
                    <path d="M20,45 Q50,45 70,25 Q100,-5 130,25 Q150,45 180,45" stroke="#E8A838" strokeWidth="3" markerEnd="url(#arrow)" />
                    <path d="M20,105 Q50,105 70,125 Q100,155 130,125 Q150,105 180,105" stroke="#E8A838" strokeWidth="3" markerEnd="url(#arrow)" />
                    
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#E8A838" />
                      </marker>
                    </defs>
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-display text-foreground mb-4">Wave Redirection</h3>
              <p className="text-foreground/70 leading-relaxed">
                Remaining energy flows around the protected zone like water around a stone. The building sits in a pocket of stillness.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm font-medium text-foreground/50 tracking-wide">
              All materials are standard construction-grade rubber, steel, and concrete. No exotic chemistry.
            </p>
          </div>
        </div>
      </section>

      {/* The Paradigm Shift */}
      <section className="bg-[#1A1A2E] text-white py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-10">
            Every seismic technology in history tries to make buildings survive earthquakes. <br />
            <span className="text-accent">We make earthquakes disappear.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto font-medium">
            Base isolators absorb. Dampers resist. Reinforced concrete endures. <span className="text-white">Strata redirects.</span> The building doesn't need to be stronger because the force never arrives.
          </p>
        </div>
      </section>
    </>
  );
}
