"use client";

import { motion } from "framer-motion";
import { ColumnIcon, FoundationIcon, WaveIcon } from "./Icons";
import { FadingVideo } from "./FadingVideo";

const CAPABILITIES_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

const capabilities = [
  {
    title: "Wave Redirection",
    body: "Surface waves split around the protected footprint and rejoin beyond it, keeping peak motion away from the structure.",
    icon: WaveIcon,
    tags: ["Cloaking", "Ray routing", "Low drift", "Passive"],
  },
  {
    title: "Resonator Arrays",
    body: "Rubber, steel, and concrete columns are tuned to destructive seismic frequencies and arranged as a buried periodic field.",
    icon: ColumnIcon,
    tags: ["2m spacing", "Band gaps", "Local resonance", "Serviceable"],
  },
  {
    title: "Foundation Retrofit",
    body: "The system sits in the ground around new or existing foundations, protecting hospitals, towers, bridges, and campuses.",
    icon: FoundationIcon,
    tags: ["No moving parts", "Civil materials", "Pilot-ready", "Scalable"],
  },
];

export function InfoSections() {
  return (
    <section id="technology" className="relative isolate min-h-[100dvh] overflow-hidden bg-[#060605] px-8 pt-24 pb-10 text-white md:px-16 lg:px-20">
      <FadingVideo src={CAPABILITIES_VIDEO} className="absolute inset-0 z-0 h-full w-full object-cover" />

      <div className="relative z-10 flex min-h-[calc(100dvh-8.5rem)] flex-col">
        <div className="mb-auto">
          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 font-body text-sm text-white/80"
          >
            {"// Capabilities"}
          </motion.p>
          <motion.h2
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            className="font-heading text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]"
          >
            Protection
            <br />
            evolved
          </motion.h2>
        </div>

        <div id="protection" className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
                whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.1, duration: 0.75, ease: "easeOut" }}
                className="liquid-glass flex min-h-[360px] flex-col rounded-[1.25rem] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass grid h-11 w-11 shrink-0 place-items-center rounded-[0.75rem] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex max-w-[72%] flex-wrap justify-end gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="liquid-glass rounded-full px-3 py-1 font-body text-[11px] text-white/90">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1" />

                <h3 className="font-heading text-3xl italic leading-none tracking-[-1px] text-white md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[32ch] font-body text-sm font-light leading-snug text-white/90">
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
