import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';

const root=process.cwd();
const manifest=JSON.parse(await readFile(resolve(root,'content/manifest.json'),'utf8'));
const assetSource=new Map(manifest.assets.map(asset=>[asset.file,asset.source]));
const knownReplacements={
 '/media/9712588fc7222c11ea41.jpg':'/brand-media/sprocket-vankim.png',
 '/media/01173f717f55732537f7.jpg':'/brand-media/laser-star-vankim.png',
 '/media/0285a9cb866c70d16bc9.jpg':'/brand-media/fabrication-table-vankim.png',
 '/media/03714822033e8dcf4b0f.jpg':'/brand-media/machined-plate-vankim.png',
 '/media/04338b775afd8525979d.jpg':'/brand-media/laser-cutting-vankim.png'
};

// Product and workshop uploads are the imported catalogue material where the
// legacy watermark appears. Shared interface assets (logo, icons, UI art) are
// rebranded separately by the HTML/CSS layer and do not enter this workflow.
const isPhoto=path=>{
 const source=assetSource.get(path)||'';
 return /\/media\/[a-f0-9]+\.(?:jpe?g|png|webp)$/i.test(path)
  &&/\/upload\//i.test(source)
  &&!/\/(?:logo|icon)[^/]*\.(?:png|jpe?g|webp)$/i.test(source);
};
const posts=[];
const references=new Map();
for(const page of manifest.pages){
 const html=await readFile(resolve(root,'content/pages',page.file),'utf8');
 const $=cheerio.load(html);
 const images=[...new Set($('img[src]').map((_,image)=>$(image).attr('src')).get().filter(isPhoto))];
 if(!images.length)continue;
 posts.push({route:page.route,title:page.title,images});
 for(const image of images){
  if(!references.has(image))references.set(image,[]);
  references.get(image).push(page.route);
 }
}

const shared=[...references].filter(([,routes])=>routes.length>1).length;
const lines=[
 '# Kế hoạch thay watermark ảnh',
 '',
 `Cập nhật: ${new Date().toISOString().slice(0,10)}.`,
 '',
 '## Nguyên tắc triển khai',
 '',
 '1. Mỗi ảnh gốc chỉ xử lý một lần; mọi bài dùng chung ảnh đó sẽ tự nhận bản mới.',
 '2. Chỉ xuất bản ảnh sau khi kiểm tra trực quan; ảnh AI làm đổi chi tiết cơ khí, sai tỷ lệ hoặc chèn viền sẽ bị loại.',
 '3. Ảnh import gốc trong `public/media` luôn được giữ nguyên. Bản đạt yêu cầu ở `public/brand-media` và được ánh xạ khi build.',
 '4. Mỗi đợt: xử lý ảnh → build → kiểm tra liên kết → kiểm tra trực quan trang bài viết → commit/push để Cloudflare Pages tự cập nhật.',
 '',
 '## Tóm tắt danh mục',
 '',
 `- ${posts.length} trang/bài có ảnh nội dung.`,
 `- ${references.size} ảnh nội dung riêng biệt cần rà watermark.`,
 `- ${shared} ảnh được dùng ở từ hai trang trở lên, chỉ cần thay một lần.`,
 `- ${Object.keys(knownReplacements).length} ảnh đã có bản thay thế được duyệt.`,
 '',
 '## Trạng thái ảnh đã duyệt',
 ''
];
for(const [original,replacement] of Object.entries(knownReplacements)){
 const affected=references.get(original)||[];
 lines.push(`- [x] \`${original}\` → \`${replacement}\` — dùng ở ${affected.length} trang.`);
}
lines.push('', '## Danh sách bài viết và ảnh cần xử lý', '');
for(const post of posts.sort((a,b)=>a.route.localeCompare(b.route))){
 lines.push(`### [ ] ${post.title}`, '', `- Route: \`${post.route}\``, `- Ảnh cần rà: ${post.images.length}`);
 for(const image of post.images){
  const state=knownReplacements[image]?'[x]':'[ ]';
  const usedBy=(references.get(image)||[]).length;
  const source=assetSource.get(image)||'không rõ nguồn import';
  lines.push(`  - ${state} \`${image}\` — dùng ở ${usedBy} trang — nguồn: ${source}`);
 }
 lines.push('');
}
await writeFile(resolve(root,'WATERMARK_PLAN.md'),`${lines.join('\n')}\n`,'utf8');
console.log(`Created WATERMARK_PLAN.md: ${posts.length} posts, ${references.size} unique content images.`);
