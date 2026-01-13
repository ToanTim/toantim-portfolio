"use client";

import { useState, useEffect } from "react";
import { ImageSwiperProps } from "@/types/types";

export default function ImageSwiper({
  images,
  title,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ImageSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlayEnabled || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlayEnabled, images.length, autoPlayInterval]);

  // If only one image, show it without swiper controls
  if (images.length <= 1) {
    return (
      <div className="mt-6 bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <img
          src={images[0]}
          alt={`${title} preview`}
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </div>
    );
  }

  // Multiple images - show swiper
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlayEnabled(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlayEnabled(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlayEnabled(false);
  };

  return (
    <div className="mt-6 bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
      <div className="relative">
        {/* Main Image */}
        <img
          src={images[currentIndex]}
          alt={`${title} preview ${currentIndex + 1}`}
          className="w-full rounded-lg shadow-lg object-cover"
        />

        {/* Left Navigation Arrow - Hidden on mobile, visible on tablet+ */}
        <button
          onClick={handlePrevious}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full items-center justify-center text-white transition z-10 group"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6 group-hover:-translate-x-0.5 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Navigation Arrow - Hidden on mobile, visible on tablet+ */}
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full items-center justify-center text-white transition z-10 group"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6 group-hover:translate-x-0.5 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Bottom Navigation Dots - Always visible */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-cyan-500 w-8"
                  : "bg-gray-400 hover:bg-gray-300 w-2 hover:w-3"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Image Counter - Visible on all devices */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 rounded-full text-white text-sm font-medium backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Mobile-only bottom controls */}
      <div className="sm:hidden flex justify-between items-center gap-3 mt-4">
        <button
          onClick={handlePrevious}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition"
          aria-label="Previous image"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition"
          aria-label="Next image"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
