"use client";

import Navbar from "@/components/Navbar";
import TimelineItem, {
  TimelineItemProps,
  TimelineItemType,
} from "@/components/TimelineItem";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface TimelineEntry extends Omit<TimelineItemProps, "align"> {}

const items: TimelineEntry[] = [
  {
    title: "Gesture Project (Self-employed)",
    subtitle: "Independent Project",
    date: "2026 — Present",
    description:
      "Developing a gesture recognition system using signal processing and machine learning. Focused on real-time performance, robustness to noise, and deployment on edge devices.",
    type: "project",
    icon: "Sparkles",
    tags: [
      "Gesture Recognition",
      "Signal Processing",
      "Machine Learning",
      "Real-time Systems",
      "Edge Deployment/MLOps",
      "Coputer Vision",
    ],
  },
  {
    title: "M.Sc. Signal Processing & Machine Learning",
    subtitle: "Tampere University",
    date: "2024 — Present",
    description:
      "Focusing on statistical signal processing, time-series modeling, and deployment of ML systems that respect latency and hardware constraints.",
    type: "education",
    icon: "GraduationCap",
    tags: [
      "Signal Processing",
      "Time-Series",
      "Probabilistic Models",
      "Optimization",
    ],
  },
  {
    title: "Integrify ©",
    subtitle: "Full Stack Web Development, Computer Science",
    date: "Jan 2024 — Sep 2024",
    description:
      "Completed full stack web development training with a strong focus on practical projects, teamwork, and software engineering best practices.",
    type: "education",
    icon: "GraduationCap",
    tags: [
      "Node.js",
      "Full Stack Development",
      "Teamwork",
      "Software Engineering",
      "Problem Solving",
    ],
  },

  {
    title: "Intern Full-stack Developer",
    subtitle: "Commu App · Part-time",
    date: "May 2023 — Sep 2023",
    description:
      "Built and optimized a mobile UI using React Native, and developed backend APIs with PHP, Laravel, GraphQL, and Lighthouse. Worked in a team on full development lifecycle including deployment.",
    type: "internship",
    icon: "Briefcase",
    tags: ["React Native", "PHP", "Laravel", "GraphQL", "API Development"],
  },
  {
    title: "Humanoid Robot Pepper – Application Development Intern",
    subtitle: "Tampere University of Applied Sciences · Internship",
    date: "May 2021 — Aug 2021",
    description:
      "Developed interactive behaviors for Pepper using Kotlin, enabling communication with humans and performing basic motions like hand waving and dancing.",
    type: "internship",
    icon: "Robot",
    tags: [
      "Kotlin",
      "Human-Robot Interaction",
      "Robotics",
      "Behavior Programming",
    ],
  },
  {
    title: "Bachelor of Engineering in Software Engineering",
    subtitle: "Tampere University of Applied Sciences (TAMK)",
    date: "2020 — 2024",
    description:
      "Completed coursework in software engineering fundamentals, algorithms, and system design.",
    type: "education",
    icon: "GraduationCap",
    tags: ["Software Engineering", "Algorithms", "System Design"],
  },
];

const sideForType = (type: TimelineItemType) =>
  type === "education" ? "left" : "right";

export default function TimelinePage() {
  const groupedItems = useMemo(() => {
    const groups: {
      date: string;
      left: TimelineEntry[];
      right: TimelineEntry[];
    }[] = [];
    const indexByDate = new Map<string, number>();

    items.forEach((item) => {
      const dateKey = item.date;
      let groupIndex = indexByDate.get(dateKey);

      if (groupIndex === undefined) {
        groups.push({ date: dateKey, left: [], right: [] });
        groupIndex = groups.length - 1;
        indexByDate.set(dateKey, groupIndex);
      }

      const side = sideForType(item.type);
      const targetGroup = groups[groupIndex];

      if (side === "left") {
        targetGroup.left.push(item);
      } else {
        targetGroup.right.push(item);
      }
    });

    return groups;
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 text-slate-50">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 md:pt-20 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Timeline
          </p>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Learning, building, and shipping over time
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-300">
            A quick look at the education that grounds me, the internships and
            roles that shaped my craft, and the experiments that keep me
            curious.
          </p>
        </motion.div>

        <div className="relative mt-14 md:mt-16">
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-slate-700/60 to-cyan-400/60 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <div className="space-y-12 md:space-y-16">
            {groupedItems.map((group, groupIndex) => (
              <div
                key={`${group.date}-${groupIndex}`}
                className="relative grid grid-cols-[auto_1fr] items-start gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10"
              >
                <div className="hidden md:flex flex-col gap-6">
                  {group.left.map((item, index) => (
                    <TimelineItem
                      key={`${item.title}-left-${index}`}
                      {...item}
                      align="right"
                    />
                  ))}
                </div>

                <div
                  className="relative flex flex-col items-center pt-1 md:pt-2"
                  aria-hidden
                >
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <span className="hidden md:flex h-5 w-5 items-center justify-center rounded-full border-4 border-slate-950 bg-white shadow-lg ring-4 ring-cyan-300/40" />
                    <span className="hidden rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 md:inline">
                      {group.date}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col gap-6 md:col-start-3">
                  {group.right.map((item, index) => (
                    <TimelineItem
                      key={`${item.title}-right-${index}`}
                      {...item}
                      align="left"
                    />
                  ))}
                </div>

                <div className="md:hidden col-span-2 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border-4 border-slate-900 bg-white shadow-lg ring-4 ring-cyan-300/40" />
                    <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                      {group.date}
                    </span>
                  </div>
                  {[...group.left, ...group.right].map((item, index) => (
                    <TimelineItem
                      key={`${item.title}-mobile-${index}`}
                      {...item}
                      align="left"
                      hideDot={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
