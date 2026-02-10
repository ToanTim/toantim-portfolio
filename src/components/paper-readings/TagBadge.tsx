interface TagBadgeProps {
  label: string;
}

export default function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full">
      {label}
    </span>
  );
}
