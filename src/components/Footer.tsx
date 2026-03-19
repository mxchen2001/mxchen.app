"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

function Counter() {
  const magic = 1691348400000;
  const [counter, setCounter] = useState(
    Math.floor((new Date().getTime() - magic) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>Its been: {counter}</span>;
}

const DynamicCounter = dynamic(() => Promise.resolve(Counter), {
  ssr: false,
});

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 px-4">
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/40">
        <div className="flex flex-col items-center md:items-end gap-1">
          <span>Living in SF</span>
          <DynamicCounter />
        </div>
        <div className="flex items-center justify-center md:justify-start">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/mxchen2001"
            className="text-white/40 hover:text-white/70"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
