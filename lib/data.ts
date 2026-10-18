import seed from "@/data/resources.json";
import { scanStorage } from "./indexer";
import type { Resource } from "./types";
export async function getResources(): Promise<Resource[]> {
  const scanned = await scanStorage();
  return scanned.length ? scanned : (seed as Resource[]);
}
