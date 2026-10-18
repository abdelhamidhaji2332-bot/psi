import { writeFileSync } from "fs";
const slug=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const out=[];
const add=(subject,folder,title,extra={})=>out.push({id:slug(`${subject}-${folder}-${title}`),title,subject,folder,ext:"pdf",size:`${200+(out.length*37)%900} KB`,modified:"2024-09-01T00:00:00.000Z",url:`/storage/${subject}/${folder}/${encodeURIComponent(title)}.pdf`,tags:[subject,folder],...extra});
const cnc={math:["Maths 1","Maths 2"],physique:["Phys 1","Phys 2"],chimie:["Chimie"],informatique:["Info"],si:["SI"],cat:["Francais"]};
for(const [s,parts] of Object.entries(cnc)) for(let y=2018;y<=2024;y++) for(const p of parts){
  const n=p.match(/\d/)?.[0]; const component=n?`Épreuve ${n}`:"Épreuve";
  add(s,"CNC",`CNC ${y} - ${p}`,{year:y,kind:"epreuve",component});
  add(s,"CNC",`CNC ${y} - ${p} - Corrigé`,{year:y,kind:"corrige",component});
}
const topics={math:["Réduction des endomorphismes","Séries entières","Probabilités discrètes"],physique:["Électromagnétisme","Thermodynamique","Mécanique des fluides"],chimie:["Thermochimie","Solutions aqueuses","Cristallographie"],informatique:["Python - listes","SQL - requêtes","Graphes - parcours"],si:["SLCI","Mécatronique","Modélisation dynamique"],cat:["TIPE - méthodologie","Anglais - vocabulaire","Fiche de synthèse"]};
for(const [s,t] of Object.entries(topics)){
  for(const f of ["COURS","TD","EXERCICES","SUMMARIES"]) t.forEach(x=>add(s,f,`${f} ${x}`,{tags:[s,f,x]}));
  ["Moulay Youssef","Mohamed V","Omar Ibn Abdelaziz"].forEach((c,i)=>add(s,"DS",`DS ${i+1} ${c} - ${t[0]}`,{tags:[s,"DS",c]}));
  ["CCINP","Centrale-Supélec","Mines-Ponts"].forEach(c=>add(s,"CF",`${c} PSI 2023 - ${t[0]}`,{year:2023,tags:[s,"CF",c]}));
}
writeFileSync("data/resources.json",JSON.stringify(out,null,1));console.log(out.length,"resources");
