export const FOLDERS = ["COURS","TD","EXERCICES","DS","SUMMARIES","CNC","CF"] as const;
export type Folder = (typeof FOLDERS)[number];
export type Kind = "epreuve" | "corrige" | "rapport";
export interface Resource {
  id: string; title: string; subject: string; folder: Folder; ext: string; size: string;
  modified: string; url: string; tags: string[]; year?: number; kind?: Kind; component?: string;
}
export const SUBJECTS: Record<string,{label:string;topics:string}> = {
  math:{label:"Mathématiques",topics:"Algèbre, Analyse, Géométrie, Probas"},
  physique:{label:"Physique",topics:"Électromagnétisme, Mécanique, Thermodynamique, Optique"},
  chimie:{label:"Chimie",topics:"Thermochimie, Solutions aqueuses, Cristallographie"},
  informatique:{label:"Informatique",topics:"IPT, Python, SQL, Graphes"},
  si:{label:"Sciences de l'Ingénieur",topics:"SLCI, Mécatronique, Modélisation dynamique"},
  cat:{label:"Culture & Anglais / TIPE",topics:"Anglais, TIPE, Fiches de synthèse"},
};
