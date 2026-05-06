"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  { year: "2014", title: "First borehole field test deflects surface waves" },
  { year: "2018", title: "Forest resonance experiment validates natural seismic metamaterials" },
  { year: "2023", title: "Topological waveguiding work expands redirection models" },
  { year: "2025", title: "Full-scale tests report measurable attenuation" },
  { year: "2027", title: "Strata pilot deployment", active: true },
];

export function TimelineSection() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
            end: "bottom 80%",
            scrub: 1,
          },
        });

        if (lineRef.current) {
          const length = lineRef.current.getTotalLength();
          gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(lineRef.current, { strokeDashoffset: 0, ease: "none" });
        }

        tl.from(
          nodesRef.current?.children || [],
          { scale: 0.8, opacity: 0, y: 16, stagger: 0.18, ease: "power2.out", duration: 0.5 },
          0
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (lineRef.current) gsap.set(lineRef.current, { strokeDashoffset: 0 });
        gsap.set(nodesRef.current?.children || [], { scale: 1, opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section id="pilot" ref={containerRef} className="overflow-hidden bg-[#060605] px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 max-w-3xl">
          <p className="mb-5 font-body text-sm text-white/65">{"// From lab to ground"}</p>
          <h2 className="font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-7xl">
            A research lineage ready for a real site.
          </h2>
        </div>

        <div className="hidden md:block relative h-72">
          <svg className="absolute left-0 top-1/2 h-4 w-full -translate-y-1/2" preserveAspectRatio="none">
            <path ref={lineRef} d="M0,8 L1200,8" stroke="#E8A838" strokeWidth="2" fill="none" />
          </svg>

          <div ref={nodesRef} className="absolute inset-0 flex items-center justify-between px-4">
            {timelineData.map((item, index) => (
              <div key={item.year} className="group relative flex w-48 flex-col items-center">
                <div className={`absolute ${index % 2 === 0 ? "bottom-12" : "top-12"} text-center`}>
                  <div className={`font-heading text-3xl italic leading-none ${item.active ? "text-[#E8A838]" : "text-white"}`}>
                    {item.year}
                  </div>
                  <p className="mt-3 font-body text-sm font-light leading-snug text-white/68">{item.title}</p>
                </div>
                <div className={`relative z-10 h-4 w-4 rounded-full border ${item.active ? "border-[#E8A838] bg-[#E8A838]" : "border-white/50 bg-white/20"}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 border-l border-white/15 pl-7 md:hidden">
          {timelineData.map((item) => (
            <div key={item.year} className="relative pb-7">
              <div className={`absolute -left-[35px] top-1 h-4 w-4 rounded-full border ${item.active ? "border-[#E8A838] bg-[#E8A838]" : "border-white/50 bg-[#060605]"}`} />
              <div className={`font-heading text-3xl italic leading-none ${item.active ? "text-[#E8A838]" : "text-white"}`}>
                {item.year}
              </div>
              <p className="mt-3 font-body text-sm font-light leading-snug text-white/68">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
