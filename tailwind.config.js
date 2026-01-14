/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
  ],

  safelist: [
    // layout & spacing
    "space-y-6",
    "p-4",
    "mt-4",

    // text
    "text-gray-100",
    "text-gray-300",
    "text-lg",
    "text-xl",
    "font-semibold",
    "leading-relaxed",

    // backgrounds & borders
    "bg-gray-700",
    "bg-gray-800",
    "border",
    "border-gray-600",
    "rounded-lg",
    "shadow-md",

    // lists
    "list-disc",
    "list-inside",

    // aspect ratio (YouTube iframe)
    "aspect-w-16",
    "aspect-h-9",

    // Break word to new line
    "break-words",
    "whitespace-normal",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "project-gradient":
          "linear-gradient(to right, #d8b4fe, #818cf8, #1e3a8a)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/aspect-ratio"),
  ],
};
