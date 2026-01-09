// src/utils/gradients.ts  (or wherever you prefer)

export const GRADIENTS = [
  "from-blue-300 via-sky-400 to-cyan-600",
  "from-indigo-400 via-purple-500 to-pink-600",
  "from-rose-300 via-pink-500 to-fuchsia-700",
  "from-emerald-300 via-teal-400 to-cyan-700",
  "from-amber-300 via-orange-500 to-rose-600",
  "from-violet-400 via-purple-600 to-indigo-700",
  "from-sky-300 via-blue-500 to-indigo-800",
  "from-lime-300 via-green-500 to-emerald-700",
  "from-pink-300 via-rose-500 to-red-600",
  "from-cyan-300 via-blue-500 to-indigo-700",
  "from-purple-300 via-indigo-500 to-blue-800",
  "from-yellow-300 via-amber-500 to-orange-700",
  "from-red-300 via-rose-500 to-pink-700",
  "from-teal-300 via-cyan-500 to-sky-700",
  "from-fuchsia-400 via-pink-600 to-rose-700",
] as const;  // 'as const' makes the array readonly + gives literal types

// Type for better autocomplete & safety
export type Gradient = typeof GRADIENTS[number];

// Function to get random gradient
export const getRandomGradient = (): Gradient => {
  const randomIndex = Math.floor(Math.random() * GRADIENTS.length);
  return GRADIENTS[randomIndex];
};