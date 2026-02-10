import type { Paper } from "@/types/types";
import PaperCard from "./PaperCard";

interface PaperListProps {
  papers: Paper[];
}

export default function PaperList({ papers }: PaperListProps) {
  return (
    <ul className="grid gap-8">
      {papers.map((paper) => (
        <li key={paper.id}>
          <PaperCard paper={paper} />
        </li>
      ))}
    </ul>
  );
}
