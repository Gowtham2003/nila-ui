"use client";

import * as React from "react";
import { cn } from "./utils/cn";
import type { SlideOverFooterProps } from "./types";

export function SlideOverFooter({ children, className }: SlideOverFooterProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 border-t border-neutral-200 dark:border-neutral-800/50 px-4 py-5 sm:px-6",
        "mt-auto bg-neutral-50 dark:bg-neutral-900/95",
        className
      )}
    >
      {children}
    </div>
  );
}
