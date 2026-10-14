import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface RadiantButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  highlightColor?: string;
}

/**
 * Web implementation of the Skia RadiantButton:
 * - Obsidian dark core (#070a14)
 * - Continuous rotating conic-gradient perimeter glow
 * - Soft luminous bottom beam reflection (cyan/baby blue)
 * - Shimmer highlights and fluid hover scaling
 */
export default function RadiantButton({
  children = "ORÇAMENTO",
  className = "",
  showIcon = true,
  highlightColor = "#67e8f9",
  href,
  ...props
}: RadiantButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "radiant-button-root group relative inline-flex items-center justify-center cursor-pointer select-none",
        "rounded-full p-[2px] overflow-hidden transition-all duration-300",
        "hover:scale-[1.04] active:scale-[0.97]",
        className
      )}
      {...props}
    >
      {/* 1. Animated Rotating Conic Gradient (Border Glow Shader equivalent) */}
      <div
        className="absolute inset-[-100%] animate-[spin_3.5s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${highlightColor} 50%, #1371F9 65%, transparent 75%, transparent 100%)`,
        }}
      />

      {/* 2. Outer Ambient Glow Blur */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${highlightColor} 0%, #0732C1 70%, transparent 100%)`,
        }}
      />

      {/* 3. Button Inner Container (Inner Clip) */}
      <div className="relative z-10 flex items-center justify-center gap-2.5 rounded-full px-7 py-3 bg-[#070a14] border border-white/10 overflow-hidden shadow-inner w-full h-full">
        {/* Subtle dot matrix pattern simulation */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        {/* Luminous Bottom Glow Beam (Skia showGlow equivalent) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at bottom, ${highlightColor} 0%, #1371F9 60%, transparent 100%)`,
          }}
        />

        {/* Content */}
        {showIcon && (
          <FaWhatsapp
            className="text-base sm:text-lg transition-transform duration-300 group-hover:rotate-12 shrink-0"
            style={{ color: highlightColor }}
          />
        )}

        <span className="font-sans text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {children}
        </span>
      </div>
    </a>
  );
}
