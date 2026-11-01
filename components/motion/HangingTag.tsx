"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface HangingTagProps {
  label: string;
  sublabel?: string;
  variant?: "crust" | "hour" | "sun" | "tomato" | "sage";
  className?: string;
}

export function HangingTag({
  label,
  sublabel,
  variant = "crust",
  className = "",
}: HangingTagProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantStyles = {
    crust: "bg-[#F07A1F] text-[#0E1540] border-[#0E1540]/20",
    hour: "bg-[#2236C8] text-[#FFFBF0] border-[#0E1540]/20",
    sun: "bg-[#FFD23F] text-[#0E1540] border-[#0E1540]/20",
    tomato: "bg-[#C9341F] text-[#FFFBF0] border-transparent",
    sage: "bg-[#CFE3C2] text-[#0E1540] border-[#0E1540]/15",
  };

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Tiny hanging string/cord */}
      <div className="w-[1.5px] h-3 bg-[#0E1540]/30" aria-hidden="true" />

      {/* The swinging physical tag */}
      <motion.div
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, -6, 5, -2, 0],
                transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
              }
        }
        className={`origin-top px-3 py-1.5 rounded-sm border shadow-xs text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-default select-none ${variantStyles[variant]}`}
      >
        {/* Hole punch circle */}
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#0E1540]/30 inline-block"
          aria-hidden="true"
        />
        <span>{label}</span>
        {sublabel && (
          <span className="opacity-75 text-[10px] font-normal font-mono">
            {sublabel}
          </span>
        )}
      </motion.div>
    </div>
  );
}
