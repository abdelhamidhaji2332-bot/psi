import Link from "next/link";
import { SUBJECTS } from "@/lib/types";

export default function Home() {
  const tipeSites = [
    { name: "SCEI Concours", url: "https://www.scei-concours.fr/tipe.html" },
    { name: "TipeShare", url: "https://tipeshare.com/" },
    { name: "CPGE Paradise", url: "https://cpge-paradise.com/TIPEex.php" },
    { name: "E-learning CPGE", url: "https://www.elearning-cpge.com/exemples-tipe-mcot-presentation/" },
    { name: "Micro Planet", url: "https://www.micro-planet.ma/" },
    { name: "ScienceDirect", url: "https://www.sciencedirect.com" },
  ];

  return (
    <div className="relative">
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight leading-tight">
        CPGE PSI Morocco <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">Resources</span>
      </h1>
      <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 text-center max-w-xl font-normal mx-auto">
        Access premium academic materials, past exams, and courses for the PSI track.
      </p>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
        {Object.entries(SUBJECTS).map(([k, v]) => (
          <li key={k}>
            <Link href={`/${k}`} className="resource-card group block">
              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{v.label}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{v.topics}</p>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">TIPE Sites Importants</h2>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
        {tipeSites.map((site) => (
          <li key={site.url}>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="resource-card group block">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">{site.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{site.url.replace(/^https?:\/\//, '')}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
