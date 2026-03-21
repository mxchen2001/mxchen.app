import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

export type { App, WorkItem, ProjectItem, SemesterItem, BlogItem, TimelineData };

interface App {
  emoji: string;
  name: string;
  url: string;
}

interface WorkItem {
  title: string;
  desc: string;
  date: string;
  end: string; // date string or "present"
}

interface ProjectItem {
  name: string;
  desc: string;
  link: string;
  keywords: string[];
  date: string;
  archived?: boolean;
  difficulty?: number; // 1–4, rendered as phone signal bars
}

interface SemesterItem {
  semester: string;
  date: string;
  classes: {
    name: string;
    code: string;
    professor: string;
    difficulty: number;
  }[];
}

interface BlogItem {
  title: string;
  desc: string;
  url: string;
  date: string;
}

interface TimelineData {
  apps: App[];
  work: WorkItem[];
  projects: ProjectItem[];
  school_projects: ProjectItem[];
  school: SemesterItem[];
  blog: BlogItem[];
}

export function loadTimelineData(): TimelineData {
  const file = readFileSync(
    join(process.cwd(), "src/data/timeline.yaml"),
    "utf-8"
  );
  return parse(file) as TimelineData;
}
