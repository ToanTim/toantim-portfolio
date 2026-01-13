/**
 * Base Skeleton Component
 * Reusable foundation for all skeleton loaders
 */

interface SkeletonBaseProps {
  className?: string;
  variant?: "default" | "rounded" | "circle";
  animate?: boolean;
}

export default function SkeletonBase({
  className = "",
  variant = "default",
  animate = true,
}: SkeletonBaseProps) {
  const variantClasses = {
    default: "rounded",
    rounded: "rounded-lg",
    circle: "rounded-full",
  };

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 ${
        animate ? "animate-pulse" : ""
      } ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}
