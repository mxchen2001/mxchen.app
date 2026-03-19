"use client";

import { useState } from "react";
import Bio from "@/components/Bio";
import Timeline from "@/components/Timeline";
import type {
  WorkItem,
  ProjectItem,
  SemesterItem,
  BlogItem,
} from "@/data/loader";

interface PortfolioProps {
  work: WorkItem[];
  projectData: ProjectItem[];
  schoolProjectsData: ProjectItem[];
  schoolData: SemesterItem[];
  blogData: BlogItem[];
}

export default function Portfolio({
  work,
  projectData,
  schoolProjectsData,
  schoolData,
  blogData,
}: PortfolioProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors cursor-pointer mt-4"
      >
        about me
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <button
              onClick={() => setOpen(false)}
              className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors cursor-pointer block mx-auto mb-4"
            >
              close
            </button>
            <Bio />
            <Timeline
              work={work}
              projectData={projectData}
              schoolProjectsData={schoolProjectsData}
              schoolData={schoolData}
              blogData={blogData}
            />
          </div>
        </div>
      )}
    </>
  );
}
