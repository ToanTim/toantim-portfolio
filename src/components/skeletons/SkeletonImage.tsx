/**
 * Skeleton Image Component
 * For loading states of images and thumbnails
 */

import SkeletonBase from "./SkeletonBase";

interface SkeletonImageProps {
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "custom";
  rounded?: boolean;
}

export default function SkeletonImage({
  className = "",
  aspectRatio = "video",
  rounded = true,
}: SkeletonImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    custom: "",
  };

  return (
    <SkeletonBase
      className={`w-full ${aspectClasses[aspectRatio]} ${className}`}
      variant={rounded ? "rounded" : "default"}
    />
  );
}
