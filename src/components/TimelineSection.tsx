"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  { year: "2014", title: "First borehole field test deflects surface waves (France)", active: false },
  { year: "2018", title: "Forest resonance experiment validates seismic metamaterial theory", active: false },
  { year: "2023", title: "Topological waveguiding published in Science Advances", active: false },
  { year: "2025", title: "First full-scale metamaterial field test achieves -9.3dB attenuation", active: false },
  { year: "2027", title: "Strata pilot deployment", active: true },
];

export function TimelineSection() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // Animate line drawing
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        tl.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
        });
      }

      // Reveal nodes as line passes them
      // We estimate the timing based on stagger
      tl.from(nodesRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: "back.out(1.7)",
        duration: 0.5,
      }, 0);
    });
    
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (lineRef.current) {
        gsap.set(lineRef.current, { strokeDashoffset: 0 });
      }
      gsap.set(nodesRef.current?.children || [], { scale: 1, opacity: 1 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="science" ref={containerRef} className="bg-background py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-24 text-center">
          From Lab to Ground
        </h2>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:block relative h-64">
          <svg className="absolute top-1/2 -translate-y-1/2 w-full h-4 left-0" preserveAspectRatio="none">
            <path 
              ref={lineRef}
              d="M0,8 L1200,8" 
              stroke="#E8E5DF" 
              strokeWidth="2" 
              fill="none" 
            />
          </svg>

          <div ref={nodesRef} className="absolute inset-0 flex justify-between items-center px-4">
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center group w-48">
                {/* Node Text - alternating top/bottom */}
                <div className={`absolute ${index % 2 === 0 ? "bottom-12" : "top-12"} text-center`}>
                  <div className={`font-display text-2xl font-bold mb-2 ${item.active ? "text-accent" : "text-foreground"}`}>
                    {item.year}
                  </div>
                  <p className="text-sm text-foreground/70 font-medium leading-snug">
                    {item.title}
                  </p>
                </div>
                
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full border-4 z-10 transition-colors duration-300 ${
                  item.active ? "bg-accent border-accent shadow-[0_0_15px_rgba(232,168,56,0.5)]" : "bg-white border-border-gray group-hover:border-foreground"
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden relative ml-4 border-l-2 border-border-gray pl-8 space-y-12">
          {timelineData.map((item, index) => (
            <div key={index} className="relative">
              <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 z-10 ${
                item.active ? "bg-accent border-accent" : "bg-white border-border-gray"
              }`} />
              <div className={`font-display text-2xl font-bold mb-2 ${item.active ? "text-accent" : "text-foreground"}`}>
                {item.year}
              </div>
              <p className="text-base text-foreground/70 font-medium leading-snug">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
