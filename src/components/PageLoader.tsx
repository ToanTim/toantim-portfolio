"use client";

import React, { useEffect, useState } from "react";

interface PageLoaderProps {
  videoSrc: string;
  duration?: number;
  loadingText?: string;
  isVisible?: boolean;
  onLoadingComplete?: () => void;
}

/**
 * PageLoader Component
 *
 * A reusable fullscreen loading overlay component that displays a video
 * with a blurred background. Shows for a specified duration, then fades out.
 *
 * @param videoSrc - URL or path to the video file (required)
 * @param duration - Duration in milliseconds to show the loader (default: 5000ms)
 * @param loadingText - Optional text to display below the video (default: "Loading...")
 * @param isVisible - Control visibility from parent (default: true)
 * @param onLoadingComplete - Callback fired when loader completes
 */
export default function PageLoader({
  videoSrc,
  duration = 5000,
  loadingText = "Loading...",
  isVisible = true,
  onLoadingComplete,
}: PageLoaderProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsFadingOut(true);
      const fadeTimer = setTimeout(() => {
        setShouldRender(false);
        setIsFadingOut(false);
      }, 500); // Match the fade-out duration
      return () => clearTimeout(fadeTimer);
    }

    setShouldRender(true);
    setIsFadingOut(false);

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const fadeOutTimer = setTimeout(() => {
        setShouldRender(false);
        onLoadingComplete?.();
      }, 500); // Fade-out duration
      return () => clearTimeout(fadeOutTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isVisible, onLoadingComplete]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Page loading"
      aria-live="polite"
    >
      {/* Blurred Background Video */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "blur(40px)",
            transform: "scale(1.1)",
          }}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 sm:px-6 md:px-8">
        {/* Clear Video Container */}
        <div
          className={`aspect-square w-72 overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 sm:w-80 md:w-96 lg:w-[32rem] xl:w-[40rem] 2xl:w-[48rem] ${
            isFadingOut ? "scale-95" : "scale-100"
          }`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Loading Text */}
        {loadingText && (
          <p
            className={`animate-pulse text-center text-sm font-medium text-white drop-shadow-lg transition-opacity duration-500 sm:text-base ${
              isFadingOut ? "opacity-0" : "opacity-100"
            }`}
            aria-live="assertive"
          >
            {loadingText}
          </p>
        )}
      </div>
    </div>
  );
}
