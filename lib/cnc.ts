import type { Kind } from "./types";
export interface CncInfo { year?: number; kind: Kind; component?: string }
export function parseCnc(name: string): CncInfo {
  const year = /\b(20\d{2}|19\d{2})\b/.exec(name)?.[1];
  const kind: Kind = /rapport|jury/i.test(name) ? "rapport" : /corrig|correction|\bcorr\b/i.test(name) ? "corrige" : "epreuve";
  const num = /(?:math|maths|phys|physique|chim|chimie|si|info)\w*\s*[-_]?\s*(\d)\b/i.exec(name)?.[1];
  return { year: year ? Number(year) : undefined, kind, component: num ? `Épreuve ${num}` : undefined };
}
export const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
