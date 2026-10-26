// Browser-only interactions. No API, tracking, form submission or server runtime.
(() => {
 'use strict';
 const menu=document.querySelector('.kh-menu-toggle'),nav=document.querySelector('#kh-navigation');
 function closeSubmenus(){nav?.querySelectorAll('.kh-sub-open').forEach(li=>{li.classList.remove('kh-sub-open');li.querySelector('.kh-sub-toggle')?.setAttribute('aria-expanded','false');});}
 function closeMenu(){menu?.setAttribute('aria-expanded','false');nav?.classList.remove('kh-open');closeSubmenus();}
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav?.classList.toggle('kh-open',open);if(!open)closeSubmenus();});
 nav?.querySelectorAll('li').forEach((li,index)=>{
  const sub=li.querySelector(':scope > ul'),a=li.querySelector('a');if(!sub||!a)return;
  const button=document.createElement('button');button.type='button';button.className='kh-sub-toggle';button.innerHTML='<svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 4 4 4-4"/></svg>';button.setAttribute('aria-label','Mở menu '+a.textContent.trim());button.setAttribute('aria-expanded','false');sub.id='static-submenu-'+index;button.setAttribute('aria-controls',sub.id);li.classList.add('kh-has-submenu');li.insertBefore(button,sub);
  const setOpen=open=>{if(open)closeSubmenus();button.setAttribute('aria-expanded',String(open));li.classList.toggle('kh-sub-open',open);};
  li.addEventListener('mouseenter',()=>{if(matchMedia('(min-width:1024px) and (hover:hover)').matches)setOpen(true);});
  li.addEventListener('mouseleave',()=>{if(matchMedia('(min-width:1024px) and (hover:hover)').matches&&!li.contains(document.activeElement))setOpen(false);});
  li.addEventListener('focusout',e=>{if(!li.contains(e.relatedTarget))setOpen(false);});
  button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';closeSubmenus();button.setAttribute('aria-expanded',String(open));li.classList.toggle('kh-sub-open',open);});
 });
 document.addEventListener('click',e=>{if(!e.target.closest('.kh-navrow'))closeMenu();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const inside=nav?.contains(document.activeElement);closeMenu();if(inside)menu?.focus();}});
 document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const query=form.querySelector('input').value.trim();if(query)location.href='/tim-kiem.html?q='+encodeURIComponent(query);}));
 const photo=document.querySelector('#kpd-main-photo'),link=document.querySelector('#kpd-main-link'),box=document.querySelector('.kpd-lightbox');
 document.querySelectorAll('.kpd-thumbnails button').forEach(button=>button.addEventListener('click',()=>{if(!photo||!link)return;photo.src=button.dataset.src;photo.alt=button.dataset.alt||photo.alt;link.href=button.dataset.src;document.querySelectorAll('.kpd-thumbnails button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
 if(photo&&link&&box){link.addEventListener('click',e=>{e.preventDefault();const large=box.querySelector('img');large.src=photo.src;large.alt=photo.alt;box.showModal();});box.querySelector('button')?.addEventListener('click',()=>box.close());box.addEventListener('close',()=>link.focus());box.addEventListener('click',e=>{if(e.target===box)box.close();});}
 document.querySelectorAll('.kct-map-select').forEach(button=>button.addEventListener('click',()=>{const frame=document.querySelector('#kct-map-frame');if(!frame)return;frame.src=button.dataset.src;frame.title=button.dataset.title;for(const [id,key] of [['kct-map-label','label'],['kct-map-address','address']]){const el=document.getElementById(id);if(el)el.textContent=button.dataset[key];}const mapLink=document.querySelector('#kct-map-link');if(mapLink)mapLink.href=button.dataset.map;document.querySelectorAll('.kct-map-select').forEach(b=>{b.setAttribute('aria-pressed',String(b===button));b.closest('.kct-workshop')?.classList.toggle('kct-selected',b===button);});}));
 const top=document.querySelector('.kh-home-top');top?.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
 const results=document.querySelector('#search-results');
 if(results){const query=new URLSearchParams(location.search).get('q')?.trim()||'';document.querySelector('#site-query').value=query;const status=document.querySelector('#search-status');const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
  if(!query)status.textContent='Nhập từ khóa để tìm sản phẩm, dịch vụ và bài viết.';
  else fetch('/search-index.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(items=>{const words=normalize(query).split(/\s+/);const found=items.filter(p=>words.every(w=>normalize(p.title+' '+p.description+' '+p.text).includes(w))).sort((a,b)=>Number(normalize(b.title).includes(normalize(query)))-Number(normalize(a.title).includes(normalize(query))));status.textContent=found.length?'Tìm thấy '+found.length+' kết quả cho “'+query+'”.':'Không tìm thấy kết quả. Hãy thử từ khóa ngắn hơn.';for(const item of found){const card=document.createElement('article'),heading=document.createElement('h2'),a=document.createElement('a'),p=document.createElement('p');a.href=item.url;a.textContent=item.title;p.textContent=item.description;heading.append(a);card.append(heading,p);results.append(card);}}).catch(()=>{status.textContent='Chưa tải được dữ liệu tìm kiếm. Vui lòng tải lại trang.';});
 }
})();
