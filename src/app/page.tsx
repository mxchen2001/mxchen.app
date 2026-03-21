import Portfolio from "@/components/Portfolio";
import AppGrid from "@/components/AppGrid";
import { loadTimelineData } from "@/data/loader";

export default function Home() {
  const data = loadTimelineData();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <h1 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
        mxchen.app
      </h1>
      <AppGrid apps={data.apps} />
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mt-8">
       shipped だけ、perfected じゃない
      </p>

      <Portfolio
        work={data.work}
        projectData={data.projects}
        schoolProjectsData={data.school_projects}
        schoolData={data.school}
        blogData={data.blog}
      />
    </div>
  );
}
