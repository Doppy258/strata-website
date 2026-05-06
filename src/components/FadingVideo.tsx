"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

type FadingVideoProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
};

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId = 0;
    let resetTimer = 0;
    let fadingOut = false;

    const fadeTo = (target: number, duration: number) => {
      cancelAnimationFrame(frameId);

      const startOpacity = Number.parseFloat(video.style.opacity || "0");
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        video.style.opacity = String(startOpacity + (target - startOpacity) * eased);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    const playVideo = () => {
      void video.play().catch(() => {
        video.style.opacity = "1";
      });
    };

    const handleLoadedData = () => {
      video.style.opacity = "0";
      playVideo();
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (!fadingOut && Number.isFinite(remaining) && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOut = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      resetTimer = window.setTimeout(() => {
        video.currentTime = 0;
        fadingOut = false;
        playVideo();
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(resetTimer);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  );
}
