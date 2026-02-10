"use client";

import { useEffect, useMemo, useState } from "react";
import PaperList from "./PaperList";
import { paperReadings } from "@/data/paperReadings";

interface PaperReadingsSectionProps {
  headingLevel?: "h1" | "h2";
}

export default function PaperReadingsSection({
  headingLevel = "h1",
}: PaperReadingsSectionProps) {
  const TitleTag = headingLevel;
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);

  const getReadYear = (dateValue: string) => {
    const parsed = new Date(dateValue);
    return Number.isNaN(parsed.getTime())
      ? String(new Date().getFullYear())
      : String(parsed.getFullYear());
  };

  useEffect(() => {
    setVisibleCount(3);
  }, [query, selectedTag, selectedCategory, selectedYear]);

  const { tags, categories, years } = useMemo(() => {
    const tagSet = new Set<string>();
    const categorySet = new Set<string>();
    const yearSet = new Set<string>();

    paperReadings.forEach((paper) => {
      paper.tags.forEach((tag) => tagSet.add(tag));
      categorySet.add(paper.category);
      yearSet.add(getReadYear(paper.readDate));
    });

    return {
      tags: Array.from(tagSet).sort(),
      categories: Array.from(categorySet).sort(),
      years: Array.from(yearSet).sort((a, b) => Number(b) - Number(a)),
    };
  }, []);

  const filteredPapers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return paperReadings
      .filter((paper) =>
        normalizedQuery
          ? [paper.title, paper.authors, paper.summary, paper.venue]
              .join(" ")
              .toLowerCase()
              .includes(normalizedQuery)
          : true,
      )
      .filter((paper) =>
        selectedTag === "all" ? true : paper.tags.includes(selectedTag),
      )
      .filter((paper) =>
        selectedCategory === "all" ? true : paper.category === selectedCategory,
      )
      .filter((paper) =>
        selectedYear === "all"
          ? true
          : getReadYear(paper.readDate) === selectedYear,
      )
      .sort(
        (a, b) =>
          new Date(b.readDate).getTime() - new Date(a.readDate).getTime() ||
          a.title.localeCompare(b.title),
      );
  }, [query, selectedTag, selectedCategory, selectedYear]);

  const visiblePapers = filteredPapers.slice(0, visibleCount);
  const groupedByYear = useMemo(() => {
    return visiblePapers.reduce<Record<string, typeof visiblePapers>>(
      (acc, paper) => {
        const key = getReadYear(paper.readDate);
        if (!acc[key]) acc[key] = [];
        acc[key].push(paper);
        return acc;
      },
      {},
    );
  }, [visiblePapers]);

  const yearGroups = Object.keys(groupedByYear).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="max-w-4xl mx-auto text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-500">
          Reading Notes
        </p>
        <TitleTag className="text-4xl md:text-6xl font-bold text-gray-800">
          Paper Readings & Reflections
        </TitleTag>
        <p className="text-lg text-gray-600">
          A curated list of papers with personal Notion summaries, critical
          takeaways, and practical insights for applied ML and signal
          processing.
        </p>
      </header>

      <div className="max-w-5xl mx-auto mt-12 space-y-8">
        <div className="grid gap-4 md:grid-cols-4 bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Search
            </label>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, author, or venue"
              className="mt-2 w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Search papers"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="mt-2 w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Filter by category"
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Tag
            </label>
            <select
              value={selectedTag}
              onChange={(event) => setSelectedTag(event.target.value)}
              className="mt-2 w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Filter by tag"
            >
              <option value="all">All</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="mt-2 w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Filter by year"
            >
              <option value="all">All</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              Showing {visiblePapers.length} of {filteredPapers.length} papers
            </span>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedTag("all");
                setSelectedCategory("all");
                setSelectedYear("all");
              }}
              className="text-cyan-600 hover:text-cyan-500 transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            No papers match your filters yet.
          </div>
        ) : (
          <div className="space-y-10">
            {yearGroups.map((year) => (
              <section key={year} aria-label={`Papers from ${year}`}>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {year}
                  </h3>
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>
                <PaperList papers={groupedByYear[year]} />
              </section>
            ))}
          </div>
        )}

        {(visiblePapers.length < filteredPapers.length || visibleCount > 3) && (
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {visiblePapers.length < filteredPapers.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 3)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2 rounded-md text-sm font-semibold text-white transition-all duration-300"
              >
                Read more
              </button>
            )}
            {visibleCount > 3 && (
              <button
                type="button"
                onClick={() => setVisibleCount(3)}
                className="border border-gray-200 hover:border-cyan-400 px-6 py-2 rounded-md text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-all duration-300"
              >
                See less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
