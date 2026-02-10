import type { Metadata } from "next";
import PaperReadingsPage from "../../components/paper-readings/PaperReadingsPage";

export const metadata: Metadata = {
  title: "Paper Readings | Toan Tran (Tim)",
  description:
    "Research paper readings with Notion summaries, reflections, and key takeaways.",
};

export default function Page() {
  return <PaperReadingsPage />;
}
