import type {
  WorkItem,
  ProjectItem,
  SemesterItem,
  BlogItem,
} from "@/data/loader";
import { normalizeDate, dateYear } from "@/data/utils";

type TimelineItem = {
  sortKey: string;
  side: "left" | "right";
} & (
  | { type: "work"; title: string; desc: string; start: string; end: string }
  | { type: "semester"; semester: string; classes: SemesterItem["classes"] }
  | { type: "project"; project: ProjectItem }
  | { type: "school-project"; project: ProjectItem }
  | { type: "blog"; blog: BlogItem }
);

type TimelineEntry = {
  year: string;
  yearNum: number;
  items: TimelineItem[];
};

const accent = {
  work: "border-white/80",
  project: "border-emerald-700/60",
  "school-project": "border-amber-500/50",
  semester: "border-amber-500/50",
  blog: "border-purple-400/60",
} as const;

const dot = {
  work: "bg-white",
  project: "triangle-emerald",
  "school-project": "triangle-amber",
  semester: "bg-amber-500",
  blog: "bg-purple-400",
} as const;

const typeLabelText = {
  work: "work",
  project: "project",
  "school-project": "school",
  semester: "coursework",
  blog: "reading",
} as const;

const labelColor = {
  work: "text-white/50",
  project: "text-emerald-700/50",
  "school-project": "text-amber-500/50",
  semester: "text-amber-500/50",
  blog: "text-purple-400/50",
} as const;

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateLabel(d: string): string {
  if (d === "present") return "Present";
  const parts = d.split("-");
  if (parts.length === 1) return parts[0];
  const month = monthNames[parseInt(parts[1], 10) - 1];
  return `${month} '${parts[0].slice(2)}`;
}

function buildTimeline(
  work: WorkItem[],
  projects: ProjectItem[],
  schoolProjects: ProjectItem[],
  school: SemesterItem[],
  blog: BlogItem[]
): TimelineEntry[] {
  const all: TimelineItem[] = [
    ...work.map((w) => ({
      type: "work" as const,
      title: w.title,
      desc: w.desc,
      start: w.date,
      end: w.end,
      side: "left" as const,
      sortKey: normalizeDate(w.date),
    })),
    ...projects.map((p) => ({
      type: "project" as const,
      project: p,
      side: "right" as const,
      sortKey: normalizeDate(p.date),
    })),
    ...schoolProjects.map((p) => ({
      type: "school-project" as const,
      project: p,
      side: "left" as const,
      sortKey: normalizeDate(p.date),
    })),
    ...school.map((s) => ({
      type: "semester" as const,
      semester: s.semester,
      classes: s.classes,
      side: "left" as const,
      sortKey: normalizeDate(s.date),
    })),
    ...blog.map((b) => ({
      type: "blog" as const,
      blog: b,
      side: "right" as const,
      sortKey: normalizeDate(b.date),
    })),
  ];

  all.sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  const yearMap = new Map<string, TimelineItem[]>();
  for (const item of all) {
    const year = dateYear(item.sortKey);
    if (!yearMap.has(year)) yearMap.set(year, []);
    yearMap.get(year)!.push(item);
  }

  const entries: TimelineEntry[] = [];
  const sortedYears = [...yearMap.keys()].sort((a, b) => Number(b) - Number(a));
  for (let i = 0; i < sortedYears.length; i++) {
    const year = sortedYears[i];
    const label = i === 0 ? `${year} — Present` : year;
    entries.push({ year: label, yearNum: Number(year), items: yearMap.get(year)! });
  }

  return entries;
}

function ItemCard({ item }: { item: TimelineItem }) {
  const tl = typeLabelText[item.type];

  if (item.type === "work") {
    return (
      <div className={`border-l-2 ${accent[item.type]} pl-3 py-1`}>
        {tl && (
          <span className={`text-[9px] uppercase tracking-widest ${labelColor[item.type]} mb-1 block`}>
            {tl}
          </span>
        )}
        <p className="text-sm font-bold text-white/80">{item.title}</p>
        <p className="text-xs text-white/60">{item.desc}</p>
        <p className="text-xs text-white/60 mt-0.5">
          {formatDateLabel(item.start)} → {formatDateLabel(item.end)}
        </p>
      </div>
    );
  }

  if (item.type === "semester") {
    return (
      <div className={`border-l-2 ${accent[item.type]} pl-3 py-1`}>
        {tl && (
          <span className={`text-[9px] uppercase tracking-widest ${labelColor[item.type]} mb-1 block`}>
            {tl}
          </span>
        )}
        <p className="text-sm text-white/80 font-bold mb-1">{item.semester}</p>
        <div className="flex flex-col gap-0.5">
          {item.classes.map((cls, j) => (
            <span key={j} className="text-xs text-white/60">
              {cls.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "project" || item.type === "school-project") {
    const archived = item.project.archived;
    return (
      <div className={`border-l-2 ${accent[item.type]} pl-3 py-1 ${archived ? "opacity-50" : ""}`}>
        <div className="flex items-center gap-2 mb-1">
          {tl && (
            <span className={`text-[9px] uppercase tracking-widest ${labelColor[item.type]}`}>
              {tl}
            </span>
          )}
          {archived && (
            <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 border border-white/20 text-white/40 rounded">
              archived
            </span>
          )}
        </div>
        <a
          href={item.project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-bold ${archived ? "text-white/50 line-through decoration-white/30" : "text-white/80 hover:text-white"}`}
        >
          {item.project.name}
        </a>
        <p className="text-xs text-white/60 mt-0.5">{item.project.desc}</p>
      </div>
    );
  }

  if (item.type === "blog") {
    return (
      <div className={`border-l-2 ${accent[item.type]} pl-3 py-1`}>
        {tl && (
          <span className={`text-[9px] uppercase tracking-widest ${labelColor[item.type]} mb-1 block`}>
            {tl}
          </span>
        )}
        <a
          href={item.blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-white/80 hover:text-white"
        >
          {item.blog.title}
        </a>
        <p className="text-xs text-white/60 mt-0.5">{item.blog.date}</p>
      </div>
    );
  }
}

export default function Timeline({
  work,
  projectData,
  schoolProjectsData,
  schoolData,
  blogData,
}: {
  work: WorkItem[];
  projectData: ProjectItem[];
  schoolProjectsData: ProjectItem[];
  schoolData: SemesterItem[];
  blogData: BlogItem[];
}) {
  const timeline = buildTimeline(
    work,
    projectData,
    schoolProjectsData,
    schoolData,
    blogData
  );

  return (
    <div className="mt-10 w-full max-w-3xl mx-auto">
      {/* Legend */}
      <div className="flex flex-col items-center gap-2 mb-8 text-[9px] uppercase tracking-widest text-white/30">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white inline-block" /> work
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-700 inline-block" /> personal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> school
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" /> reading
          </span>
        </div>
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/40 inline-block" /> general
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-0 h-0"
              style={{
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderBottom: "6px solid rgba(255,255,255,0.4)",
              }}
            /> project
          </span>
        </div>
      </div>

      {timeline.map((entry) => (
        <div key={entry.year} className="relative">
          {/* Center spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Year marker */}
          <div className="relative flex justify-center mb-4">
            <span className="bg-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50 z-10">
              {entry.year}
            </span>
          </div>

          {/* Items */}
          <div className="pb-6">
            {entry.items.map((item, i) => (
              <div
                key={i}
                className="relative grid grid-cols-[1fr_24px_1fr] items-start mb-3"
              >
                {/* Left content */}
                <div className="flex justify-end pr-4">
                  {item.side === "left" && <ItemCard item={item} />}
                </div>

                {/* Center marker */}
                <div className="flex justify-center pt-1">
                  {dot[item.type].startsWith("triangle") ? (
                    <div
                      className="w-0 h-0 z-10"
                      style={{
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderBottom: `8px solid ${
                          dot[item.type] === "triangle-amber"
                            ? "#f59e0b"
                            : "#047857"
                        }`,
                      }}
                    />
                  ) : (
                    <div
                      className={`w-2 h-2 rounded-full ${dot[item.type]} z-10`}
                    />
                  )}
                </div>

                {/* Right content */}
                <div className="pl-4">
                  {item.side === "right" && <ItemCard item={item} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
