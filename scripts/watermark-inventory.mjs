import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';

const root=process.cwd();
const manifest=JSON.parse(await readFile(resolve(root,'content/manifest.json'),'utf8'));
const assetSource=new Map(manifest.assets.map(asset=>[asset.file,asset.source]));
const knownReplacements={
 '/media/edfcb9597003e3fdd4b7.png':'/static/vankim-logo.svg',
 '/media/f6b5bf15d8acf9f7a1ba.png':'/static/vankim-logo.svg',
 '/media/9712588fc7222c11ea41.jpg':'/brand-media/sprocket-vankim.png',
 '/media/01173f717f55732537f7.jpg':'/brand-media/laser-star-vankim.png',
 '/media/0285a9cb866c70d16bc9.jpg':'/brand-media/fabrication-table-vankim.png',
 '/media/03714822033e8dcf4b0f.jpg':'/brand-media/machined-plate-vankim.png',
 '/media/04338b775afd8525979d.jpg':'/brand-media/laser-cutting-vankim.png',
 '/media/f5557990635b2c62afd8.jpg':'/brand-media/laser-workshop-vankim.png',
 '/media/642c65adf2849eb9c943.jpg':'/brand-media/laser-brackets-vankim.png',
 '/media/1e102039e6688be5f930.jpg':'/brand-media/laser-decorative-panel-vankim.png',
 '/media/10815f2eddce66ae6cce.jpg':'/brand-media/laser-metal-parts-vankim.png',
 '/media/dff6c9f56459b8280ec2.jpg':'/brand-media/laser-product-arcs-vankim.png'
 ,'/media/16e74ea51d6c27014a88.jpg':'/brand-media/machine-washer-vankim.png'
 ,'/media/399cb05ca63ca14a4944.jpg':'/brand-media/machine-washer-wide-vankim.png'
 ,'/media/fa38c829b1107e592a22.jpg':'/brand-media/red-industrial-machine-vankim.png'
};
const checkedClean={
 '/media/0c3213cbfb8d8b482f80.jpg':'Không có watermark cũ.',
 '/media/de47eb681fd0b85e2110.jpg':'Không có watermark cũ.',
 '/media/54674b74b2fad25f1f53.jpg':'Không có watermark cũ.',
 '/media/bd011510a3933f2fbdf7.png':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/ababec62b4add6ad13f3.png':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/496e91f6eda19b5177ea.jpg':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/a91ce09b6133ba7dbbc7.jpg':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/31c33b3f83f949f57b84.jpg':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/4c3995531441930f0dde.jpg':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/a3b21a5692f1abfe2a6c.png':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/bab7297e1c7ba56282d5.png':'Logo thương hiệu đối tác, không phải watermark.'
};
const needsSource={
 '/media/eb746fd269ddfb7de7c8.jpg':'Bản AI thử nghiệm làm đổi bố cục collage; cần nguồn ảnh sạch hoặc xử lý thủ công.',
 '/media/3e186babe9485eb235e6.jpg':'Bản AI thử nghiệm làm đổi bố cục collage; cần nguồn ảnh sạch hoặc xử lý thủ công.',
 '/media/58844b6d30a7add3345e.jpg':'Bản AI thử nghiệm làm đổi chi tiết sản phẩm; cần nguồn ảnh sạch hoặc xử lý thủ công.'
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
 const images=[...new Set([...html.matchAll(/\/media\/[a-f0-9]+\.(?:jpg|jpeg|png|webp)/gi)].map(match=>match[0]).filter(isPhoto))];
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
 `- ${Object.keys(checkedClean).length} ảnh đã kiểm tra, không có watermark cũ.`,
 '',
 '## Trạng thái ảnh đã duyệt',
 ''
];
for(const [original,replacement] of Object.entries(knownReplacements)){
 const affected=references.get(original)||[];
 lines.push(`- [x] \`${original}\` → \`${replacement}\` — dùng ở ${affected.length} trang.`);
}
lines.push('', '## Ảnh đã kiểm tra, không cần thay watermark', '');
for(const [image,note] of Object.entries(checkedClean))lines.push(`- [—] \`${image}\` — ${note}`);
lines.push('', '## Ảnh cần nguồn sạch hoặc xử lý thủ công', '');
for(const [image,note] of Object.entries(needsSource))lines.push(`- [!] \`${image}\` — ${note}`);
lines.push('', '## Danh sách bài viết và ảnh cần xử lý', '');
for(const post of posts.sort((a,b)=>a.route.localeCompare(b.route))){
 const complete=post.images.every(image=>knownReplacements[image]||checkedClean[image]);
 lines.push(`### ${complete?'[x]':'[ ]'} ${post.title}`, '', `- Route: \`${post.route}\``, `- Ảnh cần rà: ${post.images.length}`);
 for(const image of post.images){
  const state=knownReplacements[image]?'[x]':checkedClean[image]?'[—]':needsSource[image]?'[!]':'[ ]';
  const usedBy=(references.get(image)||[]).length;
  const source=assetSource.get(image)||'không rõ nguồn import';
  lines.push(`  - ${state} \`${image}\` — dùng ở ${usedBy} trang — nguồn: ${source}`);
 }
 lines.push('');
}
await writeFile(resolve(root,'WATERMARK_PLAN.md'),`${lines.join('\n')}\n`,'utf8');
console.log(`Created WATERMARK_PLAN.md: ${posts.length} posts, ${references.size} unique content images.`);
