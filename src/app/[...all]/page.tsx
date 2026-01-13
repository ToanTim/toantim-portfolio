"use client"; // important for useRouter

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CatchAllPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-cyan-400 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          404:Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
          This page doesn't exist. Don't worry, Toan Tran is redirecting you to
          the homepage.
        </p>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-[slideInRight_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Status Text */}
        <p className="text-sm text-gray-400">Redirecting in a moment...</p>
      </div>
    </div>
  );
}
