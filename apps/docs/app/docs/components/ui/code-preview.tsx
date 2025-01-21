"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../../lib/utils";

interface CodePreviewProps {
  preview: React.ReactNode;
  code: string;
  title?: string;
  description?: string;
  className?: string;
}

export function CodePreview({
  preview,
  code,
  title,
  description,
  className,
}: CodePreviewProps) {
  const [isCode, setIsCode] = useState(false);

  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h3 className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1">
            <button
              onClick={() => setIsCode(false)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm font-medium",
                !isCode
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-neutral-100"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              )}
            >
              Preview
            </button>
            <button
              onClick={() => setIsCode(true)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm font-medium",
                isCode
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-neutral-100"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              )}
            >
              Code
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isCode ? (
          <div className="relative rounded-lg bg-neutral-950">
            <div className="absolute right-2 top-2 z-10">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }}
                className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-medium text-neutral-400 hover:bg-white/20 hover:text-neutral-100"
              >
                Copy
              </button>
            </div>
            <div className="max-w-full overflow-x-auto">
              <pre className="p-4">
                <code className="block text-sm text-neutral-100 whitespace-pre">
                  {code}
                </code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="preview-content">{preview}</div>
        )}
      </div>
    </div>
  );
}
