import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { siteUpdated } from './src/data/site.ts';
import { airports } from './src/data/airports.ts';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
const modifications={};
for(const file of fs.readdirSync('./src/content/articles')){
 const text=fs.readFileSync(`./src/content/articles/${file}`,'utf8');
 const category=text.match(/^category: (.+)$/m)?.[1];
 const updated=text.match(/^updated: (\d{4}-\d{2}-\d{2})$/m)?.[1];
 if(category&&updated) modifications[`/${category}/${file.replace(/\.md$/,'')}/`]=updated;
}
for(const airport of airports) for(const group of ['airport','review']) modifications[`/${group}/${airport.slug}/`]=airport.lastVerified||siteUpdated;
export default defineConfig({
 site:'https://tizicenter.blog', output:'static', trailingSlash:'always',
 integrations:[sitemap({filter:url=>{const path=new URL(url).pathname;return !['/404/','/recommend/premium/','/search/','/saved/'].includes(path)&&!/^\/ranking\/.+/.test(path)&&!airports.some(a=>a.testStatus==='unverified'&&[`/airport/${a.slug}/`,`/review/${a.slug}/`].includes(path));},serialize:item=>({...item,lastmod:modifications[new URL(item.url).pathname]||siteUpdated})})],
 vite:{plugins:[tailwindcss()]}
});
