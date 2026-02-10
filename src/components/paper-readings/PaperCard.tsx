import type { Paper } from "@/types/types";
import TagBadge from "./TagBadge";

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <article
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-cyan-500"
      aria-labelledby={`paper-${paper.id}-title`}
    >
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            id={`paper-${paper.id}-title`}
            className="text-2xl font-bold text-gray-800"
          >
            {paper.title}
          </h3>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {paper.category}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {paper.authors} · {paper.venue} · {paper.year}
          <span className="text-gray-400"> · </span>
          <span className="text-gray-500">Read</span>{" "}
          <time dateTime={paper.readDate} className="text-gray-500">
            {paper.readDate}
          </time>
        </p>
      </header>

      <p className="text-gray-600 mt-4 leading-relaxed">{paper.summary}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {paper.tags.map((tag) => (
          <TagBadge key={`${paper.id}-${tag}`} label={tag} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href={paper.notionUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open Notion notes for ${paper.title}`}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-300"
        >
          Notion Notes
        </a>
        <a
          href={paper.paperUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open paper link for ${paper.title}`}
          className="border border-gray-200 hover:border-cyan-400 px-4 py-2 rounded-md text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-all duration-300"
        >
          Paper Link
        </a>
      </div>
    </article>
  );
}
