/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Include workspace packages
    "../../packages/components/table/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/components/slide-overs/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
