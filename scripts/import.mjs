// One-time public content import. Normal builds never contact the source site.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import * as cheerio from 'cheerio';
const origin='https://cokhitonghop.vn';
const pages=new Map(), assets=new Map(), failures=[];
const hash=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,20);
await fs.mkdir('content/pages',{recursive:true});
await fs.mkdir('public/media',{recursive:true});
await fs.mkdir('.cache/downloads',{recursive:true});
function url(value,base=origin+'/'){try{return new URL(value,base)}catch{return null}}
function internal(u){return u&&['cokhitonghop.vn','www.cokhitonghop.vn'].includes(u.hostname)}
function pageURL(value){const u=url(value);if(!internal(u)||/\.(php|xml|txt|pdf|jpe?g|png|webp|gif|svg|zip)$/i.test(u.pathname)||/tim-kiem|ngonngu|keyword=/.test(u.href))return null;u.protocol='https:';u.hostname='cokhitonghop.vn';u.hash='';return u.href;}
function route(source){const u=url(source);const p=u.pathname.match(/^(.*)\.html&p=(\d+)$/);if(p)return p[1]+'/page/'+p[2]+'/';if(u.searchParams.has('p'))return u.pathname.replace(/\.html$/,'')+'/page/'+u.searchParams.get('p')+'/';return u.pathname;}
async function download(source){const file='.cache/downloads/'+hash(source);try{return await fs.readFile(file)}catch{}for(let i=0;i<3;i++){try{const r=await fetch(source,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw Error('HTTP '+r.status);const b=Buffer.from(await r.arrayBuffer());await fs.writeFile(file,b);return b}catch(e){if(i===2)throw e}}}
function addPage(value){const source=pageURL(value);if(source&&!pages.has(source))pages.set(source,{source,route:route(source),file:hash(source)+'.html'});}
function addAsset(value,base=origin+'/'){
 const u=url(value,base);if(!internal(u)||/^(data:|blob:|#)/.test(value))return value;
 u.protocol='https:';u.hostname='cokhitonghop.vn';u.hash='';
 const source=u.href;
 if(!assets.has(source)){let ext=path.extname(u.pathname).toLowerCase();if(!/^\.[a-z0-9]{1,6}$/.test(ext))ext='.bin';assets.set(source,{source,file:'/media/'+hash(source)+ext});}
 return assets.get(source).file;
}
function css(text,base){return text.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi,(all,q,v)=>{if(!v||v.startsWith('#')||v.startsWith('data:'))return all;return 'url("'+addAsset(v,base)+'")'});}
const sitemap=(await download(origin+'/sitemap.xml')).toString();
const xml=cheerio.load(sitemap,{xmlMode:true});xml('loc').each((_,e)=>addPage(xml(e).text()));addPage(origin+'/');
console.log('Sitemap:',pages.size,'URLs');
const completed=new Set();
while(true){const batch=[...pages.values()].filter(p=>!completed.has(p.source)).slice(0,5);if(!batch.length)break;
 await Promise.all(batch.map(async p=>{completed.add(p.source);try{
  const html=(await download(p.source)).toString();const $=cheerio.load(html);
  if(!$('body').length||!$('title').text())throw Error('Not an HTML page');
  // Follow links relative to the original <base>, which points at the homepage.
  $('a[href]').each((_,e)=>{let v=$(e).attr('href');if(!v||v.startsWith('#'))return;const u=url(v);if(internal(u)&&!/^\/(upload|assets|thumb)\//.test(u.pathname))addPage(u.href);});
  $('base,script,noscript,.kh-languages,.fb-comments,#fb-root,link[hreflang],meta[http-equiv="refresh"]').remove();
  $('form').each((_,e)=>{if($(e).find('input[type="search"]').length||/search/.test($(e).attr('class')||'')){$(e).attr('action','/tim-kiem.html').attr('method','get');$(e).find('input').first().attr('name','q');}else $(e).remove();});
  $('*').each((_,e)=>{for(const key of Object.keys(e.attribs||{}))if(/^on/i.test(key))$(e).removeAttr(key)});
  $('link[href]').each((_,e)=>{if(/stylesheet|icon/.test($(e).attr('rel')||'')||['font','image','style'].includes($(e).attr('as'))){$(e).attr('href',addAsset($(e).attr('href')));if($(e).attr('as')==='style')$(e).attr('rel','stylesheet').removeAttr('as');}});
  $('img,source,video,audio').each((_,e)=>{for(const a of ['src','poster','data-src','data-original']){const v=$(e).attr(a);if(v)$(e).attr(a,addAsset(v));}for(const a of ['srcset','data-srcset']){const v=$(e).attr(a);if(v)$(e).attr(a,v.split(',').map(x=>{const [v,...rest]=x.trim().split(/\s+/);return [addAsset(v),...rest].join(' ')}).join(', '));}});
  $('[data-src]').not('img,source,video,audio').each((_,e)=>{const v=$(e).attr('data-src');if(internal(url(v)))$(e).attr('data-src',addAsset(v));});
  $('a[href]').each((_,e)=>{const v=$(e).attr('href');if(!v||v.startsWith('#'))return;const u=url(v);if(internal(u)){if(/^\/(upload|assets|thumb)\//.test(u.pathname))$(e).attr('href',addAsset(v));else if(pageURL(u.href))$(e).attr('href',route(u.href)+u.hash);else $(e).removeAttr('href');}else if(u?.hostname==='zalo.me'){u.search='';$(e).attr('href',u.href);}if($(e).attr('target')==='_blank')$(e).attr('rel','noopener noreferrer');});
  $('style').each((_,e)=>$(e).text(css($(e).text(),origin+'/')));
  $('[style]').each((_,e)=>$(e).attr('style',css($(e).attr('style'),origin+'/')));
  $('meta[property="og:image"]').each((_,e)=>$(e).attr('content',addAsset($(e).attr('content'))));
  p.title=$('h1').first().text().trim()||$('title').text().trim();
  p.description=$('meta[name="description"]').attr('content')||'';
  p.text=$('main,article,.container_mid').first().text().replace(/\s+/g,' ').trim().slice(0,20000);
  await fs.writeFile('content/pages/'+p.file,$.html());
 }catch(e){p.error=String(e);failures.push({source:p.source,error:p.error});}}));
 console.log('Pages',completed.size,'/',pages.size,'Assets discovered',assets.size);
 if(pages.size>1500)throw Error('Unexpected crawl size; inspect URLs');
}
const downloaded=new Set();
while(true){const batch=[...assets.values()].filter(a=>!downloaded.has(a.source)).slice(0,8);if(!batch.length)break;await Promise.all(batch.map(async a=>{downloaded.add(a.source);try{let b=await download(a.source);if(a.file.endsWith('.css'))b=Buffer.from(css(b.toString(),a.source));await fs.writeFile('public'+a.file,b);a.bytes=b.length;}catch(e){a.error=String(e);failures.push({source:a.source,error:a.error});}}));if(downloaded.size%80===0||batch.length<8)console.log('Assets',downloaded.size,'/',assets.size);}
await fs.writeFile('content/manifest.json',JSON.stringify({origin,importedAt:new Date().toISOString(),pages:[...pages.values()],assets:[...assets.values()],failures},null,2));
console.log('Finished:',pages.size,'pages,',assets.size,'assets,',failures.length,'failures');
