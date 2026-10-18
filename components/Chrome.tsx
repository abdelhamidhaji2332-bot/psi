import Link from "next/link";
import { MessageCircle } from "lucide-react";
export const CREDIT = "CREATED BY ABDELHAMID HAJI — CID SUPERVISOR";

export function Header() {
  return (
    <header className="relative z-30 w-full px-6 py-4 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm flex items-center justify-center p-1.5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <g fill="none" stroke="#0284c7" stroke-width="5" stroke-linejoin="round">
              <polygon points="50,6 64,36 94,50 64,64 50,94 36,64 6,50 36,36" stroke="#0ea5e9"/>
              <rect x="26" y="26" width="48" height="48" rx="6" stroke="#0369a1" transform="rotate(45 50 50)"/>
              <path d="M30 65 Q 50 55 50 40 Q 50 55 70 65" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
              <line x1="50" y1="40" x2="50" y2="65" stroke="#0284c7" stroke-width="4"/>
            </g>
          </svg>
        </div>
        <Link href="/" className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
          CPGE PSI MAROC
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Placeholder for Search - would need to integrate with global search */}
        <button id="themeToggle" aria-label="Toggle Theme" className="w-12 h-6 rounded-full bg-slate-900 dark:bg-slate-800 p-0.5 flex items-center transition-colors relative">
          <span className="w-5 h-5 rounded-full bg-white dark:bg-sky-400 shadow-sm flex items-center justify-center transform transition-transform duration-300 translate-x-0 dark:translate-x-6 text-[10px]">🌙</span>
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative z-20 py-4 px-6 border-t border-slate-200/60 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
      <div>
        © 2026 CPGE PSI MAROC | <span className="font-medium text-slate-700 dark:text-slate-300">{CREDIT}</span>
      </div>
      <a href="https://wa.me/212601898477" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 shadow-sm text-xs font-mono text-slate-700 dark:text-slate-300 transition-all">
        <span className="inline-flex h-3 w-4.5 overflow-hidden rounded-sm ring-1 ring-black/10 items-center justify-center bg-[#C1272D]">
          <svg viewBox="0 0 24 16" className="w-full h-full">
            <rect width="24" height="16" fill="#C1272D" />
            <polygon points="12,4 13.5,8.8 18.2,8.8 14.4,11.6 15.8,16.2 12,13.4 8.2,16.2 9.6,11.6 5.8,8.8 10.5,8.8" fill="none" stroke="#006233" stroke-width="1.2" />
          </svg>
        </span>
        <span>WhatsApp: +212 601 898 477</span>
      </a>
    </footer>
  );
}
