"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type BlurTextProps = {
  text: string;
  className?: string;
};

export function BlurText({ text, className }: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            isInView
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : undefined
          }
          transition={{
            delay: index * 0.1,
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
