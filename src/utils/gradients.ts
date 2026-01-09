// src/utils/gradients.ts  (or wherever you prefer)

export const GRADIENTS = [
  "from-blue-400 via-sky-400 to-cyan-500",
  "from-indigo-500 via-purple-500 to-pink-500", // already good
  "from-rose-400 via-pink-500 to-fuchsia-600",
  "from-emerald-400 via-teal-400 to-cyan-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-violet-500 via-purple-500 to-indigo-600",
  "from-sky-400 via-blue-500 to-indigo-600",
  "from-lime-400 via-green-500 to-emerald-600",
  "from-pink-400 via-rose-500 to-red-500",
  "from-cyan-400 via-blue-500 to-indigo-500",
  "from-purple-400 via-indigo-500 to-blue-600",
  "from-yellow-400 via-amber-500 to-orange-600",
  "from-red-400 via-rose-500 to-pink-600",
  "from-teal-400 via-cyan-500 to-sky-600",
  "from-fuchsia-500 via-pink-500 to-rose-600",
] as const;  // 'as const' makes the array readonly + gives literal types

// Type for better autocomplete & safety
export type Gradient = typeof GRADIENTS[number];

// Function to get random gradient
export const getRandomGradient = (): Gradient => {
  const randomIndex = Math.floor(Math.random() * GRADIENTS.length);
  return GRADIENTS[randomIndex];
};