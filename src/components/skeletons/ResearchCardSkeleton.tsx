/**
 * Research Card Skeleton
 * Matches the structure of ResearchCard component
 */

import SkeletonBase from "./SkeletonBase";
import SkeletonText from "./SkeletonText";

interface ResearchCardSkeletonProps {
  borderColor?: string;
}

export default function ResearchCardSkeleton({
  borderColor = "border-gray-300",
}: ResearchCardSkeletonProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 ${borderColor}`}
    >
      {/* Title skeleton */}
      <SkeletonBase className="h-7 w-2/3 mb-4" />

      {/* Description skeleton */}
      <SkeletonText lines={2} lineHeight="sm" className="mb-3" />

      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mt-4">
        <SkeletonBase className="h-6 w-24" variant="rounded" />
        <SkeletonBase className="h-6 w-20" variant="rounded" />
        <SkeletonBase className="h-6 w-28" variant="rounded" />
      </div>
    </div>
  );
}
