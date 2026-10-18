"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import type { Resource } from "@/lib/types";
export default function Palette({ items }: { items: Resource[] }) {
  const [open, setOpen] = useState(false); const [q, setQ] = useState(""); const ref = useRef<HTMLInputElement>(null); const router = useRouter();
  const fuse = useMemo(() => new Fuse(items, { keys: ["title","subject","folder","tags","year"], threshold: 0.35 }), [items]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(o => !o); } if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => { if (open) ref.current?.focus(); }, [open]);
  if (!open) return null;
  const hits = q ? fuse.search(q, { limit: 8 }).map(r => r.item) : [];
  return (<div className="no-print fixed inset-0 z-50 bg-black/20 pt-[15vh]" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Recherche">
    <div className="mx-auto max-w-xl rounded-xl border border-zinc-200 bg-white shadow-xl" onClick={e => e.stopPropagation()}>
      <div className="flex items-center gap-2 border-b border-zinc-100 px-3"><Search size={16} strokeWidth={1.5} className="text-mute" />
        <input ref={ref} value={q} onChange={e => setQ(e.target.value)} placeholder="Titre, matière, année, mot-clé" className="h-12 w-full outline-none text-sm" /></div>
      <ul className="max-h-80 overflow-auto p-1">
        {hits.map(r => (<li key={r.id}><button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-zinc-50"
          onClick={() => { setOpen(false); router.push(`/${r.subject}?folder=${r.folder}&q=${encodeURIComponent(r.title)}`); }}>
          <span className="text-ink">{r.title}</span><span className="ml-2 text-xs text-mute">{r.subject} / {r.folder}</span></button></li>))}
        {q && !hits.length && <li className="px-3 py-6 text-center text-sm text-mute">Aucun résultat pour « {q} ». Essayez une année ou une matière.</li>}
      </ul></div></div>);
}
