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
 ,'/media/dbecbd957dee7ddd6522.jpg':'/brand-media/metal-cylinder-vankim.png'
 ,'/media/1ef599c9c4fcd126675c.jpg':'/brand-media/bent-metal-sheets-vankim.png'
 ,'/media/bd126ec2f3d9885b112f.jpg':'/brand-media/wire-mesh-roll-vankim.png'
 ,'/media/38b4c8763fb628e03e84.jpg':'/brand-media/laser-cutting-service-vankim.png'
 ,'/media/eb746fd269ddfb7de7c8.jpg':'/brand-media/laser-product-collage-vankim.png'
 ,'/media/3e186babe9485eb235e6.jpg':'/brand-media/laser-products-collage-vankim.png'
 ,'/media/58844b6d30a7add3345e.jpg':'/brand-media/laser-product-arcs-vankim.png'
 ,'/media/f88fbb2e9a766116a6cf.jpg':'/brand-media/laser-four-panel-vankim.png'
 ,'/media/d05d410f8967ac182723.jpg':'/brand-media/roller-machine-vankim.png'
 ,'/media/50ce5b52986c53c7d8a9.jpg':'/brand-media/roller-polished-vankim.png'
 ,'/media/154355ea77d42dfa475c.jpg':'/brand-media/roller-machine-vankim.png'
 ,'/media/cff2f7defd8593126c93.jpg':'/brand-media/rulo-orange-endcap-vankim.png'
 ,'/media/422716d5085affb20693.jpg':'/brand-media/rulo-polished-wide-vankim.png'
 ,'/media/a0e2eeaa10e2f1b491b7.jpg':'/brand-media/screw-conveyor-illustration-vankim.png'
 ,'/media/51b9786ffb9a295985d7.jpg':'/brand-media/screw-conveyor-illustration-vankim.png'
 ,'/media/cab2c1ad6fac1c17de2e.jpg':'/brand-media/screw-conveyor-incline-vankim.png'
 ,'/media/0372abc368e5f2b57701.jpg':'/brand-media/screw-conveyor-wide-vankim.png'
 ,'/media/a79c09b1c6a4d7f2684e.jpg':'/brand-media/screw-conveyor-drawing-vankim.png'
 ,'/media/1528945f271fc1f7f906.jpg':'/brand-media/screw-conveyor-detail-vankim.png'
 ,'/media/1843670e515a58969b70.jpg':'/brand-media/roller-conveyors-vankim.png'
 ,'/media/bacf20062a950ac18b8b.jpg':'/brand-media/mesh-conveyor-vankim.png'
 ,'/media/a7bce9d62e21d62ac5cf.jpg':'/brand-media/gear-catalogue-vankim.png'
 ,'/media/7089bc522119e1100672.jpg':'/brand-media/gear-catalogue-vankim.png'
 ,'/media/d3ab39997479c6848498.jpg':'/brand-media/steel-frame-vankim.png'
 ,'/media/bffbf2e25cbab6cd29de.jpg':'/brand-media/industrial-hopper-vankim.png'
 ,'/media/6bd7044181296be5a385.jpg':'/brand-media/milled-metal-part-vankim.png'
 ,'/media/8f0a38edd688441d9737.jpg':'/brand-media/milled-metal-part-vankim.png'
 ,'/media/13f80559255f88932bfd.jpg':'/brand-media/turned-tooling-vankim.png'
 ,'/media/bbe296bdcb8b455a96fd.jpg':'/brand-media/turned-tooling-vankim.png'
 ,'/media/ded3086a5d64f869b7b0.jpg':'/brand-media/mesh-conveyor-wide-vankim.png'
 ,'/media/2e03db663ccd7dc0382e.jpg':'/brand-media/mesh-belt-portrait-vankim.png'
 ,'/media/dc714c011cfec478da17.jpg':'/brand-media/stainless-bent-brackets-vankim.png'
 ,'/media/8414135cf4f93920c224.jpg':'/brand-media/stainless-profiles-vankim.png'
 ,'/media/3c543508894869dfc645.jpg':'/brand-media/inbox-bent-parts-vankim.png'
 ,'/media/b36b3b61614366ea5f26.jpg':'/brand-media/inbox-panels-vankim.png'
 ,'/media/e24964c3f11bd2033809.jpg':'/brand-media/laser-products-collage-vankim.png'
 ,'/media/d27e84a8c4ebd4a471a1.jpg':'/brand-media/laser-parts-collage-vankim.png'
 ,'/media/81f820a748b064242080.jpg':'/brand-media/laser-parts-premium-collage-vankim.png'
 ,'/media/7c370fa715d15643ae82.jpg':'/brand-media/laser-steel-plates-vankim.png'
 ,'/media/0873059bdda75a0994d2.jpg':'/brand-media/laser-cut-components-vankim.png'
 ,'/media/b49a8ac61c14cd00816d.jpg':'/brand-media/laser-stacked-components-vankim.png'
 ,'/media/6e0272bf6e4a45614b95.jpg':'/brand-media/laser-machine-parts-vankim.png'
 ,'/media/9cb3ea1fd5e4adc1f9ae.jpg':'/brand-media/laser-precision-parts-vankim.png'
 ,'/media/24405b6e35a3dea642d3.jpg':'/brand-media/laser-pattern-gate-vankim.png'
 ,'/media/2036e36b7d4a17a14603.jpg':'/brand-media/laser-pattern-bird-vankim.png'
 ,'/media/c27f115857ef411019ce.jpg':'/brand-media/laser-pattern-floral-vankim.png'
 ,'/media/357807ae23edb6a4af74.jpg':'/brand-media/laser-decorative-interior-vankim.png'
 ,'/media/9d19af0cdd9dba5631f4.jpg':'/brand-media/laser-floral-panel-vankim.png'
 ,'/media/8016bd8017f4581f6eed.jpg':'/brand-media/laser-ornamental-screen-vankim.png'
 ,'/media/174687b3bcb2586ee6f4.jpg':'/brand-media/laser-decorative-workshop-vankim.png'
 ,'/media/afe5dc3faba54d720d10.jpg':'/brand-media/laser-floral-railing-vankim.png'
 ,'/media/4d103b1c67ac92d84cb4.jpg':'/brand-media/laser-ornamental-panel-vankim.png'
 ,'/media/d35fb5e6831704b3dedf.jpg':'/brand-media/laser-decorative-panel-grid-vankim.png'
 ,'/media/b657e52895acac890965.jpg':'/brand-media/laser-steel-bracket-vankim.png'
 ,'/media/af41f9cded8dc65c715a.jpg':'/brand-media/laser-steel-frame-vankim.png'
 ,'/media/9d17b5768eb97ec94b0c.jpg':'/brand-media/laser-stainless-bracket-vankim.png'
 ,'/media/f9cfa2fee9bcc68e35c9.jpg':'/brand-media/laser-steel-brackets-vankim.png'
 ,'/media/aaf240ed9a9a7adef4cc.jpg':'/brand-media/laser-product-arcs-vankim.png'
 ,'/media/285babd3dfdd3f5ea636.jpg':'/brand-media/laser-hanging-plates-vankim.png'
 ,'/media/964660ad114a6fe3f11d.jpg':'/brand-media/laser-sheet-patterns-vankim.png'
 ,'/media/908bcf68da6b8cac8078.jpg':'/brand-media/laser-stacked-sheets-vankim.png'
 ,'/media/64eddab0b6928f1e1ba5.jpg':'/brand-media/laser-flat-parts-vankim.png'
 ,'/media/482dae7218cd172f0efd.jpg':'/brand-media/laser-sheet-closeup-vankim.png'
 ,'/media/a0f9f16c1b0544677ac9.jpg':'/brand-media/laser-sheet-nesting-vankim.png'
 ,'/media/8e5919dd228e442e52e8.jpg':'/brand-media/laser-ornamental-sheet-vankim.png'
 ,'/media/8338d1543970974f2343.jpg':'/brand-media/laser-sheet-parts-vankim.png'
 ,'/media/2e185321aed1f7445453.jpg':'/brand-media/laser-cutting-sparks-vankim.png'
 ,'/media/1be635151db24eb88c81.jpg':'/brand-media/gear-collection-vankim.png'
 ,'/media/56c375bb5849e17ea70d.jpg':'/brand-media/gear-rack-collection-vankim.png'
 ,'/media/65ec900cfdce83d06b51.jpg':'/brand-media/gear-set-vankim.png'
 ,'/media/24ccdd2007a9d8290e88.jpg':'/brand-media/gear-collection-vankim.png'
 ,'/media/367698abbc96ab85f5c4.jpg':'/brand-media/three-gears-vankim.png'
 ,'/media/7dc99e490d5f5452a63d.jpg':'/brand-media/gear-grid-vankim.png'
};
const checkedClean={
 '/media/0c3213cbfb8d8b482f80.jpg':'Không có watermark cũ.',
 '/media/de47eb681fd0b85e2110.jpg':'Không có watermark cũ.',
 '/media/54674b74b2fad25f1f53.jpg':'Không có watermark cũ.',
 '/media/9ca7097375ac1d5c4f5d.png':'Không có watermark cũ.',
 '/media/8c687bed22d6de65e578.jpg':'Không có watermark cũ.',
 '/media/832056d0c7a2b47fef2f.jpg':'Không có watermark cũ.',
 '/media/01278a42c9f23c6ba34f.jpg':'Không có watermark cũ.',
 '/media/ddab0237bfb0cf2d1d28.jpg':'Không có watermark cũ.',
 '/media/493eb7c59ad995627836.jpg':'Không có watermark cũ.',
 '/media/6b159e52eaa85e376185.jpg':'Không có watermark cũ.',
 '/media/0259950403c0bc387a7c.jpg':'Không có watermark cũ.',
 '/media/92e4bbf15c4d2855f28f.jpg':'Không có watermark cũ.',
 '/media/a75ba14e16d31cb66565.jpg':'Không có watermark cũ.',
 '/media/d2ff906d2f0521f92cfb.jpg':'Không có watermark cũ.',
 '/media/6d76c8784a9b479d6257.jpg':'Không có watermark cũ.',
 '/media/ad379e57dbad991083d4.jpg':'Không có watermark cũ.',
 '/media/de78ce8df424ef96182a.jpg':'Không có watermark cũ.',
 '/media/bfca9a5e4829f84e8a7f.jpg':'Không có watermark cũ.',
 '/media/c55cf8c0201ac8090ac1.jpg':'Không có watermark cũ.',
 '/media/82c794a2570b1bc3ca76.jpg':'Không có watermark cũ; chữ là nội dung khắc thật trên sản phẩm.',
 '/media/a78c8e28a36827176206.jpg':'Không có watermark cũ; chữ là nội dung khắc thật trên sản phẩm.',
 '/media/5f9c68e51fdc7cd15d0a.png':'Không có watermark cũ.',
 '/media/4d8fe8d7fe2875f07f2c.png':'Không có watermark cũ.',
 '/media/9db7e66b151dfda25f3f.png':'Không có watermark cũ.',
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
 '/media/9e151baf1992fd681031.jpg':'Ảnh nguồn không được import vì URL gốc trả HTTP 404; cần ảnh gốc mới nếu muốn hiển thị.'
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
