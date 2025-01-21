"use client";

import * as React from "react";
import { useEffect, useCallback } from "react";
import { cn } from "./utils/cn";
import type { SlideOverProps } from "./types";

export function SlideOver({
  isOpen,
  onClose,
  position = "right",
  size = "md",
  children,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  blurBackground = true,
  className,
  overlayClassName,
}: SlideOverProps) {
  // Handle ESC key press
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === "Escape") {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    xs: "w-[90vw] sm:max-w-xs",
    sm: "w-[90vw] sm:max-w-sm",
    md: "w-[90vw] sm:max-w-md",
    lg: "w-[90vw] sm:max-w-lg",
    xl: "w-[90vw] sm:max-w-xl",
    full: "w-screen",
  }[size];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-neutral-900/50 dark:bg-black/80 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
          blurBackground && "backdrop-blur-sm dark:backdrop-blur-md",
          overlayClassName
        )}
        onClick={closeOnOutsideClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className={cn(
          "fixed inset-y-0 flex items-start justify-end sm:items-stretch",
          position === "left" ? "left-0" : "right-0"
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col transform transition-transform duration-300 ease-in-out bg-white dark:bg-neutral-900 shadow-xl",
            sizeClasses,
            position === "left"
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : isOpen
                ? "translate-x-0"
                : "translate-x-full",
            className
          )}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
