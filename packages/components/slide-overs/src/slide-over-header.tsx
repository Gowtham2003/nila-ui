"use client";

import * as React from "react";
import { cn } from "./utils/cn";
import type { SlideOverHeaderProps } from "./types";

export function SlideOverHeader({
  children,
  className,
  showCloseButton = true,
  onClose,
}: SlideOverHeaderProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 border-b border-neutral-200 dark:border-neutral-800/50 px-4 py-6 sm:px-6",
        "bg-white dark:bg-neutral-900/95",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-neutral-900 dark:text-white">
          {children}
        </div>
        {showCloseButton && onClose && (
          <button
            type="button"
            className="ml-4 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
            onClick={onClose}
          >
            <span className="sr-only">Close panel</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
