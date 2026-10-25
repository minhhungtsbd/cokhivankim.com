import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';
import {applyBrand,brandText} from './brand.mjs';
const config=JSON.parse(await fs.readFile('site.config.json','utf8'));
const manifest=JSON.parse(await fs.readFile('content/manifest.json','utf8'));
const output=path.resolve('dist');
if(output!==path.join(process.cwd(),'dist'))throw Error('Unsafe output directory');
await fs.rm(output,{recursive:true,force:true});
await fs.mkdir(output,{recursive:true});
await fs.cp('public',output,{recursive:true});
// The former company's profile must not remain publicly downloadable.
await fs.rm(output+'/media/6689a926fb2a51b45181.pdf',{force:true});
const failed=new Set(manifest.assets.filter(a=>a.error).map(a=>a.file));
const successful=new Set(manifest.assets.filter(a=>!a.error).map(a=>a.file));
// Source styles refer to obsolete decorative files/fonts that already return 404.
for(const asset of manifest.assets.filter(a=>a.file.endsWith('.css')&&!a.error)){
 let css=await fs.readFile('public'+asset.file,'utf8');
 css=css.replace(/@font-face\s*\{[^}]*\}/gi,rule=>[...failed].some(f=>rule.includes(f))?'':rule);
 css=css.replace(/url\(["']?(\/media\/[^)"']+)["']?\)/g,(all,v)=>failed.has(v)?'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E")':all);
 await fs.writeFile(output+asset.file,css);
}
const routes=new Set(manifest.pages.filter(p=>!p.error).map(p=>p.route));
const search=[];
async function write(route,html){let dest=path.join(output,route.endsWith('/')?route+'index.html':!path.extname(route)?route+'/index.html':route);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,html);}
function finalize($,route){
 $('a[href^="Skype:"],a[href^="skype:"]').remove();
 $('.kh-search input').attr('placeholder','Tìm kiếm…');
 $('html').attr('lang','vi');
 $('link[rel="canonical"]').attr('href',config.url+route);
 $('meta[property="og:url"]').attr('content',config.url+route);
 $('meta[property="og:image"]').each((_,e)=>{const v=$(e).attr('content');if(v?.startsWith('/'))$(e).attr('content',config.url+v);});
 $('link[href]').each((_,e)=>{if(failed.has($(e).attr('href')))$(e).remove();});
 $('img').each((_,e)=>{const img=$(e);if(failed.has(img.attr('src'))){const fallback=img.attr('data-original');if(successful.has(fallback))img.attr('src',fallback);else img.attr('src','/static/image-unavailable.svg');}img.removeAttr('data-original');});
 $('[srcset]').each((_,e)=>{const list=$(e).attr('srcset').split(',').filter(v=>!failed.has(v.trim().split(/\s+/)[0]));if(list.length)$(e).attr('srcset',list.join(','));else $(e).removeAttr('srcset');});
 $('a[href]').each((_,e)=>{const v=$(e).attr('href');if(failed.has(v))$(e).attr('href','/lien-he.html');});
 // Preserve original layouts; only shared behavior and small accessibility fixes are new.
 $('head').append('<link rel="stylesheet" href="/static/site.css"><link rel="stylesheet" href="/static/vankim.css"><script src="/static/site.js" defer></script>');
 $('body').prepend('<a class="skip-link" href="#main">Bỏ qua menu, đến nội dung</a>');
 return $.html();
}
for(const p of manifest.pages){
 if(p.error)throw Error('Missing page '+p.source);
 const $=cheerio.load(applyBrand(await fs.readFile('content/pages/'+p.file,'utf8'),p.route,config.contact));
 const body=$('.kar-paper,.km-article-content').first().length?$('.kar-paper,.km-article-content').first():$('#main');
 const searchable=body.clone();searchable.find('nav,header,footer,aside,.kpd-related,.kmp-card,.kh-contact').remove();
 await write(p.route,finalize($,p.route));
 if(!p.route.includes('/page/')&&p.route!=='/dich-vu')search.push({url:p.route,title:$('#main h1').first().text()||brandText(p.title),description:$('meta[name="description"]').attr('content')||'',text:searchable.text().replace(/\s+/g,' ').trim().slice(0,25000)});
}
const home=manifest.pages.find(p=>p.route==='/');
const shell=cheerio.load(applyBrand(await fs.readFile('content/pages/'+home.file,'utf8'),'/',config.contact));
function special(route,title,body){const $=cheerio.load(shell.html());$('title').text(title+' | Cơ khí');$('meta[name="description"]').attr('content',title);$('#main').html('<main class="static-page kh-shell">'+body+'</main>');return write(route,finalize($,route));}
await special('/tim-kiem.html','Tìm kiếm nội dung','<h1>Tìm kiếm nội dung</h1><form class="static-search" action="/tim-kiem.html" role="search"><label for="site-query">Nhập sản phẩm, dịch vụ hoặc bài viết</label><div><input type="search" name="q" id="site-query" placeholder="Ví dụ: tiện CNC, cắt laser…" required><button type="submit">Tìm kiếm</button></div></form><p id="search-status" role="status"></p><div id="search-results"></div><noscript>Bật JavaScript để tìm kiếm hoặc truy cập <a href="/san-pham.html">danh mục sản phẩm</a>.</noscript>');
await special('/404.html','Không tìm thấy trang','<h1>Không tìm thấy trang</h1><p>Đường dẫn có thể đã thay đổi. Bạn có thể tìm trong danh mục hoặc quay về trang chủ.</p><a class="kh-button" href="/">Về trang chủ</a> <a class="kh-button" href="/san-pham.html">Xem sản phẩm</a>');
await fs.writeFile(output+'/search-index.json',JSON.stringify(search));
await fs.writeFile(output+'/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...routes].map(r=>'<url><loc>'+config.url+r.replaceAll('&','&amp;')+'</loc></url>').join('')+'</urlset>');
await fs.writeFile(output+'/robots.txt','User-agent: *\nAllow: /\nSitemap: '+config.url+'/sitemap.xml\n');
console.log('Built',routes.size+2,'HTML pages in dist. No source-site connection required.');
