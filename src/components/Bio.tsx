export default function Bio() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8">
      <h2 className="text-3xl text-center">mxchen</h2>
      <div className="flex justify-center gap-6 text-sm">
        <a target="_blank" rel="noopener noreferrer" href="https://www.silicon-notes.blog/">
          silicon-notes
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/mxchen2001">
          github
        </a>
      </div>
      <p className="text-center text-white/60 max-w-md">
        Hi, my name is michael. I&apos;m a software engineer at{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://careers.roblox.com/">
          Roblox
        </a>{" "}
        in San Francisco. The "x" from mxchen comes from 熙舸 
        {" "}<span className="italic">/xi-ge/</span>.
      </p>
    </div>
  );
}
