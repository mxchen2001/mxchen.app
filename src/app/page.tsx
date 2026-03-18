const apps = [
  {
    emoji: "✈️",
    name: "Compensair",
    url: "/compensair",
  },
  {
    emoji: "💳",
    name: "cc-fyi",
    url: "/cc-fyi",
  },
  {
    emoji: "📄",
    name: "reresume",
    url: "/reresume",
  },
  {
    emoji: "🧠",
    name: "Silicon Notes",
    url: "https://www.silicon-notes.blog/",
  },
  {
    emoji: "🍜",
    name: "Umami",
    url: "https://www.umamilabs.app/",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center px-4">
      <h1 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
        mxchen.app
      </h1>
      <div className="grid grid-cols-3 gap-px bg-white/20 border-2 border-white/20">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            {...(app.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
        only shipped, never perfected
      </p>
    </div>
  );
}
