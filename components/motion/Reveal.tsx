"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "none";
  className?: string;
  isArch?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  isArch = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const initialY = direction === "up" ? 16 : direction === "down" ? -16 : 0;

  if (shouldReduceMotion) {
    return <div className={`${isArch ? "arch-window" : ""} ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${isArch ? "arch-window" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
