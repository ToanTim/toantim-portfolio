/**
 * Skeleton Card Component
 * Generic card skeleton for various card layouts
 */

import SkeletonBase from "./SkeletonBase";
import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

interface SkeletonCardProps {
  className?: string;
  hasImage?: boolean;
  imageHeight?: string;
  textLines?: number;
  hasTags?: boolean;
}

export default function SkeletonCard({
  className = "",
  hasImage = true,
  imageHeight = "h-48",
  textLines = 3,
  hasTags = true,
}: SkeletonCardProps) {
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      {hasImage && (
        <div className={`${imageHeight} bg-gray-200 dark:bg-gray-700`}>
          <SkeletonBase className="w-full h-full" variant="default" />
        </div>
      )}
      <div className="p-6">
        {/* Title skeleton */}
        <SkeletonBase className="h-6 w-3/4 mb-4" />

        {/* Text content */}
        <SkeletonText lines={textLines} lineHeight="sm" className="mb-4" />

        {/* Tags skeleton */}
        {hasTags && (
          <div className="flex flex-wrap gap-2">
            <SkeletonBase className="h-6 w-16" variant="rounded" />
            <SkeletonBase className="h-6 w-20" variant="rounded" />
            <SkeletonBase className="h-6 w-14" variant="rounded" />
          </div>
        )}
      </div>
    </div>
  );
}
