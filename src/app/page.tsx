const projects = [
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
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="flex flex-row gap-8 items-center">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
className="flex items-center justify-center w-16 h-16 rounded-full text-2xl hover:scale-110 transition-all cursor-pointer drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          >
            <span className="text-2xl">{p.emoji}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
