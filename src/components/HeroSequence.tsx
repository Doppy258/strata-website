"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<SVGGElement>(null);
  const earthGroupRef = useRef<SVGGElement>(null);
  const columnsGroupRef = useRef<SVGGElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // prefers-reduced-motion check
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgContainerRef.current,
          start: "top top",
          end: "+=400%", // 400vh scroll distance
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: Translate the whole SVG upward to reveal underground
      tl.to(earthGroupRef.current, {
        y: -1500, // adjust this based on SVG dimensions to bring underground into view
        ease: "none",
        duration: 3,
      });

      // Phase 2: Fade in columns and labels
      tl.from(columnsGroupRef.current?.children || [], {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 2,
        ease: "power2.out",
      }, "-=1")
      .to(labelsRef.current, {
        opacity: 1,
        duration: 1,
      }, "-=0.5");

      // Phase 3: Animate the seismic wave
      // Assume the wave path has a predefined length
      const waveLength = wavePathRef.current?.getTotalLength() || 2000;
      gsap.set(wavePathRef.current, { 
        strokeDasharray: waveLength, 
        strokeDashoffset: waveLength 
      });

      tl.to(wavePathRef.current, {
        strokeDashoffset: 0,
        duration: 4,
        ease: "power1.inOut",
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Just reveal everything statically for accessibility
      gsap.set(columnsGroupRef.current?.children || [], { opacity: 1 });
      gsap.set(labelsRef.current, { opacity: 1 });
      gsap.set(wavePathRef.current, { strokeDashoffset: 0 });
      gsap.set(earthGroupRef.current, { y: -1500 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* Hero Text Content (100vh) */}
      <section className="h-[100dvh] flex flex-col justify-center items-center text-center px-6 relative z-10 pt-20">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 max-w-4xl">
          Buildings That Don't <br className="hidden md:block" /> Feel Earthquakes
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 leading-relaxed">
          Metamaterial foundations that redirect seismic waves around structures. The first technology that doesn't fight earthquakes — it makes them disappear.
        </p>
        <Link 
          href="#xray" 
          className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-[0.98] hover:bg-accent/90"
        >
          See How It Works <span className="ml-2">↓</span>
        </Link>
      </section>

      {/* Pinned SVG Section */}
      <div id="xray" ref={svgContainerRef} className="h-[100dvh] w-full overflow-hidden bg-underground relative z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 1000 2000" 
            className="w-full max-w-5xl h-auto"
            preserveAspectRatio="xMidYMin slice"
          >
            <g ref={earthGroupRef}>
              {/* Sky / Surface Background */}
              <rect x="0" y="0" width="1000" height="500" fill="#FAFAF8" />
              
              {/* Ground Surface */}
              <path d="M0,500 Q250,490 500,500 T1000,500 L1000,2000 L0,2000 Z" fill="#1A1A2E" />
              
              {/* Subtle Topographic Lines */}
              <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.05" fill="none">
                <path d="M-100,700 Q300,600 1100,800" />
                <path d="M-100,900 Q400,950 1100,850" />
                <path d="M-100,1100 Q200,1200 1100,1150" />
                <path d="M-100,1300 Q500,1250 1100,1400" />
              </g>

              {/* The Building (Stays on Surface) */}
              <g ref={buildingRef} transform="translate(400, 300)">
                <rect x="0" y="0" width="200" height="200" fill="#E8E5DF" />
                {/* Windows */}
                <rect x="20" y="20" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                <rect x="80" y="20" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                <rect x="140" y="20" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                
                <rect x="20" y="80" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                <rect x="80" y="80" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                <rect x="140" y="80" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                
                <rect x="20" y="140" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                <rect x="80" y="140" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
                <rect x="140" y="140" width="40" height="40" fill="#1A1A2E" opacity="0.1" />
              </g>

              {/* Foundation Area */}
              <rect x="350" y="500" width="300" height="800" fill="#232338" rx="20" />

              {/* Metamaterial Columns (Concentric Rings) */}
              <g ref={columnsGroupRef}>
                {/* Left side columns */}
                <circle cx="200" cy="800" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="280" cy="800" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="200" cy="950" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="280" cy="950" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="200" cy="1100" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="280" cy="1100" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />

                {/* Right side columns */}
                <circle cx="720" cy="800" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="800" cy="800" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="720" cy="950" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="800" cy="950" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="720" cy="1100" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
                <circle cx="800" cy="1100" r="30" fill="#E8E5DF" stroke="#4A4A5E" strokeWidth="10" />
              </g>

              {/* Seismic Wave */}
              <path 
                ref={wavePathRef}
                d="M-200,950 Q0,850 150,950 C250,1050 300,1400 500,1400 C700,1400 750,1050 850,950 Q1000,850 1200,950" 
                fill="none" 
                stroke="#E8A838" 
                strokeWidth="12" 
                strokeLinecap="round"
                filter="drop-shadow(0 0 10px rgba(232,168,56,0.8))"
              />
              {/* Second wave path */}
              <path 
                d="M-200,950 Q0,1050 150,950 C250,850 300,500 500,500 C700,500 750,850 850,950 Q1000,1050 1200,950" 
                fill="none" 
                stroke="#E8A838" 
                strokeWidth="12" 
                strokeLinecap="round"
                strokeOpacity="0.4"
                filter="drop-shadow(0 0 10px rgba(232,168,56,0.4))"
              />
            </g>
          </svg>

          {/* HTML Labels overlaid on top of SVG for crisp text */}
          <div ref={labelsRef} className="absolute inset-0 pointer-events-none opacity-0">
            {/* Left Label */}
            <div className="absolute top-[40%] left-[10%] max-w-xs text-white">
              <div className="h-px w-24 bg-white/30 absolute top-3 -right-28" />
              <h3 className="font-display font-semibold text-xl mb-1">Rubber-Steel Resonator Columns</h3>
              <p className="text-white/60 text-sm">Periodic Array (2m spacing) with 3-5 Concentric Rings</p>
            </div>

            {/* Right Label */}
            <div className="absolute top-[50%] right-[10%] max-w-xs text-white text-right">
              <div className="h-px w-24 bg-white/30 absolute top-3 -left-28" />
              <h3 className="font-display font-semibold text-xl mb-1 text-accent">Protected Foundation Zone</h3>
              <p className="text-white/60 text-sm">Seismic waves redirected. Building feels nothing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
