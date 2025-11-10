"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-1/2 -translate-x-1/2 border-t-[#212A38] border-l-transparent border-r-transparent border-b-transparent";
      case "bottom":
        return "bottom-full left-1/2 -translate-x-1/2 border-b-[#212A38] border-l-transparent border-r-transparent border-t-transparent";
      case "left":
        return "left-full top-1/2 -translate-y-1/2 border-l-[#212A38] border-t-transparent border-b-transparent border-r-transparent";
      case "right":
        return "right-full top-1/2 -translate-y-1/2 border-r-[#212A38] border-t-transparent border-b-transparent border-l-transparent";
      default:
        return "top-full left-1/2 -translate-x-1/2 border-t-[#212A38] border-l-transparent border-r-transparent border-b-transparent";
    }
  };

  return (
    <div
      ref={triggerRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "absolute z-50 px-3 py-2 text-sm text-white bg-[#212A38] border border-[#384051] rounded-lg shadow-lg whitespace-nowrap",
            getPositionClasses()
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              "absolute w-0 h-0 border-4",
              getArrowClasses()
            )}
          />
        </div>
      )}
    </div>
  );
};

interface TooltipIconProps {
  content: string;
  className?: string;
}

export const TooltipIcon: React.FC<TooltipIconProps> = ({
  content,
  className,
}) => {
  return (
    <Tooltip content={content}>
      <Info
        className={cn(
          "w-4 h-4 text-[#AAAAAA] cursor-help hover:text-[#0FE2D4] transition-colors",
          className
        )}
      />
    </Tooltip>
  );
};

