"use client";

import { useState } from "react";
import type { App } from "@/data/loader";

export default function AppGrid({ apps }: { apps: App[] }) {
  const [pending, setPending] = useState<App | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-px bg-white/20 border-2 border-white/20">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.confirm ? undefined : app.url}
            {...(!app.confirm && app.url.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={
              app.confirm
                ? (e) => {
                    e.preventDefault();
                    setPending(app);
                  }
                : undefined
            }
            className="bg-black flex flex-col items-center justify-center w-28 h-28 hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            <span className="text-3xl">{app.emoji}</span>
            <span className="text-[10px] uppercase tracking-widest mt-2">
              {app.name}
            </span>
          </a>
        ))}
      </div>

      {pending && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          onClick={() => setPending(null)}
        >
          <div
            className="border border-white/20 bg-black px-8 py-6 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-white/70 mb-6">{pending.confirm}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPending(null)}
                className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors cursor-pointer px-4 py-2 border border-white/20"
              >
                cancel
              </button>
              <a
                href={pending.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPending(null)}
                className="text-[10px] uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-colors px-4 py-2 border border-white/40"
              >
                continue
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
