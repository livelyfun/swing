"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface ShopSunProps {
  isOpen: boolean;
  statusLabel: string;
  scheduleDetail: string;
  closingOrOpeningText?: string;
  className?: string;
}

export function ShopSun({
  isOpen,
  statusLabel,
  scheduleDetail,
  closingOrOpeningText,
  className = "",
}: ShopSunProps) {
  const shouldReduceMotion = useReducedMotion();

  // Sun position: y is higher (elevated in sky) when open, dipped below horizon when closed
  const sunY = isOpen ? 32 : 115;
  const horizonY = 96;

  return (
    <div
      role="region"
      aria-label={`Estat del forn: ${statusLabel}`}
      className={`relative overflow-hidden rounded-3xl bg-[#0E1540] border border-[#2236C8]/40 p-6 text-[#FFFBF0] shadow-xl ${className}`}
    >
      {/* Blue Hour celestial atmosphere gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: isOpen
            ? "radial-gradient(circle at 50% 35%, rgba(255, 210, 63, 0.22) 0%, rgba(34, 54, 200, 0.35) 45%, rgba(14, 21, 64, 0.95) 85%)"
            : "radial-gradient(circle at 50% 85%, rgba(240, 122, 31, 0.18) 0%, rgba(34, 54, 200, 0.15) 50%, rgba(14, 21, 64, 1) 90%)",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Text Information with high legibility */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                isOpen ? "bg-[#FFD23F] shadow-[0_0_8px_#FFD23F]" : "bg-stone-500"
              }`}
            />
            <span className="text-xs uppercase font-mono tracking-widest text-[#FFD23F] font-semibold">
              {isOpen ? "HORARI EN DIRECTE · BADALONA" : "OBRADOR EN PREPARACIÓ"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFBF0]">
            {statusLabel}
          </h2>

          <p className="text-sm text-[#FFFBF0]/85 font-normal max-w-sm">
            {closingOrOpeningText || scheduleDetail}
          </p>

          <div className="pt-2 text-xs font-mono text-[#FFFBF0]/70">
            Avda. Catalunya 39 · Badalona
          </div>
        </div>

        {/* Right: Celestial Sun / Horizon Scene */}
        <div className="w-48 h-32 relative shrink-0">
          <svg
            viewBox="0 0 200 130"
            className="w-full h-full overflow-hidden select-none"
            aria-hidden="true"
          >
            <defs>
              {/* Sun gradient */}
              <linearGradient id="sunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="100%" stopColor="#FFD23F" />
              </linearGradient>

              {/* Sun Halo */}
              <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD23F" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFD23F" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle Horizon Stars / Flour dust if closed */}
            {!isOpen && (
              <g opacity="0.6">
                <circle cx="35" cy="30" r="1.2" fill="#FFFBF0" />
                <circle cx="75" cy="22" r="1.5" fill="#FFFBF0" />
                <circle cx="140" cy="28" r="1.2" fill="#FFFBF0" />
                <circle cx="170" cy="42" r="1" fill="#FFFBF0" />
                <circle cx="110" cy="18" r="1.3" fill="#FFFBF0" />
              </g>
            )}

            {/* Sun Aura */}
            {isOpen && (
              <motion.circle
                cx="100"
                cy={sunY}
                r="36"
                fill="url(#haloGlow)"
                animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            )}

            {/* Animated Sun Disc */}
            <motion.circle
              cx="100"
              cy={sunY}
              r="22"
              fill="url(#sunGlow)"
              initial={false}
              animate={{ cy: sunY }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 120, damping: 15 }
              }
            />

            {/* Horizon Arch Line */}
            <line
              x1="10"
              y1={horizonY}
              x2="190"
              y2={horizonY}
              stroke="#2236C8"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Coastal & Bakery silhouette base beneath horizon */}
            <rect
              x="0"
              y={horizonY}
              width="200"
              height="35"
              fill="#0E1540"
            />

            {/* Horizon indicator label */}
            <text
              x="100"
              y={horizonY + 20}
              textAnchor="middle"
              fill="#FFFBF0"
              opacity="0.7"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="1"
            >
              {isOpen ? "HORITZÓ SOLAR · DIA" : "NIT · OBRADOR DESPERTA A LES 04:00"}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
