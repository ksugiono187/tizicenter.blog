export const editorialOrder=['choose-service','purchase-checklist','plan-cost','coupon-use','traffic-budget','subscription-format-choice','active-profile-check','subscription-update-schedule','all-sites-fail','one-site-fail','proxy-leftover','latency-not-throughput','bandwidth-units','screenshot-redaction','video-meeting-check'];
export function orderArticles<T extends {id:string;data:{updated:Date}}>(items:T[]):T[]{
 const rank=(id:string)=>{const i=editorialOrder.indexOf(id);return i===-1?1000:i;};
 return [...items].sort((a,b)=>b.data.updated.getTime()-a.data.updated.getTime()||rank(a.id)-rank(b.id)||a.id.localeCompare(b.id));
}
export function relatedArticles<T extends {id:string;body?:string;data:{category:string;section?:string;tags:string[];updated:Date}}>(entry:T,items:T[],limit=3):T[]{
 const referenced=[...entry.body?.matchAll(/\]\(\/(?:blog|guides|glossary)\/([^/)]+)\//g)??[]].map(m=>m[1]);
 const score=(p:T)=>referenced.includes(p.id)?100-referenced.indexOf(p.id):entry.data.section&&p.data.section===entry.data.section?10+p.data.tags.filter(t=>entry.data.tags.includes(t)).length:p.data.tags.filter(t=>entry.data.tags.includes(t)).length;
 return orderArticles(items.filter(p=>p.id!==entry.id)).filter(p=>score(p)>0).sort((a,b)=>score(b)-score(a)).slice(0,limit);
}
