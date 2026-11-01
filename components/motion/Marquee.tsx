import React from "react";

interface MarqueeProps {
  items: string[];
  separator?: string;
  speedSec?: number;
  variant?: "crust" | "hour" | "night" | "flour";
  className?: string;
}

export function Marquee({
  items,
  separator = "✦",
  speedSec = 28,
  variant = "crust",
  className = "",
}: MarqueeProps) {
  const variantStyles = {
    crust: "bg-[#F07A1F] text-[#0E1540] border-y border-[#0E1540]/15",
    hour: "bg-[#2236C8] text-[#FFFBF0] border-y border-[#2236C8]",
    night: "bg-[#0E1540] text-[#FFD23F] border-y border-[#2236C8]/40",
    flour: "bg-[#FFFBF0] text-[#0E1540] border-y border-[#0E1540]/10",
  };

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      role="region"
      aria-label="Anuncis de temporada"
      className={`overflow-hidden py-3 font-semibold select-none ${variantStyles[variant]} ${className}`}
    >
      <div
        className="animate-marquee-track flex items-center whitespace-nowrap"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="inline-flex items-center mx-4 text-xs sm:text-sm tracking-wide">
            <span>{item}</span>
            <span className="mx-4 opacity-50 text-[10px]" aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
