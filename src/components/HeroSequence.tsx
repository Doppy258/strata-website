"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon, PlayIcon, SensorIcon, WaveIcon } from "./Icons";
import { BlurText } from "./BlurText";
import { FadingVideo } from "./FadingVideo";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

const reveal = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export function HeroSequence() {
  return (
    <section className="relative isolate flex min-h-[100dvh] overflow-hidden bg-[#060605] text-white">
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
        style={{ width: "120%", height: "120%" }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-[#060605] via-[#060605]/45 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col px-4 pt-24">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.div
            variants={reveal}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="liquid-glass mb-6 inline-flex items-center gap-2 rounded-full px-2 py-1"
          >
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#060605]">
              Field-ready
            </span>
            <span className="pr-3 font-body text-sm font-light text-white/90">
              Metamaterial foundations for seismic wave redirection
            </span>
          </motion.div>

          <BlurText
            text="Buildings that do not feel earthquakes"
            className="flex max-w-3xl flex-wrap justify-center gap-y-[0.1em] font-heading text-6xl italic leading-[0.82] tracking-[-4px] text-white md:text-7xl lg:text-[5.6rem]"
          />

          <motion.p
            variants={reveal}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="mt-5 max-w-2xl font-body text-sm font-light leading-tight text-white md:text-base"
          >
            Strata buries tuned resonator arrays around a foundation, bending destructive surface
            waves around the protected zone before they reach the building.
          </motion.p>

          <motion.div
            variants={reveal}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
            className="mt-7 flex flex-col items-center gap-5 sm:flex-row sm:gap-6"
          >
            <a
              href="#technology"
              className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white transition-transform active:scale-[0.98]"
            >
              See the System
              <ArrowUpRightIcon className="h-5 w-5" />
            </a>
            <a
              href="#xray"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              View Scroll Reveal
              <PlayIcon className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
            className="mt-9 grid w-full max-w-[460px] grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div className="liquid-glass rounded-[1.25rem] p-5 text-left">
              <WaveIcon className="h-7 w-7 text-white" />
              <div className="mt-8 font-heading text-4xl italic leading-none tracking-[-1px] text-white">
                -9.3 dB
              </div>
              <p className="mt-2 font-body text-xs font-light text-white">
                Field-test attenuation of seismic surface waves
              </p>
            </div>
            <div className="liquid-glass rounded-[1.25rem] p-5 text-left">
              <SensorIcon className="h-7 w-7 text-white" />
              <div className="mt-8 font-heading text-4xl italic leading-none tracking-[-1px] text-white">
                2.6-7.8 Hz
              </div>
              <p className="mt-2 font-body text-xs font-light text-white">
                Target range for destructive earthquake motion
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={reveal}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div className="liquid-glass rounded-full px-3.5 py-1 font-body text-xs font-medium text-white">
            Designed for towers, hospitals, bridges, campuses, and critical infrastructure
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 font-heading text-2xl italic tracking-tight text-white md:gap-x-16 md:text-3xl">
            <span>Metamaterials</span>
            <span>Resonance</span>
            <span>Redirection</span>
            <span>Stillness</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
