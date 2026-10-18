"use client";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { FileText } from "lucide-react";
import { FOLDERS, type Folder, type Resource } from "@/lib/types";
import Viewer from "./Viewer";
export default function Browser({ items, initialQuery, initialFolder }: { items: Resource[]; initialQuery: string; initialFolder: Folder }) {
  const [folder, setFolder] = useState<Folder>(initialFolder); const [q, setQ] = useState(initialQuery);
  const [year, setYear] = useState<number | null>(null); const [type, setType] = useState("all"); const [open, setOpen] = useState<Resource | null>(null);
  const fuse = useMemo(() => new Fuse(items, { keys: ["title","tags","year","component"], threshold: 0.35 }), [items]);
  const inFolder = items.filter(i => i.folder === folder);
  const years = [...new Set(inFolder.map(i => i.year).filter((y): y is number => y !== undefined))].sort((a, b) => b - a);
  const list = (q ? fuse.search(q).map(r => r.item) : items).filter(i => i.folder === folder && (!year || i.year === year) && (type === "all" || i.ext === type));
  const exts = [...new Set(items.map(i => i.ext))];
  const chip = (on: boolean) => `rounded-full border px-3 py-1 text-xs focus-visible:outline focus-visible:outline-2 ${on ? "border-ink bg-ink text-white" : "border-zinc-200 text-act hover:border-zinc-400"}`;
  const pairs = new Map<string, Resource[]>();
  if (folder === "CNC") list.forEach(r => { const k = `${r.year}-${r.component ?? r.title}`; pairs.set(k, [...(pairs.get(k) ?? []), r]); });
  return (<div>
    <div role="tablist" className="flex flex-wrap gap-2">{FOLDERS.map(f => (
      <button key={f} role="tab" aria-selected={f === folder} className={chip(f === folder)} onClick={() => { setFolder(f); setYear(null); }}>{f}</button>))}</div>
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <input value={q} onChange={e => setQ(e.target.value)} aria-label="Filtrer" placeholder="Filtrer ce dossier" className="h-9 w-full max-w-xs rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400" />
      <select value={type} onChange={e => setType(e.target.value)} aria-label="Type de fichier" className="h-9 rounded-md border border-zinc-200 px-2 text-sm">
        <option value="all">Tous types</option>{exts.map(x => <option key={x} value={x}>{x.toUpperCase()}</option>)}</select></div>
    {years.length > 0 && <div className="mt-3 flex flex-wrap gap-2" aria-label="Chronologie">
      <button className={chip(year === null)} onClick={() => setYear(null)}>Toutes</button>
      {years.map(y => <button key={y} className={chip(year === y)} onClick={() => setYear(y)}>{y}</button>)}</div>}
    <ul className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-200/80 bg-zinc-50/50">
      {folder === "CNC" ? [...pairs.values()].map(g => (<li key={g[0]?.id} className="flex items-center gap-3 px-4 py-3 text-sm">
        <FileText size={16} strokeWidth={1.5} className="text-mute" /><span className="mr-auto">{g[0]?.year} · {g[0]?.component ?? g[0]?.title}</span>
        {g.map(r => <button key={r.id} className={chip(false)} onClick={() => setOpen(r)}>{r.kind === "corrige" ? "Corrigé" : r.kind === "rapport" ? "Rapport" : "Épreuve"}</button>)}</li>))
      : list.map(r => (<li key={r.id}><button onClick={() => setOpen(r)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-white">
        <FileText size={16} strokeWidth={1.5} className="text-mute" /><span className="mr-auto">{r.title}</span>
        <span className="text-xs text-mute">{r.ext.toUpperCase()} · {r.size}</span></button></li>))}
      {!list.length && <li className="px-4 py-10 text-center text-sm text-mute">Aucun fichier. Ajoutez des documents dans public/storage/&lt;matière&gt;/{folder}/.</li>}
    </ul>
    {open && <Viewer file={open} related={items.filter(i => i.folder === open.folder)} onClose={() => setOpen(null)} onOpen={setOpen} />}
  </div>);
}
