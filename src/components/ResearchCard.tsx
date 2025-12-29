interface ResearchCardProps {
  title: string;
  description: string;
  tags: string[];
  borderColor: string;
  tagColor: string;
  onClick?: () => void;
}

export default function ResearchCard({
  title,
  description,
  tags,
  borderColor,
  tagColor,
  onClick,
}: ResearchCardProps) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${borderColor} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs ${tagColor} px-3 py-1 rounded-full`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
