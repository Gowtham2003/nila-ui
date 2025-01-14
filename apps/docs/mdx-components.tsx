import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

// Define custom components for MDX
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default elements with custom styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold tracking-tight mt-6 mb-3">
        {children}
      </h3>
    ),
    // Custom link component using Next.js Link
    a: ({ href = "", children }) => {
      const isExternal = href.startsWith("http");
      const Component = isExternal ? "a" : Link;
      return (
        <Component
          href={href}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </Component>
      );
    },
    // Custom image component using Next.js Image
    img: ({ src = "", alt = "" }) => (
      <div className="relative w-full h-[400px] my-8">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    ),
    // Custom code blocks
    pre: ({ children }) => (
      <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
    // Custom blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 text-sm text-neutral-800 dark:text-neutral-200">
        {children}
      </td>
    ),
    // Merge with any custom components passed in
    ...components,
  };
}
