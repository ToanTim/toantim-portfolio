/**
 * Project Detail Skeleton
 * For individual project detail pages
 */

import SkeletonBase from "./SkeletonBase";
import SkeletonText from "./SkeletonText";
import SkeletonImage from "./SkeletonImage";

export default function ProjectDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Back button skeleton */}
      <SkeletonBase className="h-10 w-32 mb-8" variant="rounded" />

      {/* Title skeleton */}
      <SkeletonBase className="h-12 w-3/4 mb-6" />

      {/* Description skeleton */}
      <SkeletonText lines={3} lineHeight="md" className="mb-8" />

      {/* Tech tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-8">
        <SkeletonBase className="h-7 w-20" variant="rounded" />
        <SkeletonBase className="h-7 w-24" variant="rounded" />
        <SkeletonBase className="h-7 w-16" variant="rounded" />
        <SkeletonBase className="h-7 w-28" variant="rounded" />
      </div>

      {/* Links skeleton */}
      <div className="flex gap-4 mb-8">
        <SkeletonBase className="h-10 w-32" variant="rounded" />
        <SkeletonBase className="h-10 w-32" variant="rounded" />
      </div>

      {/* Image gallery skeleton */}
      <div className="mt-8">
        <SkeletonBase className="h-8 w-40 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          <SkeletonImage aspectRatio="video" />
          <SkeletonImage aspectRatio="video" />
          <SkeletonImage aspectRatio="video" />
        </div>
      </div>
    </div>
  );
}
