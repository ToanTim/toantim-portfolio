/**
 * Skeleton Text Component
 * For loading states of text content (headings, paragraphs)
 */

import SkeletonBase from "./SkeletonBase";

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: "sm" | "md" | "lg";
}

export default function SkeletonText({
  lines = 3,
  className = "",
  lineHeight = "md",
}: SkeletonTextProps) {
  const heights = {
    sm: "h-3",
    md: "h-4",
    lg: "h-6",
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBase
          key={index}
          className={`${heights[lineHeight]} ${
            index === lines - 1 ? "w-4/5" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}
