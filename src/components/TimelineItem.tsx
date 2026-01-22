"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LucideIcon,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Cpu,
  Building2,
  Sparkles,
  Beaker,
  Lightbulb,
} from "lucide-react";

export type TimelineItemType =
  | "education"
  | "internship"
  | "work"
  | "experiment"
  | "project";

export interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  type: TimelineItemType;
  icon?: string;
  tags?: string[];
  align?: "left" | "right";
  hideDot?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  FlaskConical,
  Cpu,
  Building2,
  Sparkles,
  Beaker,
  Lightbulb,
};

const fallbackIcon: Record<TimelineItemType, LucideIcon> = {
  education: GraduationCap,
  internship: Briefcase,
  work: Building2,
  experiment: FlaskConical,
  project: Sparkles,
};

const typeStyles: Record<
  TimelineItemType,
  { badge: string; accent: string; border: string; dot: string; pill: string }
> = {
  education: {
    badge: "text-indigo-600 bg-indigo-50",
    accent: "from-indigo-500/15 to-indigo-500/5",
    border: "border-indigo-100/80",
    dot: "bg-indigo-500",
    pill: "border-indigo-200 text-indigo-700",
  },
  internship: {
    badge: "text-emerald-600 bg-emerald-50",
    accent: "from-emerald-500/15 to-emerald-500/5",
    border: "border-emerald-100/80",
    dot: "bg-emerald-500",
    pill: "border-emerald-200 text-emerald-700",
  },
  work: {
    badge: "text-cyan-600 bg-cyan-50",
    accent: "from-cyan-500/15 to-cyan-500/5",
    border: "border-cyan-100/80",
    dot: "bg-cyan-500",
    pill: "border-cyan-200 text-cyan-700",
  },
  experiment: {
    badge: "text-amber-700 bg-amber-50",
    accent: "from-amber-500/15 to-amber-500/5",
    border: "border-amber-100/80",
    dot: "bg-amber-500",
    pill: "border-amber-200 text-amber-800",
  },
  project: {
    badge: "text-purple-600 bg-purple-50",
    accent: "from-purple-500/15 to-purple-500/5",
    border: "border-purple-100/80",
    dot: "bg-purple-500",
    pill: "border-purple-200 text-purple-700",
  },
};

export default function TimelineItem({
  title,
  subtitle,
  date,
  description,
  type,
  icon,
  tags = [],
  align = "left",
  hideDot = false,
}: TimelineItemProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const IconComponent = iconMap[icon ?? ""] ?? fallbackIcon[type] ?? Sparkles;
  const style = typeStyles[type];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border ${style.border} bg-white/80 backdrop-blur shadow-xl`}
      aria-label={`${title} at ${subtitle}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${style.accent}`}
        aria-hidden
      />
      <div className="relative p-6 sm:p-7 md:p-8">
        <div
          className={`flex flex-col gap-3 ${
            align === "right" ? "md:items-end md:text-right" : "md:items-start"
          }`}
        >
          <div className="flex items-start gap-3 md:gap-4">
            {!hideDot && (
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-lg ring-4 ring-white ${style.dot}`}
                aria-hidden
              >
                <IconComponent className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-white/70 px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                  {date}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="text-sm font-medium text-slate-600">{subtitle}</p>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed">{description}</p>

          {tags.length > 0 && (
            <div
              className="flex flex-wrap gap-2"
              aria-label="Related skills and tools"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold shadow-sm ${style.pill}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
