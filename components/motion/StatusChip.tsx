import React from "react";

interface StatusChipProps {
  label: string;
  isOpen?: boolean;
  variant?: "dot" | "solid";
  className?: string;
}

export function StatusChip({
  label,
  isOpen = true,
  variant = "dot",
  className = "",
}: StatusChipProps) {
  if (variant === "dot") {
    return (
      <span
        className={`inline-flex items-center gap-2 text-xs font-medium tracking-tight text-[#0E1540] ${className}`}
      >
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            isOpen ? "bg-[#2236C8]" : "bg-stone-400"
          }`}
          aria-hidden="true"
        />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-xs ${
        isOpen
          ? "bg-[#2236C8] text-[#FFFBF0]"
          : "bg-stone-200 text-stone-800"
      } ${className}`}
    >
      {label}
    </span>
  );
}
