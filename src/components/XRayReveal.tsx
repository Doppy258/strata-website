"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const columns = [
  { cx: 560, cy: 790, r: 34 },
  { cx: 470, cy: 940, r: 30 },
  { cx: 560, cy: 1090, r: 34 },
  { cx: 1040, cy: 790, r: 34 },
  { cx: 1130, cy: 940, r: 30 },
  { cx: 1040, cy: 1090, r: 34 },
  { cx: 360, cy: 730, r: 28 },
  { cx: 300, cy: 900, r: 26 },
  { cx: 310, cy: 1070, r: 26 },
  { cx: 380, cy: 1230, r: 28 },
  { cx: 1240, cy: 730, r: 28 },
  { cx: 1300, cy: 900, r: 26 },
  { cx: 1290, cy: 1070, r: 26 },
  { cx: 1220, cy: 1230, r: 28 },
  { cx: 170, cy: 820, r: 24 },
  { cx: 130, cy: 1000, r: 23 },
  { cx: 170, cy: 1180, r: 24 },
  { cx: 1430, cy: 820, r: 24 },
  { cx: 1470, cy: 1000, r: 23 },
  { cx: 1430, cy: 1180, r: 24 },
];

function BuildingSilhouette() {
  const towerBays = [-38, -10, 18];
  const towerFloors = [-344, -310, -276, -242, -208, -174];
  const wingFloors = [-120, -88];
  const leftWingBays = [-112, -88];
  const rightWingBays = [84, 108];
  const podiumBays = [-132, -98, -64, -30, 4, 38, 72, 106];

  return (
    <g>
      <defs>
        <linearGradient id="buildingFacade" x1="-112" y1="-430" x2="132" y2="-6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff8ea" />
          <stop offset="48%" stopColor="#f1eadc" />
          <stop offset="100%" stopColor="#d8d0c0" />
        </linearGradient>
        <linearGradient id="buildingGlass" x1="-120" y1="-380" x2="112" y2="-20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34415d" stopOpacity="0.58" />
          <stop offset="100%" stopColor="#0f1220" stopOpacity="0.86" />
        </linearGradient>
      </defs>

      <path d="M-166 0V-70H-144V-108H-120V-142H-76V-374H-56V-418H58V-374H78V-142H120V-108H144V-70H166V0Z" fill="url(#buildingFacade)" />
      <path d="M-166 0V-70H-144V-108H-120V-142H-76V-374H-56V-418H58V-374H78V-142H120V-108H144V-70H166V0Z" fill="none" stroke="#10101c" strokeWidth="4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

      <path d="M58-374H78V-142H58Z" fill="#11111f" opacity="0.09" />
      <path d="M120-108H144V-70H120Z" fill="#11111f" opacity="0.12" />
      <path d="M-76-374H-56V-142H-76Z" fill="#ffffff" opacity="0.12" />
      <path d="M-56-418H58L70-392H-68Z" fill="#f6f1e6" />
      <path d="M-56-418H58L70-392H-68Z" fill="none" stroke="#10101c" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path d="M-76-374H78" stroke="#10101c" strokeWidth="3" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
      <path d="M-126-142H126" stroke="#10101c" strokeWidth="3" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
      <path d="M-148-70H166" stroke="#10101c" strokeWidth="3" strokeLinecap="square" vectorEffect="non-scaling-stroke" />

      <g fill="url(#buildingGlass)" stroke="#10101c" strokeOpacity="0.5" strokeWidth="1.15" vectorEffect="non-scaling-stroke">
        {towerFloors.flatMap((y) =>
          towerBays.map((x) => <rect key={`tower-${x}-${y}`} x={x} y={y} width="20" height="18" rx="1.8" />)
        )}
        {wingFloors.flatMap((y) =>
          [...leftWingBays, ...rightWingBays].map((x) => <rect key={`wing-${x}-${y}`} x={x} y={y} width="20" height="18" rx="1.8" />)
        )}
      </g>
      <g stroke="#10101c" strokeWidth="1.3" strokeOpacity="0.48" vectorEffect="non-scaling-stroke">
        {[-52, -24, 4, 32, 60].map((x) => (
          <path key={x} d={`M${x} -360V-150`} />
        ))}
        {[-326, -292, -258, -224, -190, -156].map((y) => (
          <path key={y} d={`M-54 ${y}H62`} />
        ))}
      </g>

      <g fill="#151526" opacity="0.88">
        {podiumBays.map((x) => (
          <rect key={x} x={x} y="-96" width="24" height="26" rx="2" />
        ))}
      </g>
      <g stroke="#f6f1e6" strokeOpacity="0.26" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {podiumBays.map((x) => (
          <path key={x} d={`M${x + 12} -96V-70`} />
        ))}
      </g>

      <rect x="-58" y="-58" width="116" height="58" fill="#10101c" opacity="0.9" />
      <path d="M-58 0V-58H58V0" fill="none" stroke="#f6f1e6" strokeOpacity="0.22" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <path d="M0-58V0M-58-28H58" stroke="#f6f1e6" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M-170 0H170" stroke="#10101c" strokeWidth="6" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

function ResonatorColumn({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <circle r={r} fill="#090909" />
      <circle r={r * 0.78} fill="none" stroke="#2f2f35" strokeWidth={r * 0.18} />
      <circle r={r * 0.48} fill="#a6a49d" />
      <circle r={r * 0.28} fill="#ded8ca" />
      <circle r={r} fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.28" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

export function XRayReveal() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SVGGElement>(null);
  const columnsGroupRef = useRef<SVGGElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const insightLabelRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const wave2PathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        [wavePathRef.current, wave2PathRef.current].forEach((path) => {
          if (!path) return;
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
        });

        gsap.set(columnsGroupRef.current?.children || [], {
          opacity: 0,
          scale: 0.55,
          transformOrigin: "center center",
        });
        gsap.set(labelsRef.current?.children || [], { opacity: 0, y: 14 });
        gsap.set(insightLabelRef.current, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top top",
            end: "+=350%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(sceneRef.current, { y: -255, ease: "none", duration: 2 }, 0)
          .to(
            columnsGroupRef.current?.children || [],
            {
              opacity: 1,
              scale: 1,
              stagger: { each: 0.035, from: "center" },
              duration: 1,
              ease: "back.out(1.35)",
            },
            1.65
          )
          .to(
            labelsRef.current?.children || [],
            { opacity: 1, y: 0, stagger: 0.11, duration: 0.65, ease: "power2.out" },
            2.05
          )
          .to(wavePathRef.current, { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" }, 3.05)
          .to(wave2PathRef.current, { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" }, 3.25)
          .to(insightLabelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 5.4);
      });

      mm.add("(prefers-reduced-motion: reduce), (max-width: 767px)", () => {
        gsap.set(sceneRef.current, { y: -255 });
        gsap.set(columnsGroupRef.current?.children || [], { opacity: 1, scale: 1 });
        gsap.set(labelsRef.current?.children || [], { opacity: 1, y: 0 });
        gsap.set(insightLabelRef.current, { opacity: 1, y: 0 });
        gsap.set([wavePathRef.current, wave2PathRef.current], {
          strokeDasharray: "none",
          strokeDashoffset: 0,
        });
      });

      return () => mm.revert();
    },
    { scope: pinSectionRef }
  );

  return (
    <section id="xray" ref={pinSectionRef} className="relative isolate h-[100dvh] overflow-hidden bg-[#060605] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[#060605]">
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(232, 168, 56, 0.14) 0%, rgba(232, 168, 56, 0.05) 22%, transparent 46%), radial-gradient(circle at 50% 18%, rgba(190, 211, 255, 0.13) 0%, transparent 36%), linear-gradient(180deg, #101827 0%, #0a101a 34%, #070706 66%, #060605 100%)",
          }}
        />
        <div className="absolute left-1/2 top-[46%] h-32 w-[86vw] -translate-x-1/2 rounded-full bg-[#E8A838]/[0.08] blur-3xl" />
        <div className="absolute inset-x-[8%] top-[49%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="absolute left-6 top-24 z-20 max-w-sm md:left-16">
        <p className="mb-5 font-body text-sm text-white/75">{"// Protection sequence"}</p>
        <h2 className="font-heading text-5xl italic leading-[0.86] tracking-[-2px] text-white md:text-7xl">
          The ground becomes the shield.
        </h2>
      </div>

      <svg className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="xraySoil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f2f20" stopOpacity="0.92" />
            <stop offset="44%" stopColor="#221812" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#0c0907" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="xraySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#142039" stopOpacity="0.58" />
            <stop offset="42%" stopColor="#101722" stopOpacity="0.34" />
            <stop offset="74%" stopColor="#0a0b0a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#060605" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="xrayHorizonGlow" cx="50%" cy="100%" r="72%">
            <stop offset="0%" stopColor="#f6f1e6" stopOpacity="0.18" />
            <stop offset="26%" stopColor="#E8A838" stopOpacity="0.13" />
            <stop offset="68%" stopColor="#E8A838" stopOpacity="0.035" />
            <stop offset="100%" stopColor="#060605" stopOpacity="0" />
          </radialGradient>
          <filter id="xrayWaveGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g ref={sceneRef}>
          <g>
            <rect x="0" y="0" width="1600" height="500" fill="url(#xraySky)" />
            <ellipse cx="800" cy="496" rx="900" ry="180" fill="url(#xrayHorizonGlow)" />
            <path d="M0 494Q400 482 800 494T1600 494" stroke="#f6f1e6" strokeWidth="1.4" strokeOpacity="0.16" fill="none" />
            <path d="M120 300Q520 258 880 308T1480 284" stroke="#dfe7ff" strokeWidth="1" strokeOpacity="0.055" fill="none" />
          </g>
          <path d="M0 500Q400 490 800 500T1600 500L1600 1900H0Z" fill="url(#xraySoil)" />
          <path d="M0 500Q400 490 800 500T1600 500" stroke="#f6f1e6" strokeWidth="2" strokeOpacity="0.28" fill="none" />

          <g stroke="#f6f1e6" strokeWidth="1" strokeOpacity="0.045" fill="none">
            <path d="M0 640Q360 610 760 640T1600 635" />
            <path d="M0 820Q460 850 900 810T1600 825" />
            <path d="M0 1010Q420 970 880 1010T1600 1000" />
            <path d="M0 1210Q500 1245 1000 1200T1600 1225" />
            <path d="M0 1430Q440 1390 900 1430T1600 1410" />
          </g>

          <g transform="translate(800, 500)">
            <BuildingSilhouette />
          </g>

          <rect x="642" y="500" width="316" height="42" rx="2" fill="#10101c" />
          <rect x="666" y="542" width="268" height="170" rx="10" fill="#10101c" opacity="0.48" stroke="#fff" strokeOpacity="0.24" strokeDasharray="5 8" />

          <g ref={columnsGroupRef}>
            {columns.map((column) => (
              <ResonatorColumn key={`${column.cx}-${column.cy}`} {...column} />
            ))}
          </g>

          <path
            ref={wavePathRef}
            d="M-120 890Q60 830 190 895T382 895C486 895 500 740 548 650Q626 505 800 500Q974 505 1052 650C1100 740 1114 895 1218 895Q1360 895 1505 895T1720 890"
            fill="none"
            stroke="#E8A838"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#xrayWaveGlow)"
          />
          <path
            ref={wave2PathRef}
            d="M-120 1140Q60 1088 190 1140T382 1140C486 1140 500 1295 548 1390Q626 1530 800 1535Q974 1530 1052 1390C1100 1295 1114 1140 1218 1140Q1360 1140 1505 1140T1720 1140"
            fill="none"
            stroke="#E8A838"
            strokeWidth="6"
            strokeLinecap="round"
            strokeOpacity="0.76"
            filter="url(#xrayWaveGlow)"
          />
        </g>
      </svg>

      <div ref={labelsRef} className="pointer-events-none absolute inset-x-0 bottom-[13rem] z-20 grid grid-cols-2 gap-2 px-3 sm:px-6 md:bottom-auto md:top-[29%] md:grid-cols-4 md:gap-4 md:px-10 lg:px-14 xl:px-16">
        {[
          ["01", "Resonator Columns", "Rubber-steel cores tune the soil to earthquake frequencies."],
          ["02", "Periodic Array", "Two-meter spacing forms band gaps waves cannot cross."],
          ["03", "Concentric Rings", "Multiple rings widen protection around the foundation."],
          ["04", "Protected Zone", "The structure sits in stillness while energy routes around it."],
        ].map(([number, title, body]) => (
          <div key={number} className="liquid-glass-strong rounded-[1.15rem] p-3.5 md:rounded-[1.35rem] md:p-4 lg:p-5">
            <p className="font-body text-[10px] font-semibold tracking-[0.24em] text-[#E8A838]">{number}</p>
            <h3 className="mt-2.5 font-heading text-xl italic leading-[0.95] tracking-[-0.5px] text-white md:mt-3 md:text-[1.45rem] lg:text-2xl xl:text-[1.6rem]">{title}</h3>
            <p className="mt-2 font-body text-[11px] font-light leading-snug text-white/78 md:mt-3 md:text-xs lg:text-[0.8rem]">{body}</p>
          </div>
        ))}
      </div>

      <div ref={insightLabelRef} className="liquid-glass-strong pointer-events-none absolute bottom-8 left-1/2 z-30 w-[min(92vw,520px)] -translate-x-1/2 rounded-[1.5rem] px-6 py-5 text-center">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#E8A838]">Aha moment</p>
        <p className="mt-2 font-heading text-3xl italic leading-[0.95] tracking-[-1px] text-white md:text-4xl">
          Seismic waves redirect. The building feels nothing.
        </p>
      </div>
    </section>
  );
}
