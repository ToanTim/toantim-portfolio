import type { Paper } from "@/types/types";

export const paperReadings: Paper[] = [
  {
    id: "mamba-linear-time-sequence-modeling",
    title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    authors: "Albert Gu, Tri Dao, et al.",
    venue: "ICML",
    year: 2024,
    category: "Sequence Models",
    readDate: "2026-02-10",
    summary:
      "Introduced Mamba, a selective state space model that achieves linear-time sequence modeling, avoiding quadratic attention while maintaining strong long-context performance and hardware efficiency.",
    tags: ["State Space Models", "Sequence Modeling", "Mamba", "Efficient AI"],
    notionUrl:
      "https://www.notion.so/Mamba-1-2026-30261d4f0a8043a80cfa97b8d6be3f?source=copy_link",
    paperUrl: "https://arxiv.org/abs/2312.00752",
  }
];
