export const favoriteKey='tizi.favorites.v1';
export const progressKey=(id:string)=>'tizi.checks.v1:'+id;
export function readLocal(key:string):unknown {try {const value=localStorage.getItem(key);return value?JSON.parse(value):null;}catch{return null;}}
export function writeLocal(key:string,value:unknown):boolean {try {localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event('tizi-preferences'));return true;}catch{return false;}}
export function removeLocal(key:string):boolean {try {localStorage.removeItem(key);window.dispatchEvent(new Event('tizi-preferences'));return true;}catch{return false;}}
export function validFavorites(value:unknown):string[]{return Array.isArray(value)?[...new Set(value.filter((v):v is string=>typeof v==='string'&&/^\/(blog|guides|glossary)\/[a-z0-9-]+\/$/.test(v)))].slice(0,200):[];}
export const favorites=()=>validFavorites(readLocal(favoriteKey));
export function validProgress(value:unknown,labels?:string[]):{labels:string[];checked:boolean[]}|null {
 if(!value||typeof value!=='object')return null;const v=value as {labels?:unknown;checked?:unknown};
 if(!Array.isArray(v.labels)||!v.labels.every(x=>typeof x==='string')||!Array.isArray(v.checked)||!v.checked.every(x=>typeof x==='boolean')||v.checked.length!==v.labels.length||v.labels.length!==6)return null;
 if(labels&&JSON.stringify(labels)!==JSON.stringify(v.labels))return null;
 return {labels:v.labels,checked:v.checked};
}
