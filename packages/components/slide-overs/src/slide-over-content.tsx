"use client";

import * as React from "react";
import { cn } from "./utils/cn";
import type { SlideOverContentProps } from "./types";

export function SlideOverContent({
  children,
  className,
}: SlideOverContentProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto",
        "bg-white dark:bg-neutral-900",
        "text-neutral-900 dark:text-neutral-100",
        className
      )}
    >
      {children}
    </div>
  );
}
