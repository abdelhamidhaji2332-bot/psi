"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCw, Printer, Download, Maximize2, ExternalLink } from "lucide-react";
import type { Resource } from "@/lib/types";
const IMG = ["png","jpg","jpeg","webp"];
export default function Viewer({ file, related, onClose, onOpen }: { file: Resource; related: Resource[]; onClose: () => void; onOpen: (r: Resource) => void }) {
  const [zoom, setZoom] = useState(1); const [rot, setRot] = useState(0); const frame = useRef<HTMLIFrameElement>(null); const box = useRef<HTMLDivElement>(null);
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);
  const btn = "rounded-md p-2 text-act hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2";
  const print = () => { try { frame.current?.contentWindow?.print(); } catch { window.print(); } };
  const isImg = IMG.includes(file.ext);
  return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex flex-col bg-white" role="dialog" aria-modal="true" aria-label={file.title}>
    <div className="no-print flex items-center gap-1 border-b border-zinc-100 px-3 py-2">
      <span className="mr-auto truncate text-sm font-medium">{file.title}</span>
      <button className={btn} aria-label="Zoom arrière" onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}><ZoomOut size={18} strokeWidth={1.5} /></button>
      <button className={btn} aria-label="Zoom avant" onClick={() => setZoom(z => Math.min(3, z + 0.25))}><ZoomIn size={18} strokeWidth={1.5} /></button>
      <button className={btn} aria-label="Pivoter" onClick={() => setRot(r => (r + 90) % 360)}><RotateCw size={18} strokeWidth={1.5} /></button>
      <button className={btn} aria-label="Plein écran" onClick={() => box.current?.requestFullscreen?.()}><Maximize2 size={18} strokeWidth={1.5} /></button>
      <button className={btn} aria-label="Imprimer" onClick={print}><Printer size={18} strokeWidth={1.5} /></button>
      <a className={btn} aria-label="Télécharger" href={file.url} download={`${file.title}.${file.ext}`}><Download size={18} strokeWidth={1.5} /></a>
      <a className={btn} aria-label="Ouvrir dans un nouvel onglet" href={file.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} strokeWidth={1.5} /></a>
      <button className={btn} aria-label="Fermer (Échap)" onClick={onClose}><X size={18} strokeWidth={1.5} /></button>
    </div>
    <div className="print-only">CREATED BY ABDELHAMID HAJI — CID SUPERVISOR</div>
    <div className="flex min-h-0 flex-1">
      <div ref={box} className="flex-1 overflow-auto bg-zinc-50">
        <div style={{ transform: `scale(${zoom}) rotate(${rot}deg)`, transformOrigin: "top center", height: "100%" }} className="transition-transform">
          {isImg ? <img src={file.url} alt={file.title} className="mx-auto max-h-full" /> :
            <iframe ref={frame} src={file.url} title={file.title} className="h-full w-full border-0" />}
        </div>
      </div>
      <aside className="no-print hidden w-72 shrink-0 overflow-auto border-l border-zinc-100 p-4 text-sm md:block">
        <dl className="space-y-1 text-xs text-mute"><dt className="text-ink">Chemin</dt><dd>{file.subject} / {file.folder}</dd>
          <dt className="pt-2 text-ink">Fichier</dt><dd>{file.ext.toUpperCase()} · {file.size}</dd>
          <dt className="pt-2 text-ink">Modifié</dt><dd>{new Date(file.modified).toLocaleDateString("fr-FR")}</dd></dl>
        <h3 className="mt-5 text-xs text-ink">Dans le même dossier</h3>
        <ul className="mt-2 space-y-1">{related.filter(r => r.id !== file.id).slice(0, 8).map(r => (
          <li key={r.id}><button onClick={() => onOpen(r)} className="w-full truncate rounded px-2 py-1 text-left text-xs text-act hover:bg-zinc-100">{r.title}</button></li>))}</ul>
      </aside>
    </div></motion.div>);
}
