import fs from 'node:fs';
import {blogTopics} from '../src/data/blog-topics';
import {files,pages,finish} from './lib/audit';
const errors:string[]=[];
const articles=files('src/content/articles').filter(f=>f.endsWith('.md')).map(file=>({file,raw:fs.readFileSync(file,'utf8')})).filter(a=>/^category: blog$/m.test(a.raw));
if(articles.length!==150)errors.push(`Expected 150 blog articles, found ${articles.length}`);
const expected=new Set(articles.map(a=>'/blog/'+a.file.replaceAll('\\','/').split('/').pop()!.replace(/\.md$/,'')+'/'));
const generated=pages();
const listingUrls=['/blog/',...Array.from({length:9},(_,i)=>`/blog/page/${i+2}/`)];
const found:string[]=[];
for(const url of listingUrls){const p=generated.find(p=>p.url===url);if(!p){errors.push(`Missing list ${url}`);continue;}const links=p.$('.blog-library .article-card').map((_,a)=>p.$(a).attr('href')).get();if(links.length!==15)errors.push(`Expected 15 cards at ${url}, got ${links.length}`);found.push(...links);if(p.$('.pagination [aria-current="page"]').length!==1)errors.push(`Invalid current-page marker ${url}`);}
if(new Set(found).size!==150||found.length!==150)errors.push('All-blog pages contain duplicates or missing articles');
for(const url of expected)if(!found.includes(url))errors.push(`Not listed ${url}`);
const topicCounts:Record<string,number>={};
for(const topic of blogTopics){const members=articles.filter(a=>a.raw.includes(`section: ${topic.id}\n`));topicCounts[topic.id]=members.length;const actual:string[]=[];for(let page=1;page<=Math.ceil(members.length/15);page++){const url=`/blog/topic/${topic.id}/`+(page>1?`page/${page}/`:'');const p=generated.find(p=>p.url===url);if(!p){errors.push(`Missing topic ${url}`);continue;}actual.push(...p.$('.blog-library .article-card').map((_,a)=>p.$(a).attr('href')).get());}const wanted=members.map(a=>'/blog/'+a.file.replaceAll('\\','/').split('/').pop()!.replace(/\.md$/,'')+'/');if(actual.length!==wanted.length||new Set(actual).size!==wanted.length||wanted.some(url=>!actual.includes(url)))errors.push(`Topic membership mismatch ${topic.id}`);}
if(Object.values(topicCounts).reduce((a,b)=>a+b,0)!==150)errors.push('Missing or duplicate blog classification');
const search=generated.find(p=>p.url==='/search/');for(const url of expected){if(!search?.$('.search-results a').toArray().some(a=>search.$(a).attr('href')===url))errors.push(`Not searchable ${url}`);const p=generated.find(p=>p.url===url);if(!p?.$('.prose').length)errors.push(`Missing article body ${url}`);}
// Character shingles detect near-copies, unlike exact file hashes.
function shingles(raw:string){const body=raw.split('---').slice(2).join('---').replace(/https?:\/\/[^\s)]+/g,'').replace(/[\s\p{P}\p{S}]/gu,'');return new Set(Array.from({length:Math.max(0,body.length-4)},(_,i)=>body.slice(i,i+5)));}
const sets=articles.map(a=>shingles(a.raw));let maximum=0,pair:string[]=[];
for(let i=0;i<sets.length;i++)for(let j=i+1;j<sets.length;j++){const a=sets[i],b=sets[j];let overlap=0;for(const s of a)if(b.has(s))overlap++;const similarity=overlap/(a.size+b.size-overlap);if(similarity>maximum){maximum=similarity;pair=[articles[i].file,articles[j].file];}if(similarity>0.55)errors.push(`Near-copy content (${similarity.toFixed(3)}): ${articles[i].file} / ${articles[j].file}`);}
finish('blog',errors,{blogArticles:articles.length,allBlogPages:listingUrls.length,pageSize:15,topicCounts,searchCoverage:expected.size,maximumFiveCharacterJaccard:Number(maximum.toFixed(3)),closestPair:pair,limitation:'Similarity and coverage checks do not replace editorial judgment or verify real brand claims.'});
