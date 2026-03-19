import Portfolio from "@/components/Portfolio";
import { loadTimelineData } from "@/data/loader";

export default function Home() {
  const data = loadTimelineData();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <h1 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
        mxchen.app
      </h1>
      <div className="grid grid-cols-3 gap-px bg-white/20 border-2 border-white/20">
        {data.apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            {...(app.url.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="bg-black flex flex-col items-center justify-center w-28 h-28 hover:bg-white hover:text-black transition-colors"
          >
            <span className="text-3xl">{app.emoji}</span>
            <span className="text-[10px] uppercase tracking-widest mt-2">
              {app.name}
            </span>
          </a>
        ))}
      </div>
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
