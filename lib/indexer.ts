import { readdir, stat } from "fs/promises";
import path from "path";
import { FOLDERS, SUBJECTS, type Resource } from "./types";
import { parseCnc, slugify } from "./cnc";
const PUB = path.join(process.cwd(), "public");
const fmt = (b: number) => (b > 1048576 ? `${(b/1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b/1024))} KB`);
async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p))); else out.push(p);
  }
  return out;
}
export async function scanStorage(): Promise<Resource[]> {
  const res: Resource[] = [];
  for (const subject of Object.keys(SUBJECTS)) for (const folder of FOLDERS) {
    let files: string[] = [];
    try { files = await walk(path.join(PUB, "storage", subject, folder)); } catch { continue; }
    for (const f of files) {
      const st = await stat(f); const base = path.basename(f);
      const title = base.replace(/\.[^.]+$/, "");
      const cnc = folder === "CNC" || /cnc/i.test(base) ? parseCnc(title) : undefined;
      const rel = path.relative(PUB, f).split(path.sep).map(encodeURIComponent).join("/");
      res.push({ id: slugify(`${subject}-${folder}-${title}`), title, subject, folder, ext: path.extname(base).slice(1).toLowerCase(),
        size: fmt(st.size), modified: st.mtime.toISOString(), url: "/" + rel, tags: [subject, folder], ...cnc });
    }
  }
  return res;
}
