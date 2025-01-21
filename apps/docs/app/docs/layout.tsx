import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nila UI Documentation",
  description: "Documentation for Nila UI components",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen">
          {/* Sidebar - We can add navigation here later */}
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 py-12 pr-8">
            <nav className="space-y-1">
              <div className="pb-8">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Getting Started
                </h2>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/docs"
                      className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      Introduction
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Components
                </h2>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/docs/components/table"
                      className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      Table
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/slide-overs"
                      className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      Slide Overs
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Main content */}
          <main className="max-w-7xl flex-1 py-12 px-4 sm:px-6 lg:px-8">
            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-a:no-underline prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-a:text-neutral-900 hover:prose-a:text-neutral-600 dark:prose-a:text-neutral-100 dark:hover:prose-a:text-neutral-400">
              {children}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
