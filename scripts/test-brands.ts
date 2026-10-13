import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import {airports} from '../src/data/airports';
import {pages} from './lib/audit';
const submitted=JSON.parse(fs.readFileSync('docs/brand-submission.json','utf8'));
assert.equal(airports.length,29);assert.equal(airports.filter(a=>a.couponCode).length,11);
for(const expected of submitted){const actual=airports.find(a=>a.slug===expected.slug)!;assert.ok(actual);assert.equal(actual.name,expected.name);assert.equal(actual.affiliateUrl,expected.url);assert.equal(actual.couponCode??null,expected.coupon);assert.equal(actual.testStatus,'unverified');assert.equal(actual.plans.length,0);assert.equal(actual.lastVerified,undefined);const $=load(fs.readFileSync('dist/airport/'+actual.slug+'/index.html','utf8'));const links=$('a').toArray().filter(el=>$(el).attr('href')===expected.url);assert.ok(links.length);for(const el of links)assert.match($(el).attr('rel')!,/sponsored/);if(expected.coupon)assert.ok($('code').toArray().some(el=>$(el).text()===expected.coupon));else assert.ok($('main').text().includes('优惠码：未提供'));}
const legacy=/protonvpn|windscribe|mullvad|ivpn|tunnelbear/i;
for(const p of pages()){assert.ok(!legacy.test(p.html),'legacy brand in '+p.url);for(const el of p.$('a[href]').toArray()){const href=p.$(el).attr('href')!;if(airports.some(a=>a.affiliateUrl===href)){const rel=p.$(el).attr('rel')!;for(const required of ['sponsored','nofollow','noopener','noreferrer'])assert.ok(rel.split(' ').includes(required));}}}
console.log('brands: PASS — 29 exact referral mappings, 11 exact coupon codes, no legacy brands or fabricated plans, promotion disclosure attributes');
