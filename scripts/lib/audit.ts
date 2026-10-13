import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
export const origin='https://tizicenter.blog';
export function files(dir:string):string[]{return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
export function pages(){return files('dist').filter(f=>f.endsWith('.html')).map(file=>{const html=fs.readFileSync(file,'utf8');const rel=path.relative('dist',file).replaceAll('\\','/');const url=rel==='index.html'?'/':rel==='404.html'?'/404/':'/'+rel.replace(/index\.html$/,'');return{file,url,html,$:load(html)};});}
export function finish(name:string,errors:string[],details:any={}){fs.mkdirSync('docs/audit',{recursive:true});fs.writeFileSync(`docs/audit/${name}.json`,JSON.stringify({status:errors.length?'FAIL':'PASS',date:new Date().toISOString(),errors,...details},null,2));console.log(`${name}: ${errors.length?'FAIL':'PASS'}`,details);if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}}
