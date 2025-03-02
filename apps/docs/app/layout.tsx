import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Nila UI",
  description: "Nila UI is a UI library for building modern web applications.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50"
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
