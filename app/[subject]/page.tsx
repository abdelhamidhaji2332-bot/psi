import { notFound } from "next/navigation";
import Browser from "@/components/Browser";
import { getResources } from "@/lib/data";
import { FOLDERS, SUBJECTS, type Folder } from "@/lib/types";
export const revalidate = 3600;
export const generateStaticParams = () => Object.keys(SUBJECTS).map(subject => ({ subject }));
export default async function Subject({ params, searchParams }: { params: { subject: string }; searchParams: { q?: string; folder?: string } }) {
  const meta = SUBJECTS[params.subject]; if (!meta) notFound();
  const items = (await getResources()).filter(r => r.subject === params.subject);
  const folder = FOLDERS.find(f => f === searchParams.folder) ?? ("COURS" as Folder);
  return (<div><h1 className="text-2xl font-semibold tracking-tight">{meta.label}</h1><p className="mb-6 mt-1 text-sm text-mute">{meta.topics}</p>
    <Browser items={items} initialQuery={searchParams.q ?? ""} initialFolder={folder} /></div>);
}
