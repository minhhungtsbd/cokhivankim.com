import * as cheerio from 'cheerio';

export const intro='Cơ Khí Vạn Kim — Hộ Kinh Doanh Vạn Kim — tiếp nhận yêu cầu sản xuất, gia công tiện, phay và các hạng mục cơ khí theo bản vẽ hoặc mẫu. Chúng tôi trao đổi cụ thể về vật liệu, kích thước, số lượng và tiến độ để thống nhất phương án phù hợp trước khi thực hiện. Phục vụ khách hàng cá nhân và doanh nghiệp tại TP.HCM; nhu cầu giao nhận ở khu vực khác được trao đổi theo từng đơn hàng.';
// Original imported photos remain untouched in /media.  This map makes every
// published instance use its approved Vạn Kim-branded replacement instead.
const imageReplacements={
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
};
export function brandText(text){return text
 .replace(/CÔNG TY TNHH CƠ KHÍ KHỞI\s+MINH/gi,'HỘ KINH DOANH VẠN KIM')
 .replace(/Công ty (?:TNHH )?cơ khí Khởi\s+Minh/gi,'Hộ Kinh Doanh Vạn Kim')
 .replace(/KHỞI\s+MINH/g,'VẠN KIM').replace(/Khởi\s+Minh/g,'Vạn Kim').replace(/khởi\s+minh/g,'vạn kim');}

export function applyBrand(html,route,contact){
 const $=cheerio.load(brandText(html));
 // Replace individual business/address text nodes without changing layout markup.
 $('*').contents().each((_,node)=>{
  if(node.type!=='text'||['style','script'].includes(node.parent?.name))return;
  let t=node.data;
  if(/0315887642/.test(t))t=t.replace(/(?:Mã số thuế|MST)\s*:?\s*0315887642/gi,'').replace(/0315887642/g,'');
  if(contact&&/262A|93\/27|Đường Văn Tiến Dũng/i.test(t))t=contact.address;
  t=t.replace(/(?:hệ thống\s*)?3 xưởng/gi,'xưởng').replace(/03\s*xưởng/gi,'Xưởng').replace(/Công ty/g,'Cơ sở').replace(/công ty/g,'cơ sở');
  node.data=t;
 });
 $('.kh-footer-tax,.kh-footer-network,.kh-footer-bct,.kh-fp-quiet,#kh-partners-title').each((_,e)=>{if(e.attribs.id==='kh-partners-title')$(e).closest('section').remove();else $(e).remove();});
 $('a[href]').each((_,e)=>{const a=$(e),href=a.attr('href');if(/facebook\.com|tiktok\.com|online\.gov\.vn|cokhikhoiminh\.com|cokhihanoi\.vn|cokhitphcm\.vn/.test(href))a.remove();if(href==='/ho-so-nang-luc.html')a.remove();});
 $('img').each((_,e)=>{const img=$(e);if(/logo.*(?:Vạn Kim|Khởi Minh)/i.test(img.attr('alt')||''))img.attr('src','/static/vankim-logo.svg').attr('alt','Logo Cơ Khí Vạn Kim').removeAttr('srcset').removeAttr('sizes');});
 $('img, source').each((_,e)=>{
  const element=$(e);
  for(const [original,replacement] of Object.entries(imageReplacements)){
   for(const attribute of ['src','data-src','data-original'])if(element.attr(attribute)===original)element.attr(attribute,replacement);
   if(element.attr('srcset')?.includes(original))element.attr('srcset',element.attr('srcset').replaceAll(original,replacement));
  }
 });
 $('link[rel*="icon"]').attr('href','/static/vankim-logo.svg').attr('type','image/svg+xml');
 $('meta[property="og:image"]').attr('content','/static/vankim-logo.svg');
 $('.kh-brand strong').text('CƠ KHÍ VẠN KIM');
 $('.kh-brand small').text('Tiện · Phay · Gia công cơ khí theo yêu cầu');
 $('.kh-footer-brand strong').text('HỘ KINH DOANH VẠN KIM');
 $('.kh-footer-description').text('Sản xuất, gia công tiện, phay và cơ khí theo yêu cầu tại TP.HCM. Trao đổi bản vẽ, vật liệu và phương án thực hiện cho từng đơn hàng.');
 $('.kh-footer-workshops').html('<h2>Địa chỉ liên hệ</h2><p class="vk-address"></p><p><a class="vk-map" target="_blank" rel="noopener noreferrer">Tìm trên Google Maps ↗</a></p><p>Vui lòng liên hệ trước khi đến xưởng.</p>');
 $('.kh-footer-social h2').text('Kết nối với Vạn Kim');
 $('.kh-image-stamp').text('HÌNH ẢNH THAM KHẢO');
 $('iframe[src*="youtube"]').remove();
 $('a[href$="6689a926fb2a51b45181.pdf"]').remove();
 $('[title]').each((_,e)=>{if(/262A|Phạm Đăng|Nguyễn Thị Tú|Văn Tiến Dũng/.test($(e).attr('title')))$(e).attr('title','Địa chỉ Cơ Khí Vạn Kim');});
 const wrapped=(title,body)=>'<main class="static-page kh-shell"><p class="kh-eyebrow">CƠ KHÍ VẠN KIM / TP.HCM</p><h1>'+title+'</h1>'+body+'</main>';
 if(route==='/gioi-thieu.html')$('#main').html(wrapped('Gia công từ yêu cầu thực tế.',`<p class="vk-intro">${intro}</p><div class="vk-info"><article><h2>Từ bản vẽ đến phương án</h2><p>Tiếp nhận bản vẽ hoặc mẫu, làm rõ vật liệu, kích thước, dung sai và yêu cầu sử dụng.</p></article><article><h2>Trao đổi trước khi thực hiện</h2><p>Thống nhất phạm vi công việc, số lượng, chi phí và thời gian bàn giao theo từng đơn hàng.</p></article><article><h2>Dịch vụ cơ khí</h2><p>Tiện, phay và các nhóm dịch vụ cơ khí được giới thiệu trên website. Liên hệ để xác nhận khả năng đáp ứng hạng mục cụ thể.</p><a href="/dich-vu.html">Xem dịch vụ →</a></article><article><h2>Kết nối thuận tiện</h2><p class="vk-address"></p><p>Vui lòng liên hệ trước khi đến xưởng.</p><a href="/lien-he.html">Thông tin liên hệ →</a></article></div>`));
 if(route==='/lien-he.html')$('#main').html(wrapped('Liên hệ Cơ Khí Vạn Kim.', '<p class="vk-intro">Trao đổi bản vẽ, mẫu sản phẩm và yêu cầu gia công để cùng xác định phương án phù hợp.</p><div class="vk-info"><article><h2>Hotline & Zalo</h2><p><a class="vk-phone"></a></p><a class="vk-zalo kh-button">Trao đổi qua Zalo ↗</a></article><article><h2>Email</h2><p><a class="vk-email"></a></p><p>Gửi bản vẽ và thông tin vật liệu, số lượng, thời gian mong muốn.</p></article><article><h2>Địa chỉ</h2><p class="vk-address"></p><a class="vk-map" target="_blank" rel="noopener noreferrer">Tìm trên Google Maps ↗</a></article><article><h2>Thời gian liên hệ</h2><p>Vui lòng gọi điện hoặc nhắn Zalo trước khi đến xưởng để được sắp xếp tiếp nhận.</p></article></div>'));
 if(route.startsWith('/tuyen-dung'))$('#main').html(wrapped('Tạm ngưng tuyển dụng','<p class="vk-intro">Hiện tại Hộ Kinh Doanh Vạn Kim chưa tiếp nhận hồ sơ tuyển dụng. Thông tin vị trí mới sẽ được cập nhật tại trang này khi có nhu cầu.</p><a class="kh-button" href="/">Về trang chủ</a>'));
 if(route==='/ho-so-nang-luc.html')$('#main').html(wrapped('Hồ sơ năng lực đang cập nhật','<p class="vk-intro">Hồ sơ giới thiệu Cơ Khí Vạn Kim đang được chuẩn bị. Vui lòng liên hệ để trao đổi về hạng mục, bản vẽ và yêu cầu gia công cụ thể.</p><a class="kh-button" href="/lien-he.html">Liên hệ Vạn Kim</a>'));
 if(route.startsWith('/tuyen-dung')){
  $('title').text('Tạm ngưng tuyển dụng | Cơ Khí Vạn Kim');
  $('meta[name="description"],meta[property="og:description"]').attr('content','Hiện tại Hộ Kinh Doanh Vạn Kim tạm ngưng tuyển dụng.');
 }
 if(contact){
  $('.vk-address').text(contact.address);
  $('.vk-map').attr('href',contact.maps);
  $('.vk-phone').attr('href','tel:'+contact.phone).text(contact.phoneDisplay);
  $('.vk-zalo').attr('href','https://zalo.me/'+contact.phone);
  $('.vk-email').attr('href','mailto:'+contact.email).text(contact.email);
  $('a[href^="tel:"]').attr('href','tel:'+contact.phone);
  $('a[href*="zalo.me"]').attr('href','https://zalo.me/'+contact.phone);
  $('a[href^="mailto:"]').attr('href','mailto:'+contact.email);
  $('a[href*="maps.app.goo.gl"],a[href*="google.com/maps"]').attr('href',contact.maps);
 }
 let result=$.html();
 if(contact)result=result.replace(/0898[ .]?876[ .]?565|0898876565/g,contact.phoneDisplay).replace(/kinhdoanh@cokhitonghop\.vn/gi,contact.email);
 return result;
}
