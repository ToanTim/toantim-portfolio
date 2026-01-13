/**
 * Projects Grid Skeleton
 * Full page skeleton for projects listing
 */

import ProjectCardSkeleton from "./ProjectCardSkeleton";

interface ProjectsGridSkeletonProps {
  count?: number;
}

export default function ProjectsGridSkeleton({
  count = 6,
}: ProjectsGridSkeletonProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Title skeleton */}
      <div className="flex justify-center mb-12">
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Array.from({ length: count }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
