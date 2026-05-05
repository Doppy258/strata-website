"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Building SVG fragment used in both hero preview and the pinned scene.
// Local coords: footprint sits on y=0 (ground); centered on x=0.
const B_LINE = "#1A1A2E";
const B_FACADE = "#FAFAF8";
const B_ACCENT = "#E8E5DF";
const B_GLINT = "#FFFFFF";

type TierSpec = { yTop: number; yBot: number; halfW: number };

const BUILDING_TIERS: TierSpec[] = [
  { yTop: -278, yBot: -252, halfW: 78 }, // crown + parapet zone
  { yTop: -252, yBot: -198, halfW: 92 }, // upper setback
  { yTop: -198, yBot: -118, halfW: 118 }, // mid rise
  { yTop: -118, yBot: -44, halfW: 118 }, // lower mid / podium top
  { yTop: -44, yBot: -36, halfW: 122 }, // transitional spandrel
  { yTop: -36, yBot: 0, halfW: 124 }, // ground / lobby
];

function tierSilhouettePath(): string {
  const T = BUILDING_TIERS;
  const parts: string[] = [];
  parts.push(`M ${T[0].halfW} ${T[0].yTop}`);
  for (let i = 0; i < T.length; i++) {
    parts.push(`L ${T[i].halfW} ${T[i].yBot}`);
    if (i < T.length - 1) {
      parts.push(`L ${T[i + 1].halfW} ${T[i].yBot}`);
    }
  }
  const b = T[T.length - 1];
  parts.push(`L ${-b.halfW} ${b.yBot}`);
  for (let i = T.length - 1; i > 0; i--) {
    parts.push(`L ${-T[i].halfW} ${T[i].yTop}`);
    parts.push(`L ${-T[i - 1].halfW} ${T[i].yTop}`);
  }
  parts.push(`L ${-T[0].halfW} ${T[0].yTop}`);
  parts.push("Z");
  return parts.join(" ");
}

function PunchedGrid({
  y0,
  y1,
  halfW,
  cols,
  rows,
  padX,
  padY,
  winRx,
}: {
  y0: number;
  y1: number;
  halfW: number;
  cols: number;
  rows: number;
  padX: number;
  padY: number;
  winRx: number;
}) {
  const h = y1 - y0;
  const w = halfW * 2;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;
  const cellW = innerW / cols;
  const cellH = innerH / rows;
  const gutter = Math.max(1.25, cellW * 0.14);
  const vSep = Math.max(1, cellW * 0.06);
  const winW = cellW - gutter - vSep * 0.5;
  const winH = cellH - gutter;

  const nodes: ReactNode[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = -halfW + padX + c * cellW + cellW / 2;
      const cy = y0 + padY + r * cellH + cellH / 2;
      const wx = cx - winW / 2;
      const wy = cy - winH / 2;
      nodes.push(
        <rect
          key={`glass-${y0}-${r}-${c}`}
          x={wx}
          y={wy}
          width={winW}
          height={winH}
          rx={winRx}
          ry={winRx}
          fill={B_LINE}
          opacity={0.82}
        />
      );
      nodes.push(
        <rect
          key={`glint-${y0}-${r}-${c}`}
          x={wx + winW * 0.08}
          y={wy + winH * 0.12}
          width={winW * 0.35}
          height={1.15}
          fill={B_GLINT}
          opacity={0.22}
        />
      );
    }
  }

  const totalSpan = cols * cellW;
  const xLeftMullion = -halfW + padX;
  for (let i = 0; i <= cols; i++) {
    const xi = xLeftMullion + i * cellW;
    nodes.push(
      <line
        key={`mv-${y0}-${i}`}
        x1={xi}
        y1={y0 + padY * 0.35}
        x2={xi}
        y2={y1 - padY * 0.35}
        stroke={B_LINE}
        strokeWidth={i === 0 || i === cols ? 1.35 : 1}
        vectorEffect="non-scaling-stroke"
        opacity={0.95}
      />
    );
  }

  for (let j = 0; j <= rows; j++) {
    const yj = y0 + padY + j * cellH;
    nodes.push(
      <line
        key={`mh-${y0}-${j}`}
        x1={xLeftMullion + vSep * 0.25}
        y1={yj}
        x2={xLeftMullion + totalSpan - vSep * 0.25}
        y2={yj}
        stroke={B_LINE}
        strokeWidth={j === 0 || j === rows ? 1.15 : 0.85}
        vectorEffect="non-scaling-stroke"
        opacity={0.88}
      />
    );
  }

  return <g>{nodes}</g>;
}

function Building() {
  const sil = tierSilhouettePath();
  const lobby = BUILDING_TIERS[BUILDING_TIERS.length - 1];
  const crown = BUILDING_TIERS[0];

  return (
    <g shapeRendering="geometricPrecision">
      {/* Depth read: shallow shadow mass (no glow) */}
      <path d={sil} fill={B_LINE} opacity={0.055} transform="translate(7, 4)" />
      {/* Secondary plane — cool accent sidelight */}
      <path
        d={`M ${-lobby.halfW - 10} 2 L ${-lobby.halfW - 22} -4 L ${-lobby.halfW - 22} ${crown.yTop - 6} L ${-crown.halfW - 6} ${crown.yTop - 10} L ${-crown.halfW} ${crown.yTop} L ${-lobby.halfW} 0 Z`}
        fill={B_ACCENT}
        opacity={0.38}
        stroke="none"
      />

      <path d={sil} fill={B_FACADE} stroke={B_LINE} strokeWidth={1.35} vectorEffect="non-scaling-stroke" />

      {/* Spandrel / belt courses */}
      {BUILDING_TIERS.slice(0, -1).map((t) => (
        <line
          key={`belt-${t.yBot}`}
          x1={-t.halfW}
          y1={t.yBot}
          x2={t.halfW}
          y2={t.yBot}
          stroke={B_ACCENT}
          strokeWidth={1.1}
          vectorEffect="non-scaling-stroke"
          opacity={0.9}
        />
      ))}

      {/* Parapet coping */}
      <rect
        x={-crown.halfW - 1}
        y={crown.yTop - 5}
        width={(crown.halfW + 1) * 2}
        height={5}
        fill={B_LINE}
        opacity={0.92}
      />
      <line
        x1={-crown.halfW}
        y1={crown.yTop}
        x2={crown.halfW}
        y2={crown.yTop}
        stroke={B_ACCENT}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
      />

      {/* Slim canopy / entrance brow */}
      <g>
        <rect x={-76} y={-40} width={152} height={5} rx={1} fill={B_ACCENT} stroke={B_LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <line x1={-74} y1={-37.5} x2={74} y2={-37.5} stroke={B_GLINT} strokeWidth={0.9} opacity={0.35} vectorEffect="non-scaling-stroke" />
      </g>

      {/* Ground-floor recessed lobby glazing band */}
      <g>
        <rect
          x={-lobby.halfW + 14}
          y={-32}
          width={lobby.halfW * 2 - 28}
          height={30}
          rx={1.25}
          fill={B_LINE}
          opacity={0.2}
          stroke={B_LINE}
          strokeWidth={1.1}
          vectorEffect="non-scaling-stroke"
        />
        {[-48, -16, 16, 48].map((dx, i) => (
          <g key={`lobby-${i}`}>
            <rect
              x={dx - 14}
              y={-29}
              width={26}
              height={24}
              rx={0.9}
              fill={B_LINE}
              opacity={0.78}
            />
            <rect x={dx - 10} y={-26} width={9} height={0.9} fill={B_GLINT} opacity={0.28} />
          </g>
        ))}
        <line x1={-lobby.halfW + 16} y1={-19} x2={lobby.halfW - 16} y2={-19} stroke={B_LINE} strokeWidth={0.85} opacity={0.55} vectorEffect="non-scaling-stroke" />
      </g>

      {/* Punched curtain wall — tiered density */}
      <PunchedGrid y0={-118} y1={-44} halfW={118} cols={7} rows={3} padX={10} padY={9} winRx={0.65} />
      <PunchedGrid y0={-198} y1={-118} halfW={118} cols={7} rows={3} padX={10} padY={9} winRx={0.65} />
      <PunchedGrid y0={-252} y1={-198} halfW={92} cols={5} rows={2} padX={9} padY={8} winRx={0.65} />
      <PunchedGrid y0={-272} y1={-252} halfW={78} cols={4} rows={1} padX={8} padY={5} winRx={0.6} />

      {/* Light vertical emphasis — mullion “stack” over setback */}
      <line
        x1={0}
        y1={-42}
        x2={0}
        y2={crown.yTop + 0.5}
        stroke={B_LINE}
        strokeWidth={0.9}
        opacity={0.35}
        vectorEffect="non-scaling-stroke"
        strokeDasharray="2 3"
      />
    </g>
  );
}

export function HeroSequence() {
  const heroRef = useRef<HTMLElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SVGGElement>(null);
  const columnsGroupRef = useRef<SVGGElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const wave2PathRef = useRef<SVGPathElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const insightLabelRef = useRef<HTMLDivElement>(null);
  const topographyRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Subtle topography drift in the hero (always running, lightweight)
      if (topographyRef.current) {
        gsap.to(topographyRef.current, {
          x: 30,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        // Initial state: hide labels, set wave dasharrays
        if (wavePathRef.current) {
          const len = wavePathRef.current.getTotalLength();
          gsap.set(wavePathRef.current, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          });
        }
        if (wave2PathRef.current) {
          const len2 = wave2PathRef.current.getTotalLength();
          gsap.set(wave2PathRef.current, {
            strokeDasharray: len2,
            strokeDashoffset: len2,
            opacity: 1,
          });
        }
        gsap.set(labelsRef.current?.children || [], { opacity: 0, y: 12 });
        gsap.set(insightLabelRef.current, { opacity: 0, y: 18 });
        gsap.set(columnsGroupRef.current?.children || [], {
          opacity: 0,
          scale: 0.6,
          transformOrigin: "center center",
        });

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

        // Phase 1 (0-30%): Camera pans down — translate scene up to reveal underground
        tl.to(
          sceneRef.current,
          {
            y: -250,
            ease: "none",
            duration: 2,
          },
          0
        );

        // Phase 2 (30-55%): Columns pop in, labels fade in
        tl.to(
          columnsGroupRef.current?.children || [],
          {
            opacity: 1,
            scale: 1,
            stagger: { each: 0.04, from: "center" },
            duration: 1,
            ease: "back.out(1.4)",
          },
          1.8
        );

        tl.to(
          labelsRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "power2.out",
          },
          2.2
        );

        // Phase 3 (55-100%): Animate seismic waves traveling left to right
        tl.to(
          wavePathRef.current,
          {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power1.inOut",
          },
          3.2
        );

        tl.to(
          wave2PathRef.current,
          {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power1.inOut",
          },
          3.4
        );

        tl.to(
          insightLabelRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          5.5
        );
      });

      mm.add("(prefers-reduced-motion: reduce), (max-width: 767px)", () => {
        // Static fallback: show everything in final state, no pin
        gsap.set(columnsGroupRef.current?.children || [], { opacity: 1, scale: 1 });
        gsap.set(labelsRef.current?.children || [], { opacity: 1, y: 0 });
        gsap.set(insightLabelRef.current, { opacity: 1, y: 0 });
        if (wavePathRef.current) {
          gsap.set(wavePathRef.current, { strokeDasharray: "none", strokeDashoffset: 0 });
        }
        if (wave2PathRef.current) {
          gsap.set(wave2PathRef.current, { strokeDasharray: "none", strokeDashoffset: 0 });
        }
        gsap.set(sceneRef.current, { y: -250 });
      });

      return () => mm.revert();
    },
    { scope: pinSectionRef }
  );

  return (
    <>
      {/* HERO TEXT SECTION */}
      <section
        ref={heroRef}
        className="relative isolate min-h-[100dvh] flex flex-col bg-background overflow-hidden"
      >
        {/* Animated topography lines in background */}
        <svg
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <g ref={topographyRef} stroke="#1A1A2E" strokeWidth="1" fill="none" opacity="0.06">
            <path d="M-100,200 Q400,100 900,250 T1700,180" />
            <path d="M-100,300 Q500,250 1000,330 T1700,290" />
            <path d="M-100,400 Q300,380 800,440 T1700,400" />
            <path d="M-100,500 Q600,460 1100,540 T1700,510" />
            <path d="M-100,600 Q400,580 900,640 T1700,620" />
          </g>
        </svg>

        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-28 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border-gray bg-background/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-foreground/70">
              Seismic Metamaterial Foundations
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-8 max-w-5xl leading-[0.95]">
            Buildings That Don&apos;t
            <br />
            <span className="italic font-medium">Feel</span> Earthquakes
          </h1>

          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mb-10 leading-relaxed">
            Metamaterial foundations that redirect seismic waves around structures. The first
            technology that doesn&apos;t fight earthquakes — it makes them disappear.
          </p>

          <a
            href="#xray"
            className="group inline-flex items-center gap-3 bg-accent text-[#1A1A2E] px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-[#d99828] active:scale-[0.97] shadow-[0_8px_30px_-12px_rgba(232,168,56,0.6)]"
          >
            See How It Works
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </div>

        {/* Bottom 40%: SVG cross-section preview */}
        <div className="relative z-20 h-[38vh] w-full">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1600 600"
            preserveAspectRatio="xMidYMax slice"
          >
            {/* Sky gradient subtle */}
            <defs>
              <linearGradient id="heroGroundFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A1A2E" stopOpacity="0" />
                <stop offset="20%" stopColor="#3a2e22" stopOpacity="1" />
                <stop offset="100%" stopColor="#2a1f17" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Ground line with subtle terrain */}
            <path
              d="M0,200 Q200,195 400,200 Q600,205 800,198 Q1000,193 1200,200 Q1400,205 1600,200 L1600,600 L0,600 Z"
              fill="url(#heroGroundFade)"
            />
            {/* Surface line */}
            <path
              d="M0,200 Q200,195 400,200 Q600,205 800,198 Q1000,193 1200,200 Q1400,205 1600,200"
              stroke="#1A1A2E"
              strokeWidth="2"
              fill="none"
            />

            {/* Tiny grass tufts */}
            {Array.from({ length: 40 }).map((_, i) => {
              const x = i * 42 + 10;
              const yBase = 200 + Math.sin(i * 0.3) * 4;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={yBase}
                  x2={x}
                  y2={yBase - 6}
                  stroke="#6b5d3a"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Building */}
            <g transform="translate(800, 200)">
              <Building />
            </g>

            {/* Hint of underground - dotted lines suggesting depth */}
            <g stroke="#FAFAF8" strokeWidth="1" strokeDasharray="3 6" opacity="0.15" fill="none">
              <line x1="0" y1="280" x2="1600" y2="280" />
              <line x1="0" y1="360" x2="1600" y2="360" />
              <line x1="0" y1="440" x2="1600" y2="440" />
            </g>

            {/* Hint of column tops emerging from soil */}
            <g opacity="0.4">
              <circle cx="600" cy="270" r="14" fill="none" stroke="#FAFAF8" strokeWidth="2" />
              <circle cx="650" cy="280" r="14" fill="none" stroke="#FAFAF8" strokeWidth="2" />
              <circle cx="950" cy="280" r="14" fill="none" stroke="#FAFAF8" strokeWidth="2" />
              <circle cx="1000" cy="270" r="14" fill="none" stroke="#FAFAF8" strokeWidth="2" />
            </g>

            {/* Scroll cue */}
            <g transform="translate(800, 540)">
              <text
                textAnchor="middle"
                fill="#FAFAF8"
                opacity="0.5"
                fontSize="11"
                fontFamily="Inter, sans-serif"
                letterSpacing="3"
              >
                SCROLL TO REVEAL
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* PINNED X-RAY SECTION */}
      <div
        id="xray"
        ref={pinSectionRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-[#1A1A2E]"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Soil gradient */}
            <linearGradient id="soilGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a2e22" />
              <stop offset="40%" stopColor="#2a1f17" />
              <stop offset="100%" stopColor="#1a130d" />
            </linearGradient>
            {/* Glow filter for waves */}
            <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Scene group that translates upward to reveal underground */}
          <g ref={sceneRef}>
            {/* Sky / Background */}
            <rect x="0" y="0" width="1600" height="500" fill="#FAFAF8" />

            {/* Ground surface */}
            <path
              d="M0,500 Q400,495 800,500 T1600,500 L1600,2000 L0,2000 Z"
              fill="url(#soilGradient)"
            />
            {/* Surface stroke */}
            <path
              d="M0,500 Q400,495 800,500 T1600,500"
              stroke="#1A1A2E"
              strokeWidth="3"
              fill="none"
            />

            {/* Grass tufts */}
            {Array.from({ length: 40 }).map((_, i) => {
              const x = i * 42 + 10;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={500}
                  x2={x}
                  y2={494}
                  stroke="#6b5d3a"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Soil texture lines */}
            <g stroke="#FAFAF8" strokeWidth="1" strokeOpacity="0.04" fill="none">
              <path d="M0,650 Q400,630 800,650 Q1200,670 1600,650" />
              <path d="M0,800 Q400,820 800,800 Q1200,780 1600,800" />
              <path d="M0,950 Q500,930 1000,950 Q1300,970 1600,950" />
              <path d="M0,1100 Q400,1120 900,1100 Q1300,1080 1600,1100" />
              <path d="M0,1250 Q500,1230 1000,1250 Q1300,1270 1600,1250" />
              <path d="M0,1400 Q400,1420 900,1400 Q1300,1380 1600,1400" />
            </g>

            {/* Soil layer separators */}
            <line x1="0" y1="1100" x2="1600" y2="1100" stroke="#FAFAF8" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="6 12" />
            <line x1="0" y1="1500" x2="1600" y2="1500" stroke="#FAFAF8" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="6 12" />

            {/* Building on the surface */}
            <g transform="translate(800, 500)">
              <Building />
            </g>

            {/* Foundation slab */}
            <rect
              x="660"
              y="500"
              width="280"
              height="40"
              fill="#1A1A2E"
            />
            <rect
              x="650"
              y="540"
              width="300"
              height="180"
              fill="#1A1A2E"
              opacity="0.5"
              stroke="#FAFAF8"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeDasharray="4 6"
            />

            {/* Metamaterial Columns - 3 concentric rings around foundation */}
            <g ref={columnsGroupRef}>
              {/* Inner ring (closest to foundation) */}
              {[
                { cx: 560, cy: 800 },
                { cx: 480, cy: 950 },
                { cx: 560, cy: 1100 },
                { cx: 1040, cy: 800 },
                { cx: 1120, cy: 950 },
                { cx: 1040, cy: 1100 },
              ].map((pos, i) => (
                <g key={`inner-${i}`} transform={`translate(${pos.cx}, ${pos.cy})`}>
                  <circle r="32" fill="#1a1a1a" />
                  <circle r="28" fill="none" stroke="#3d3d3d" strokeWidth="6" />
                  <circle r="20" fill="#9a9a9a" />
                  <circle r="14" fill="#c0c0c0" />
                  <circle r="20" fill="none" stroke="#FAFAF8" strokeWidth="0.5" strokeOpacity="0.3" />
                </g>
              ))}

              {/* Middle ring */}
              {[
                { cx: 380, cy: 750 },
                { cx: 320, cy: 900 },
                { cx: 320, cy: 1050 },
                { cx: 380, cy: 1200 },
                { cx: 1220, cy: 750 },
                { cx: 1280, cy: 900 },
                { cx: 1280, cy: 1050 },
                { cx: 1220, cy: 1200 },
              ].map((pos, i) => (
                <g key={`mid-${i}`} transform={`translate(${pos.cx}, ${pos.cy})`}>
                  <circle r="28" fill="#1a1a1a" />
                  <circle r="24" fill="none" stroke="#3d3d3d" strokeWidth="5" />
                  <circle r="17" fill="#9a9a9a" />
                  <circle r="12" fill="#c0c0c0" />
                </g>
              ))}

              {/* Outer ring */}
              {[
                { cx: 200, cy: 700 },
                { cx: 150, cy: 850 },
                { cx: 130, cy: 1000 },
                { cx: 150, cy: 1150 },
                { cx: 200, cy: 1300 },
                { cx: 1400, cy: 700 },
                { cx: 1450, cy: 850 },
                { cx: 1470, cy: 1000 },
                { cx: 1450, cy: 1150 },
                { cx: 1400, cy: 1300 },
              ].map((pos, i) => (
                <g key={`outer-${i}`} transform={`translate(${pos.cx}, ${pos.cy})`}>
                  <circle r="24" fill="#1a1a1a" />
                  <circle r="20" fill="none" stroke="#3d3d3d" strokeWidth="4" />
                  <circle r="14" fill="#9a9a9a" />
                  <circle r="10" fill="#c0c0c0" />
                </g>
              ))}
            </g>

            {/* Seismic wave traveling and bending around protected zone */}
            {/* Top wave - splits over the protected zone */}
            <path
              ref={wavePathRef}
              d="M -100,900 Q 50,850 150,900 T 350,900 C 450,900 480,750 520,650 Q 600,500 800,500 Q 1000,500 1080,650 C 1120,750 1150,900 1250,900 Q 1400,900 1500,900 T 1700,900"
              fill="none"
              stroke="#E8A838"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#waveGlow)"
            />

            {/* Bottom wave path - bends underneath */}
            <path
              ref={wave2PathRef}
              d="M -100,1150 Q 50,1100 150,1150 T 350,1150 C 450,1150 480,1300 520,1400 Q 600,1550 800,1550 Q 1000,1550 1080,1400 C 1120,1300 1150,1150 1250,1150 Q 1400,1150 1500,1150 T 1700,1150"
              fill="none"
              stroke="#E8A838"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.7"
              filter="url(#waveGlow)"
            />
          </g>
        </svg>

        {/* HTML Labels overlaid on top — positioned over dark soil area */}
        <div ref={labelsRef} className="absolute inset-0 pointer-events-none px-4 md:px-10">
          {/* Top-Left Label (just below surface line) */}
          <div className="absolute top-[42%] left-[3%] md:left-[6%] max-w-[240px] text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] text-accent tracking-[0.2em]">01</span>
              <div className="h-px flex-1 bg-accent/50" />
            </div>
            <h3 className="font-display font-semibold text-base md:text-lg leading-tight mb-1">
              Rubber-Steel Resonator Columns
            </h3>
            <p className="text-white/55 text-xs leading-relaxed">
              Tuned to seismic frequencies. Standard construction-grade materials.
            </p>
          </div>

          {/* Top-Right Label */}
          <div className="absolute top-[42%] right-[3%] md:right-[6%] max-w-[240px] text-white text-right">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-accent/50" />
              <span className="font-mono text-[10px] text-accent tracking-[0.2em]">02</span>
            </div>
            <h3 className="font-display font-semibold text-base md:text-lg leading-tight mb-1">
              Periodic Array
            </h3>
            <p className="text-white/55 text-xs leading-relaxed">
              2m spacing creates frequency band gaps that block seismic propagation.
            </p>
          </div>

          {/* Bottom-Left Label */}
          <div className="absolute bottom-[20%] left-[3%] md:left-[6%] max-w-[240px] text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] text-accent tracking-[0.2em]">03</span>
              <div className="h-px flex-1 bg-accent/50" />
            </div>
            <h3 className="font-display font-semibold text-base md:text-lg leading-tight mb-1">
              3-5 Concentric Rings
            </h3>
            <p className="text-white/55 text-xs leading-relaxed">
              Multi-layer protection redirects waves around the foundation zone.
            </p>
          </div>

          {/* Bottom-Right Label */}
          <div className="absolute bottom-[20%] right-[3%] md:right-[6%] max-w-[240px] text-white text-right">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-accent/50" />
              <span className="font-mono text-[10px] text-accent tracking-[0.2em]">04</span>
            </div>
            <h3 className="font-display font-semibold text-base md:text-lg leading-tight mb-1">
              Protected Foundation Zone
            </h3>
            <p className="text-white/55 text-xs leading-relaxed">
              Building sits in a pocket of stillness while waves redirect around it.
            </p>
          </div>
        </div>

        {/* Phase 3 insight callout */}
        <div
          ref={insightLabelRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-4 bg-[#FAFAF8]/5 backdrop-blur-md border border-white/10 rounded-2xl text-center max-w-md pointer-events-none"
        >
          <p className="text-accent font-mono text-xs uppercase tracking-widest mb-1">
            Aha moment
          </p>
          <p className="text-white font-display text-lg md:text-xl font-semibold leading-tight">
            Seismic waves redirected.
            <br />
            <span className="text-white/60 font-medium">Building feels nothing.</span>
          </p>
        </div>
      </div>
    </>
  );
}
