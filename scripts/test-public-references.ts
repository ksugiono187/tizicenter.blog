import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {airports} from '../src/data/airports';
import {brandReferences} from '../src/data/brand-references';
import {finish} from './lib/audit';
const errors:string[]=[];
try{
 assert.deepEqual([...brandReferences.map(r=>r.slug)].sort(),[...airports.map(a=>a.slug)].sort());
 assert.equal(brandReferences.length,29);
 const progress=load(fs.readFileSync('dist/brand-updates/index.html','utf8'));assert.equal(progress('.research-progress tbody tr').length,29);
 for(const r of brandReferences){const brand=airports.find(a=>a.slug===r.slug)!;assert.equal(brand.testStatus,'unverified');assert.equal(brand.plans.length,0);assert.equal(brand.startingPrice,undefined);const ids=r.sources.map(s=>s.id);assert.equal(new Set(ids).size,ids.length);assert.equal(r.reviewedAt,'2026-10-13');assert.ok(r.refund&&r.coupon&&r.revisionNote);for(const s of r.sources){assert.equal(s.kind,'third-party');assert.equal(new URL(s.url).protocol,'https:');assert.ok(s.readAt);assert.ok(!s.reportedDate||s.reportedDate<=s.readAt);}
  for(const group of ['airport','review']){const $=load(fs.readFileSync(`dist/${group}/${r.slug}/index.html`,'utf8'));assert.match($('.reference-boundary').text(),/不参与/);assert.ok($('#research-status time').text());assert.ok($(`a[href="/contact/?brand=${r.slug}"]`).length);assert.match($('meta[name="robots"]').attr('content')??'',/noindex/);for(const o of r.offers){assert.ok(ids.includes(o.sourceId));assert.ok(Number.isFinite(o.amount)&&o.amount>0);assert.ok($('.public-references tbody tr').toArray().some(row=>$(row).text().includes(o.name)&&$(row).text().includes('¥'+o.amount)));}for(const s of r.sources)assert.ok($(`.public-references a[href="${s.url}"]`).length);}
 }
 const provenance=JSON.parse(fs.readFileSync('docs/client-screenshot-sources.json','utf8'));assert.equal(provenance.assets.length,2);for(const asset of provenance.assets){const bytes=fs.readFileSync('public'+asset.file);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);assert.equal(bytes.readUInt32BE(16),asset.width);assert.equal(bytes.readUInt32BE(20),asset.height);assert.equal(asset.modified,false);}
 assert.match(fs.readFileSync('public/assets/client-reference/LICENSE.txt','utf8'),/GNU GENERAL PUBLIC LICENSE/);assert.ok(fs.readFileSync('public/assets/client-reference/NOTICE.txt','utf8').includes('not screenshots of this site connecting'));
 const guide=load(fs.readFileSync('dist/guides/clash-verge-rev/index.html','utf8'));assert.equal(guide('.client-figure img').length,2);assert.match(guide('.client-figure figcaption').text(),/不是本站/);assert.equal(guide('.client-figure img').eq(1).attr('height'),'972');
}catch(e){errors.push(String(e));}
finish('public-references',errors,{brands:brandReferences.length,quotedOffers:brandReferences.reduce((n,r)=>n+r.offers.length,0),officialReferenceImages:2,verifiedPlanPromotion:false,limitation:'Checks preserve source mappings, image provenance and separation from verified plans; they do not independently validate third-party commercial claims.'});
