import Navbar from "../Navbar";
import PaperReadingsSection from "./PaperReadingsSection";

export default function PaperReadingsPage() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-20">
        <PaperReadingsSection headingLevel="h1" />
      </main>
    </div>
  );
}
