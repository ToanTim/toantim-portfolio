/**
 * Project Card Skeleton
 * Matches the exact structure of project cards in /projects page
 */

import SkeletonCard from "./SkeletonCard";

export default function ProjectCardSkeleton() {
  return (
    <SkeletonCard
      hasImage={true}
      imageHeight="h-48"
      textLines={2}
      hasTags={true}
      className="bg-gray-50 dark:bg-gray-800"
    />
  );
}
