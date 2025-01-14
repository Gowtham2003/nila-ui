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
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800">
            {/* Sidebar content will go here */}
          </div>

          {/* Main content */}
          <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
            <article
              className={
                "prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-a:no-underline"
              }
            >
              {children}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
