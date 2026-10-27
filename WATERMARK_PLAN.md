# Kế hoạch thay watermark ảnh

Cập nhật: 2026-10-27.

## Nguyên tắc triển khai

1. Mỗi ảnh gốc chỉ xử lý một lần; mọi bài dùng chung ảnh đó sẽ tự nhận bản mới.
2. Chỉ xuất bản ảnh sau khi kiểm tra trực quan; ảnh AI làm đổi chi tiết cơ khí, sai tỷ lệ hoặc chèn viền sẽ bị loại.
3. Ảnh import gốc trong `public/media` luôn được giữ nguyên. Bản đạt yêu cầu ở `public/brand-media` và được ánh xạ khi build.
4. Mỗi đợt: xử lý ảnh → build → kiểm tra liên kết → kiểm tra trực quan trang bài viết → commit/push để Cloudflare Pages tự cập nhật.

## Tóm tắt danh mục

- 168 trang/bài có ảnh nội dung.
- 977 ảnh nội dung riêng biệt cần rà watermark.
- 214 ảnh được dùng ở từ hai trang trở lên, chỉ cần thay một lần.
- 333 ảnh đã có bản thay thế được duyệt.
- 258 ảnh đã kiểm tra, không có watermark cũ.

## Trạng thái ảnh đã duyệt

- [x] `/media/d36e8c20513199ad43f4.jpg` → `/brand-media/dragon-phoenix-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/e04e9c44a112030818d7.jpg` → `/brand-media/white-multi-panel-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/558f542c0eaee6cc35e6.jpg` → `/brand-media/black-floral-four-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/e38ebb41ec64ce18adf5.jpg` → `/brand-media/ornate-driveway-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/5d012cfb28b520893eb3.jpg` → `/brand-media/black-gold-four-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/c6cf7981625875bb6895.jpg` → `/brand-media/black-gold-residence-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/e13335e01a552df6e7f5.jpg` → `/brand-media/gray-medallion-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/cc4db1f76baf9368ebc5.jpg` → `/brand-media/tan-floral-door-vankim.png` — dùng ở 1 trang.
- [x] `/media/71d133bbab9bbcb9c453.jpg` → `/brand-media/mint-panel-door-vankim.png` — dùng ở 1 trang.
- [x] `/media/943c893c44ea10756cc6.jpg` → `/brand-media/black-gold-four-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/294de494d8c652a5dd91.jpg` → `/brand-media/four-panel-calligraphy-vankim.png` — dùng ở 1 trang.
- [x] `/media/a928a35d18f4e2563322.jpg` → `/brand-media/purple-louver-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/2d6ff1ee4e7186f51a22.jpg` → `/brand-media/black-floral-door-vankim.png` — dùng ở 1 trang.
- [x] `/media/f6c3576a656f92003a2a.jpg` → `/brand-media/white-circular-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/3814b15864d542d0ef14.jpg` → `/brand-media/gold-modern-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/165882f515e36a97bb0b.jpg` → `/brand-media/decorative-panel-bundle-vankim.png` — dùng ở 1 trang.
- [x] `/media/f5d0d58899883d4b01bd.jpg` → `/brand-media/gold-modern-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/656468719cc2eca6c6b8.jpg` → `/brand-media/four-panel-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/07188b77449f7d9d14e4.jpg` → `/brand-media/four-panel-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/5e953c15c22049f9614d.jpg` → `/brand-media/white-ornate-door-vankim.png` — dùng ở 1 trang.
- [x] `/media/3ac38d7beb51d9f590ac.jpg` → `/brand-media/black-gold-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/16facfac56c6d92fcdf3.jpg` → `/brand-media/ornate-workshop-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/1895fc43ea43967889df.jpg` → `/brand-media/flat-cut-gate-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/a6285b8040e73d9f65f0.jpg` → `/brand-media/gold-arched-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/b50ab8c9912f91574979.jpg` → `/brand-media/white-gold-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/56d54a65f5cc2754755d.jpg` → `/brand-media/black-floral-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/ead1ce8b72d369002c20.jpg` → `/brand-media/ornate-double-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/cf6711aaa9092f5e3c20.jpg` → `/brand-media/ornate-double-gate-vankim.png` — dùng ở 2 trang.
- [x] `/media/3dd055673da0e1b11f09.jpg` → `/brand-media/gold-decorative-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/b1a73e4c0aafc53b58db.jpg` → `/brand-media/black-ornate-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/9e0bd8a65ccfca0926db.jpg` → `/brand-media/industrial-blower-vankim.png` — dùng ở 1 trang.
- [x] `/media/28c494dc6ce52632a19b.jpg` → `/brand-media/press-brake-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/fd6a84ef6295b7d1a297.jpg` → `/brand-media/cnc-machining-vankim.png` — dùng ở 1 trang.
- [x] `/media/cb094e7a8af5077a7d1e.jpg` → `/brand-media/wrapped-metal-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/a2b25b93cb4cd9d25fcc.jpg` → `/brand-media/machined-brackets-vankim.png` — dùng ở 1 trang.
- [x] `/media/dc94a49ad479e46a148e.jpg` → `/brand-media/decorative-metal-panel-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/33a4b46521ee8f922086.jpg` → `/brand-media/stainless-sheet-boxes-vankim.png` — dùng ở 1 trang.
- [x] `/media/7227092ce6eaaa77e5f0.jpg` → `/brand-media/machined-flange-spools-vankim.png` — dùng ở 1 trang.
- [x] `/media/ed38f4d7073b9115ac37.jpg` → `/brand-media/stainless-sheet-fabrication-vankim.png` — dùng ở 1 trang.
- [x] `/media/18bf10687f26639196d3.jpg` → `/brand-media/stainless-fabricated-boxes-vankim.png` — dùng ở 1 trang.
- [x] `/media/4fa4c8f98433c7366f7c.jpg` → `/brand-media/stainless-cabinet-top-vankim.png` — dùng ở 1 trang.
- [x] `/media/6ef5a8536ac137b61f4d.jpg` → `/brand-media/stacked-angle-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/77b24c4aa19bdbff3b14.jpg` → `/brand-media/box-brackets-vankim.png` — dùng ở 1 trang.
- [x] `/media/c4c2949cd3260374955d.jpg` → `/brand-media/cad-fixture-green-vankim.png` — dùng ở 1 trang.
- [x] `/media/db9166da7901d65cb6d4.jpg` → `/brand-media/machined-fixtures-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/0b16643e2437c20543b7.jpg` → `/brand-media/galvanized-cabinet-vankim.png` — dùng ở 1 trang.
- [x] `/media/1b58e5a5e07932279e90.jpg` → `/brand-media/welded-flange-vankim.png` — dùng ở 1 trang.
- [x] `/media/86d98ba0dccb630d009c.jpg` → `/brand-media/stacked-sheet-tabs-vankim.png` — dùng ở 1 trang.
- [x] `/media/8499ddf3aa7b6499a67c.jpg` → `/brand-media/stainless-tray-holes-vankim.png` — dùng ở 1 trang.
- [x] `/media/10a82a56f217e928f50e.jpg` → `/brand-media/precision-machined-set-vankim.png` — dùng ở 1 trang.
- [x] `/media/079eb95b4139809abdf8.jpg` → `/brand-media/welded-flange-vankim.png` — dùng ở 2 trang.
- [x] `/media/30b4af50d839e643fb2a.jpg` → `/brand-media/platform-frame-vankim.png` — dùng ở 1 trang.
- [x] `/media/08eba1720a856ea6639c.jpg` → `/brand-media/black-gears-vankim.png` — dùng ở 2 trang.
- [x] `/media/98ec29bac9bcabd26333.jpg` → `/brand-media/gear-rack-vankim.png` — dùng ở 1 trang.
- [x] `/media/65433e293041e47a31ea.jpg` → `/brand-media/machined-components-collage-vankim.png` — dùng ở 2 trang.
- [x] `/media/4b6789db00ddda99ae48.jpg` → `/brand-media/mechanical-products-catalog-vankim.png` — dùng ở 1 trang.
- [x] `/media/6c6a9f7f6cb050916939.jpg` → `/brand-media/precision-parts-collage-watermark-vankim.png` — dùng ở 2 trang.
- [x] `/media/411998d8b4f9de858d04.jpg` → `/brand-media/precision-parts-collage-watermark-vankim.png` — dùng ở 2 trang.
- [x] `/media/cacf73f58ca8294b55cf.jpg` → `/brand-media/stainless-tank-watermark-vankim.png` — dùng ở 2 trang.
- [x] `/media/ef4071dc4c5c86dab9de.jpg` → `/brand-media/precision-cylinders-watermark-vankim.png` — dùng ở 3 trang.
- [x] `/media/e46825f8b74182851503.jpg` → `/brand-media/formed-cones-rings-vankim.png` — dùng ở 1 trang.
- [x] `/media/85a0ccb65a8a41a63a8b.jpg` → `/brand-media/stainless-cabinets-cones-vankim.png` — dùng ở 1 trang.
- [x] `/media/4f0229991e63e2e861ec.jpg` → `/brand-media/cnc-cutting-display-vankim.png` — dùng ở 1 trang.
- [x] `/media/f33ae0ce92c1176c2a95.jpg` → `/brand-media/wrapped-white-enclosures-vankim.png` — dùng ở 1 trang.
- [x] `/media/3f8c57cc52b12b2a5f85.jpg` → `/brand-media/stainless-cabinet-press-brake-vankim.png` — dùng ở 1 trang.
- [x] `/media/c99b3ed6dc9bd4c11d84.jpg` → `/brand-media/perforated-stainless-enclosures-vankim.png` — dùng ở 1 trang.
- [x] `/media/45c81080f0d11399bf94.jpg` → `/brand-media/laser-bed-metal-brackets-vankim.png` — dùng ở 1 trang.
- [x] `/media/249b804599ee9ac6bc62.jpg` → `/brand-media/stacked-bent-metal-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/882b7b23a4d9a094e8e5.jpg` → `/brand-media/stacked-white-metal-cabinets-vankim.png` — dùng ở 1 trang.
- [x] `/media/3f58af78182e4ecd7d09.jpg` → `/brand-media/stainless-enclosure-press-brake-vankim.png` — dùng ở 1 trang.
- [x] `/media/609aa59dc9cc851647de.jpg` → `/brand-media/precision-machined-parts-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/79579bb5b708257bb0bf.jpg` → `/brand-media/ornamental-laser-railing-vankim.png` — dùng ở 1 trang.
- [x] `/media/e446673d6c599f4a91cf.jpg` → `/brand-media/ornate-gate-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/a2c585436a350d6d59d1.jpg` → `/brand-media/decorative-panel-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/ceeaae879816a259c9f6.jpg` → `/brand-media/decorative-screen-vankim.png` — dùng ở 1 trang.
- [x] `/media/f7e15f9e60c756883a6f.jpg` → `/brand-media/machined-covers-vankim.png` — dùng ở 1 trang.
- [x] `/media/5e2f88769eb7d1a7c9a4.jpg` → `/brand-media/stacked-metal-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/421992b47bce74a3de09.jpg` → `/brand-media/laser-sparks-vankim.png` — dùng ở 2 trang.
- [x] `/media/f7ae1c8505e97e42901e.jpg` → `/brand-media/stacked-metal-boxes-vankim.png` — dùng ở 1 trang.
- [x] `/media/9ea59647ed571245ab7e.jpg` → `/brand-media/laser-cutting-bed-vankim.png` — dùng ở 1 trang.
- [x] `/media/5e5a248fa093f3747849.jpg` → `/brand-media/laser-sparks-vankim.png` — dùng ở 1 trang.
- [x] `/media/8f16fe359d481a268fc1.jpg` → `/brand-media/steel-plate-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/a918b716da99f9b0de06.jpg` → `/brand-media/laser-cut-parts-stack-vankim.png` — dùng ở 1 trang.
- [x] `/media/4314082e0eb7b3f4038f.jpg` → `/brand-media/sheet-metal-stack-vankim.png` — dùng ở 1 trang.
- [x] `/media/38303a959bee96135059.jpg` → `/brand-media/aluminum-sheet-stack-vankim.png` — dùng ở 1 trang.
- [x] `/media/b3a45888d6475e5c7e93.jpg` → `/brand-media/stacked-cut-bars-vankim.png` — dùng ở 1 trang.
- [x] `/media/56c4ec0c1b03c5b3d831.jpg` → `/brand-media/sheet-metal-cart-vankim.png` — dùng ở 1 trang.
- [x] `/media/0dce082da60e19e4d32a.jpg` → `/brand-media/laser-cutting-machine-vankim.png` — dùng ở 1 trang.
- [x] `/media/8a83df3fbdf1d968d1b7.jpg` → `/brand-media/laser-cnc-bed-vankim.png` — dùng ở 1 trang.
- [x] `/media/62e3e46d2ac4096126d9.jpg` → `/brand-media/decorative-cut-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/e99ca40a78f78679bd79.jpg` → `/brand-media/stainless-bent-enclosures-vankim.png` — dùng ở 2 trang.
- [x] `/media/91fb4125d34ffc08a931.jpg` → `/brand-media/sheet-metal-stacks-vankim.png` — dùng ở 1 trang.
- [x] `/media/b456f9c134e6c1733a88.jpg` → `/brand-media/fabricated-sheet-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/3e42cfeaaa39b79ca3ad.jpg` → `/brand-media/sheet-metal-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/988f7b97f47950154a74.jpg` → `/brand-media/formed-metal-profiles-vankim.png` — dùng ở 1 trang.
- [x] `/media/147f1c9ab2a233152765.jpg` → `/brand-media/bent-metal-boxes-vankim.png` — dùng ở 1 trang.
- [x] `/media/cfd1a772ec42713c301b.jpg` → `/brand-media/bent-metal-brackets-vankim.png` — dùng ở 1 trang.
- [x] `/media/e4e45af1e951eb56fb34.jpg` → `/brand-media/raw-sheet-stock-vankim.png` — dùng ở 1 trang.
- [x] `/media/f7045ce44316d28577fe.jpg` → `/brand-media/stainless-bent-enclosures-vankim.png` — dùng ở 1 trang.
- [x] `/media/b50ebbc2fa817e8b7cb0.jpg` → `/brand-media/formed-channel-detail-vankim.png` — dùng ở 1 trang.
- [x] `/media/d8f0a82f6a72ae9b04c0.jpg` → `/brand-media/sheet-stack-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/c6bfcbf0eaabcca1a565.jpg` → `/brand-media/sheet-fabrication-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/4f73ff450b04f1614db9.jpg` → `/brand-media/bent-panel-stack-vankim.png` — dùng ở 1 trang.
- [x] `/media/0e1385e23e18d0b886cc.jpg` → `/brand-media/bent-angle-stack-vankim.png` — dùng ở 1 trang.
- [x] `/media/911ee357bb1fe471218f.jpg` → `/brand-media/steel-plate-stacks-vankim.png` — dùng ở 2 trang.
- [x] `/media/8aa33d11294e80797de1.jpg` → `/brand-media/precision-machined-assembly-vankim.png` — dùng ở 2 trang.
- [x] `/media/6774876211ec32a5a94c.jpg` → `/brand-media/machined-ball-joint-vankim.png` — dùng ở 2 trang.
- [x] `/media/4ec7d43d7367d35e28f6.jpg` → `/brand-media/machined-gears-vankim.png` — dùng ở 2 trang.
- [x] `/media/ca7e5fc0a3c490b2a0a5.jpg` → `/brand-media/machined-bushings-set-vankim.png` — dùng ở 2 trang.
- [x] `/media/f46c9aa9c03b72204fb1.jpg` → `/brand-media/precision-machined-assembly-vankim.png` — dùng ở 2 trang.
- [x] `/media/35457470316426411733.jpg` → `/brand-media/machined-bushings-set-vankim.png` — dùng ở 1 trang.
- [x] `/media/0acb1b7bda1c1bc532ca.jpg` → `/brand-media/machined-fixture-vankim.png` — dùng ở 1 trang.
- [x] `/media/4fe696e6506b3793dcb0.jpg` → `/brand-media/gear-transmission-collage-vankim.png` — dùng ở 2 trang.
- [x] `/media/fc305d8e37b563d086d7.jpg` → `/brand-media/machining-workshop-banner-vankim.png` — dùng ở 2 trang.
- [x] `/media/471d63603ac9f91d0461.jpg` → `/brand-media/fabricated-frame-vankim.png` — dùng ở 1 trang.
- [x] `/media/e27816a9d49aca2104cf.jpg` → `/brand-media/precision-flanges-vankim.png` — dùng ở 1 trang.
- [x] `/media/66a59d67051dc26fdefa.jpg` → `/brand-media/machined-bushings-vankim.png` — dùng ở 1 trang.
- [x] `/media/886b69e9d787e1f2b86b.jpg` → `/brand-media/precision-components-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/f186a33fd4151a6027cb.jpg` → `/brand-media/precision-bushings-vankim.png` — dùng ở 1 trang.
- [x] `/media/7533735140ab234e2c22.jpg` → `/brand-media/precision-parts-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/d506a6b8f1289184dc3f.jpg` → `/brand-media/formed-metal-cabinets-vankim.png` — dùng ở 1 trang.
- [x] `/media/f94175458edd975fbed2.jpg` → `/brand-media/precision-machined-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/7e3e766e15e9cf65f700.jpg` → `/brand-media/cnc-workshop-green-carts-vankim.png` — dùng ở 1 trang.
- [x] `/media/5796c371d1a5d3021d29.jpg` → `/brand-media/precision-parts-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/f12a6e1f3117c315c192.jpg` → `/brand-media/cnc-milling-detail-vankim.png` — dùng ở 1 trang.
- [x] `/media/8f0aaf9821de7cb16c0d.jpg` → `/brand-media/precision-parts-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/803aec19a16875faba96.jpg` → `/brand-media/stacked-sheet-sections-vankim.png` — dùng ở 1 trang.
- [x] `/media/6157066f624e4982f9ee.jpg` → `/brand-media/precision-parts-white-vankim.png` — dùng ở 2 trang.
- [x] `/media/637abebdf65db4e2cd06.jpg` → `/brand-media/tool-holders-set-vankim.png` — dùng ở 1 trang.
- [x] `/media/c474b73c9b62dabfb454.jpg` → `/brand-media/stainless-boxes-vankim.png` — dùng ở 1 trang.
- [x] `/media/f5429c8c006309b89404.jpg` → `/brand-media/cnc-cutting-bed-detail-vankim.png` — dùng ở 1 trang.
- [x] `/media/5973841e3b162d1a5062.jpg` → `/brand-media/machined-circular-fixtures-vankim.png` — dùng ở 1 trang.
- [x] `/media/aa066151f2101e564d5c.jpg` → `/brand-media/tooling-table-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/aae3b1cff37897cf23e5.jpg` → `/brand-media/sheet-metal-frames-vankim.png` — dùng ở 1 trang.
- [x] `/media/ee31f30db8e09b160ac7.jpg` → `/brand-media/aluminum-frame-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/506ab8f4198e82cab451.jpg` → `/brand-media/cnc-lathe-green-vankim.png` — dùng ở 1 trang.
- [x] `/media/261c8ff095dbdc77b74e.jpg` → `/brand-media/large-lathe-ring-vankim.png` — dùng ở 1 trang.
- [x] `/media/32c977ff519d9a24f255.jpg` → `/brand-media/cnc-machine-old-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/f43ed33991c893507ac8.jpg` → `/brand-media/threaded-fittings-vankim.png` — dùng ở 1 trang.
- [x] `/media/a76796af22c3e5a7e73a.jpg` → `/brand-media/tooling-machine-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/686a79b17eb37dd1d05d.jpg` → `/brand-media/wrapped-fabrication-equipment-vankim.png` — dùng ở 1 trang.
- [x] `/media/d42d7de3f5b0d63a757c.jpg` → `/brand-media/sheet-metal-enclosures-vankim.png` — dùng ở 1 trang.
- [x] `/media/115953dbb8a3be4b2c93.jpg` → `/brand-media/laser-cutting-sparks-vankim.png` — dùng ở 1 trang.
- [x] `/media/249dc0e97e376736330f.jpg` → `/brand-media/machined-plate-vankim.png` — dùng ở 1 trang.
- [x] `/media/f628b02ceb5580cc737a.jpg` → `/brand-media/laser-cutting-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/78f4af257629173a9986.jpg` → `/brand-media/laser-machine-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/f3975fd42884a23e439f.jpg` → `/brand-media/perforated-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/cd521a1598723c27efbd.jpg` → `/brand-media/laser-brackets-vankim.png` — dùng ở 1 trang.
- [x] `/media/c5e576a33412824e740e.jpg` → `/brand-media/laser-machine-wide-vankim.png` — dùng ở 1 trang.
- [x] `/media/07dc4d94a5c30a3817a6.jpg` → `/brand-media/laser-workshop-vankim.png` — dùng ở 2 trang.
- [x] `/media/1627d889f5c6c3548899.jpg` → `/brand-media/laser-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/905d4d978f9e395edf71.jpg` → `/brand-media/cnc-components-vankim.png` — dùng ở 2 trang.
- [x] `/media/cfe0560147be47966c26.jpg` → `/brand-media/cnc-machining-tool-vankim.png` — dùng ở 1 trang.
- [x] `/media/e7ab2f1693dfc6118641.jpg` → `/brand-media/machined-plate-array-vankim.png` — dùng ở 1 trang.
- [x] `/media/18a1646973d8311ef626.jpg` → `/brand-media/cnc-milling-vankim.png` — dùng ở 1 trang.
- [x] `/media/c3b93936129350151c27.jpg` → `/brand-media/machined-components-collage-vankim.png` — dùng ở 1 trang.
- [x] `/media/745b0fbd95d0ac280c21.jpg` → `/brand-media/cnc-machining-tool-vankim.png` — dùng ở 2 trang.
- [x] `/media/09954731739ff4badde3.jpg` → `/brand-media/stainless-machine-vankim.png` — dùng ở 2 trang.
- [x] `/media/71ed0ce7244877f16528.jpg` → `/brand-media/workshop-wheel-machines-vankim.png` — dùng ở 1 trang.
- [x] `/media/e414b95a5f27f8cdfb2b.jpg` → `/brand-media/stainless-industrial-machine-vankim.png` — dùng ở 3 trang.
- [x] `/media/ba90ffde7b1079215d46.jpg` → `/brand-media/precision-machined-rings-vankim.png` — dùng ở 5 trang.
- [x] `/media/54d9490f2333b740a397.jpg` → `/brand-media/precision-machined-bushings-vankim.png` — dùng ở 2 trang.
- [x] `/media/35fa08ef4bbffa979e10.jpg` → `/brand-media/cnc-floral-panel-vankim.png` — dùng ở 2 trang.
- [x] `/media/abab0d2bcb783b8cd7bf.jpg` → `/brand-media/cnc-bird-bamboo-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/4aa69ecb877a23c3153f.jpg` → `/brand-media/cnc-bronze-geometric-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/8de86a515dd52ee0ef7e.jpg` → `/brand-media/cnc-black-gold-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/0c7cacf865601f24ae2e.jpg` → `/brand-media/cnc-residential-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/661eaf30dd477a7259dc.jpg` → `/brand-media/cnc-gold-ornate-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/03c5b47c216c77100e8a.jpg` → `/brand-media/cnc-bronze-bird-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/76747ed8f8f94436c545.jpg` → `/brand-media/cnc-entry-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/35e6d0711e7ed3c9c68f.jpg` → `/brand-media/cnc-ornate-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/c737a882579406cf2f09.jpg` → `/brand-media/laser-machine-cutting-vankim.png` — dùng ở 1 trang.
- [x] `/media/ad073c3d90ce57442ba7.jpg` → `/brand-media/cnc-irregular-cut-panel-vankim.png` — dùng ở 2 trang.
- [x] `/media/2fd5dcbbd1f550ad03c5.jpg` → `/brand-media/cnc-floral-panel-floor-vankim.png` — dùng ở 1 trang.
- [x] `/media/64bc7f488711bcbf2d6d.jpg` → `/brand-media/cnc-scrollwork-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/f033fb99249398a69dd6.jpg` → `/brand-media/cnc-interlaced-screen-vankim.png` — dùng ở 1 trang.
- [x] `/media/1c2fcbf1328840d922fe.jpg` → `/brand-media/cnc-peacock-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/19d6442c35c1065f0f08.jpg` → `/brand-media/cnc-bird-floral-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/a72993021efbed4a5bbb.jpg` → `/brand-media/perforated-bent-sheets-vankim.png` — dùng ở 1 trang.
- [x] `/media/c67e13e6170d652c0c1d.jpg` → `/brand-media/cnc-city-map-art-vankim.png` — dùng ở 1 trang.
- [x] `/media/6733c77a551b4367e463.jpg` → `/brand-media/laser-cutting-bed-patterns-vankim.png` — dùng ở 1 trang.
- [x] `/media/942c7203b02b155251a4.jpg` → `/brand-media/cnc-pattern-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/17b81bd0491bee823702.jpg` → `/brand-media/cnc-stacked-ornate-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/9b23ab92762174a44542.jpg` → `/brand-media/cnc-ornate-gate-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/4869d41d4c0ff6f22a04.jpg` → `/brand-media/cnc-garden-screen-vankim.png` — dùng ở 1 trang.
- [x] `/media/4761d5b9cea3d2f36b0a.jpg` → `/brand-media/cnc-decorative-gate-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/5d6570f333fec51662fd.jpg` → `/brand-media/cnc-scrollwork-hanging-vankim.png` — dùng ở 1 trang.
- [x] `/media/351b04846c93bfb99e75.jpg` → `/brand-media/cnc-ornate-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/148cf5deb8daeb6ee92e.jpg` → `/brand-media/laser-metal-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/edfcb9597003e3fdd4b7.png` → `/static/vankim-logo.svg` — dùng ở 30 trang.
- [x] `/media/f6b5bf15d8acf9f7a1ba.png` → `/static/vankim-logo.svg` — dùng ở 168 trang.
- [x] `/media/9712588fc7222c11ea41.jpg` → `/brand-media/sprocket-vankim.png` — dùng ở 4 trang.
- [x] `/media/01173f717f55732537f7.jpg` → `/brand-media/laser-star-vankim.png` — dùng ở 1 trang.
- [x] `/media/0285a9cb866c70d16bc9.jpg` → `/brand-media/fabrication-table-vankim.png` — dùng ở 2 trang.
- [x] `/media/03714822033e8dcf4b0f.jpg` → `/brand-media/machined-plate-vankim.png` — dùng ở 2 trang.
- [x] `/media/04338b775afd8525979d.jpg` → `/brand-media/laser-cutting-vankim.png` — dùng ở 1 trang.
- [x] `/media/f5557990635b2c62afd8.jpg` → `/brand-media/laser-workshop-vankim.png` — dùng ở 9 trang.
- [x] `/media/642c65adf2849eb9c943.jpg` → `/brand-media/laser-brackets-vankim.png` — dùng ở 9 trang.
- [x] `/media/1e102039e6688be5f930.jpg` → `/brand-media/laser-decorative-panel-vankim.png` — dùng ở 9 trang.
- [x] `/media/10815f2eddce66ae6cce.jpg` → `/brand-media/laser-metal-parts-vankim.png` — dùng ở 9 trang.
- [x] `/media/dff6c9f56459b8280ec2.jpg` → `/brand-media/laser-product-arcs-vankim.png` — dùng ở 9 trang.
- [x] `/media/16e74ea51d6c27014a88.jpg` → `/brand-media/machine-washer-vankim.png` — dùng ở 3 trang.
- [x] `/media/399cb05ca63ca14a4944.jpg` → `/brand-media/machine-washer-wide-vankim.png` — dùng ở 4 trang.
- [x] `/media/fa38c829b1107e592a22.jpg` → `/brand-media/red-industrial-machine-vankim.png` — dùng ở 4 trang.
- [x] `/media/dbecbd957dee7ddd6522.jpg` → `/brand-media/metal-cylinder-vankim.png` — dùng ở 1 trang.
- [x] `/media/1ef599c9c4fcd126675c.jpg` → `/brand-media/bent-metal-sheets-vankim.png` — dùng ở 1 trang.
- [x] `/media/bd126ec2f3d9885b112f.jpg` → `/brand-media/wire-mesh-roll-vankim.png` — dùng ở 1 trang.
- [x] `/media/38b4c8763fb628e03e84.jpg` → `/brand-media/laser-cutting-service-vankim.png` — dùng ở 4 trang.
- [x] `/media/eb746fd269ddfb7de7c8.jpg` → `/brand-media/laser-product-collage-vankim.png` — dùng ở 8 trang.
- [x] `/media/3e186babe9485eb235e6.jpg` → `/brand-media/laser-products-collage-vankim.png` — dùng ở 9 trang.
- [x] `/media/58844b6d30a7add3345e.jpg` → `/brand-media/laser-product-arcs-vankim.png` — dùng ở 8 trang.
- [x] `/media/f88fbb2e9a766116a6cf.jpg` → `/brand-media/laser-four-panel-vankim.png` — dùng ở 5 trang.
- [x] `/media/d05d410f8967ac182723.jpg` → `/brand-media/roller-machine-vankim.png` — dùng ở 1 trang.
- [x] `/media/50ce5b52986c53c7d8a9.jpg` → `/brand-media/roller-polished-vankim.png` — dùng ở 1 trang.
- [x] `/media/154355ea77d42dfa475c.jpg` → `/brand-media/roller-machine-vankim.png` — dùng ở 1 trang.
- [x] `/media/cff2f7defd8593126c93.jpg` → `/brand-media/rulo-orange-endcap-vankim.png` — dùng ở 1 trang.
- [x] `/media/422716d5085affb20693.jpg` → `/brand-media/rulo-polished-wide-vankim.png` — dùng ở 1 trang.
- [x] `/media/a0e2eeaa10e2f1b491b7.jpg` → `/brand-media/screw-conveyor-illustration-vankim.png` — dùng ở 1 trang.
- [x] `/media/51b9786ffb9a295985d7.jpg` → `/brand-media/screw-conveyor-illustration-vankim.png` — dùng ở 1 trang.
- [x] `/media/cab2c1ad6fac1c17de2e.jpg` → `/brand-media/screw-conveyor-incline-vankim.png` — dùng ở 1 trang.
- [x] `/media/0372abc368e5f2b57701.jpg` → `/brand-media/screw-conveyor-wide-vankim.png` — dùng ở 1 trang.
- [x] `/media/a79c09b1c6a4d7f2684e.jpg` → `/brand-media/screw-conveyor-drawing-vankim.png` — dùng ở 2 trang.
- [x] `/media/1528945f271fc1f7f906.jpg` → `/brand-media/screw-conveyor-detail-vankim.png` — dùng ở 1 trang.
- [x] `/media/1843670e515a58969b70.jpg` → `/brand-media/roller-conveyors-vankim.png` — dùng ở 3 trang.
- [x] `/media/bacf20062a950ac18b8b.jpg` → `/brand-media/mesh-conveyor-vankim.png` — dùng ở 2 trang.
- [x] `/media/a7bce9d62e21d62ac5cf.jpg` → `/brand-media/gear-catalogue-vankim.png` — dùng ở 2 trang.
- [x] `/media/7089bc522119e1100672.jpg` → `/brand-media/gear-catalogue-vankim.png` — dùng ở 4 trang.
- [x] `/media/d3ab39997479c6848498.jpg` → `/brand-media/steel-frame-vankim.png` — dùng ở 3 trang.
- [x] `/media/bffbf2e25cbab6cd29de.jpg` → `/brand-media/industrial-hopper-vankim.png` — dùng ở 3 trang.
- [x] `/media/6bd7044181296be5a385.jpg` → `/brand-media/milled-metal-part-vankim.png` — dùng ở 3 trang.
- [x] `/media/8f0a38edd688441d9737.jpg` → `/brand-media/milled-metal-part-vankim.png` — dùng ở 4 trang.
- [x] `/media/13f80559255f88932bfd.jpg` → `/brand-media/turned-tooling-vankim.png` — dùng ở 3 trang.
- [x] `/media/bbe296bdcb8b455a96fd.jpg` → `/brand-media/turned-tooling-vankim.png` — dùng ở 4 trang.
- [x] `/media/ded3086a5d64f869b7b0.jpg` → `/brand-media/mesh-conveyor-wide-vankim.png` — dùng ở 3 trang.
- [x] `/media/2e03db663ccd7dc0382e.jpg` → `/brand-media/mesh-belt-portrait-vankim.png` — dùng ở 1 trang.
- [x] `/media/dc714c011cfec478da17.jpg` → `/brand-media/stainless-bent-brackets-vankim.png` — dùng ở 4 trang.
- [x] `/media/8414135cf4f93920c224.jpg` → `/brand-media/stainless-profiles-vankim.png` — dùng ở 4 trang.
- [x] `/media/3c543508894869dfc645.jpg` → `/brand-media/inbox-bent-parts-vankim.png` — dùng ở 3 trang.
- [x] `/media/b36b3b61614366ea5f26.jpg` → `/brand-media/inbox-panels-vankim.png` — dùng ở 2 trang.
- [x] `/media/e24964c3f11bd2033809.jpg` → `/brand-media/laser-products-collage-vankim.png` — dùng ở 4 trang.
- [x] `/media/d27e84a8c4ebd4a471a1.jpg` → `/brand-media/laser-parts-collage-vankim.png` — dùng ở 2 trang.
- [x] `/media/81f820a748b064242080.jpg` → `/brand-media/laser-parts-premium-collage-vankim.png` — dùng ở 2 trang.
- [x] `/media/7c370fa715d15643ae82.jpg` → `/brand-media/laser-steel-plates-vankim.png` — dùng ở 2 trang.
- [x] `/media/0873059bdda75a0994d2.jpg` → `/brand-media/laser-cut-components-vankim.png` — dùng ở 1 trang.
- [x] `/media/b49a8ac61c14cd00816d.jpg` → `/brand-media/laser-stacked-components-vankim.png` — dùng ở 1 trang.
- [x] `/media/6e0272bf6e4a45614b95.jpg` → `/brand-media/laser-machine-parts-vankim.png` — dùng ở 2 trang.
- [x] `/media/9cb3ea1fd5e4adc1f9ae.jpg` → `/brand-media/laser-precision-parts-vankim.png` — dùng ở 5 trang.
- [x] `/media/24405b6e35a3dea642d3.jpg` → `/brand-media/laser-pattern-gate-vankim.png` — dùng ở 2 trang.
- [x] `/media/2036e36b7d4a17a14603.jpg` → `/brand-media/laser-pattern-bird-vankim.png` — dùng ở 5 trang.
- [x] `/media/c27f115857ef411019ce.jpg` → `/brand-media/laser-pattern-floral-vankim.png` — dùng ở 6 trang.
- [x] `/media/357807ae23edb6a4af74.jpg` → `/brand-media/laser-decorative-interior-vankim.png` — dùng ở 1 trang.
- [x] `/media/9d19af0cdd9dba5631f4.jpg` → `/brand-media/laser-floral-panel-vankim.png` — dùng ở 2 trang.
- [x] `/media/8016bd8017f4581f6eed.jpg` → `/brand-media/laser-ornamental-screen-vankim.png` — dùng ở 1 trang.
- [x] `/media/174687b3bcb2586ee6f4.jpg` → `/brand-media/laser-decorative-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/afe5dc3faba54d720d10.jpg` → `/brand-media/laser-floral-railing-vankim.png` — dùng ở 2 trang.
- [x] `/media/4d103b1c67ac92d84cb4.jpg` → `/brand-media/laser-ornamental-panel-vankim.png` — dùng ở 2 trang.
- [x] `/media/d35fb5e6831704b3dedf.jpg` → `/brand-media/laser-decorative-panel-grid-vankim.png` — dùng ở 1 trang.
- [x] `/media/b657e52895acac890965.jpg` → `/brand-media/laser-steel-bracket-vankim.png` — dùng ở 5 trang.
- [x] `/media/af41f9cded8dc65c715a.jpg` → `/brand-media/laser-steel-frame-vankim.png` — dùng ở 4 trang.
- [x] `/media/9d17b5768eb97ec94b0c.jpg` → `/brand-media/laser-stainless-bracket-vankim.png` — dùng ở 4 trang.
- [x] `/media/f9cfa2fee9bcc68e35c9.jpg` → `/brand-media/laser-steel-brackets-vankim.png` — dùng ở 4 trang.
- [x] `/media/aaf240ed9a9a7adef4cc.jpg` → `/brand-media/laser-product-arcs-vankim.png` — dùng ở 5 trang.
- [x] `/media/285babd3dfdd3f5ea636.jpg` → `/brand-media/laser-hanging-plates-vankim.png` — dùng ở 4 trang.
- [x] `/media/964660ad114a6fe3f11d.jpg` → `/brand-media/laser-sheet-patterns-vankim.png` — dùng ở 1 trang.
- [x] `/media/908bcf68da6b8cac8078.jpg` → `/brand-media/laser-stacked-sheets-vankim.png` — dùng ở 1 trang.
- [x] `/media/64eddab0b6928f1e1ba5.jpg` → `/brand-media/laser-flat-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/482dae7218cd172f0efd.jpg` → `/brand-media/laser-sheet-closeup-vankim.png` — dùng ở 1 trang.
- [x] `/media/a0f9f16c1b0544677ac9.jpg` → `/brand-media/laser-sheet-nesting-vankim.png` — dùng ở 4 trang.
- [x] `/media/8e5919dd228e442e52e8.jpg` → `/brand-media/laser-ornamental-sheet-vankim.png` — dùng ở 1 trang.
- [x] `/media/8338d1543970974f2343.jpg` → `/brand-media/laser-sheet-parts-vankim.png` — dùng ở 3 trang.
- [x] `/media/2e185321aed1f7445453.jpg` → `/brand-media/laser-cutting-sparks-vankim.png` — dùng ở 1 trang.
- [x] `/media/7141a426acbca4f43c5a.jpg` → `/brand-media/laser-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/80b278cea0cd2dbba2e1.jpg` → `/brand-media/laser-workshop-portrait-vankim.png` — dùng ở 1 trang.
- [x] `/media/a79843e83b01e2a29174.jpg` → `/brand-media/laser-decorative-sheet-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/12f6eb58c2e87bad56a0.jpg` → `/brand-media/laser-cutting-machine-vankim.png` — dùng ở 1 trang.
- [x] `/media/e364c097c7470ec35970.jpg` → `/brand-media/steel-sheet-laser-patterns-vankim.png` — dùng ở 1 trang.
- [x] `/media/dce1d3762f1fcc074413.jpg` → `/brand-media/steel-sheet-floral-laser-vankim.png` — dùng ở 1 trang.
- [x] `/media/70249acd540d50d6dfc6.jpg` → `/brand-media/steel-sheet-floral-machine-vankim.png` — dùng ở 1 trang.
- [x] `/media/6900240af67277d9e081.jpg` → `/brand-media/hopper-tower-vankim.png` — dùng ở 5 trang.
- [x] `/media/a7b38f570a8114064666.jpg` → `/brand-media/hopper-enclosure-vankim.png` — dùng ở 1 trang.
- [x] `/media/6d2e490d34883790db7b.jpg` → `/brand-media/hopper-workshop-vankim.png` — dùng ở 1 trang.
- [x] `/media/1be635151db24eb88c81.jpg` → `/brand-media/gear-collection-vankim.png` — dùng ở 2 trang.
- [x] `/media/56c375bb5849e17ea70d.jpg` → `/brand-media/gear-rack-collection-vankim.png` — dùng ở 2 trang.
- [x] `/media/65ec900cfdce83d06b51.jpg` → `/brand-media/gear-set-vankim.png` — dùng ở 2 trang.
- [x] `/media/24ccdd2007a9d8290e88.jpg` → `/brand-media/gear-collection-vankim.png` — dùng ở 2 trang.
- [x] `/media/367698abbc96ab85f5c4.jpg` → `/brand-media/three-gears-vankim.png` — dùng ở 2 trang.
- [x] `/media/7dc99e490d5f5452a63d.jpg` → `/brand-media/gear-grid-vankim.png` — dùng ở 3 trang.
- [x] `/media/838b230d9afcfdba416a.jpg` → `/brand-media/laser-engraved-nameplate-vankim.png` — dùng ở 1 trang.
- [x] `/media/b92485342fcc4d06b434.jpg` → `/brand-media/laser-marked-sample-plates-vankim.png` — dùng ở 1 trang.
- [x] `/media/baadad3a792ece532142.jpg` → `/brand-media/wheel-straightener-vankim.png` — dùng ở 1 trang.
- [x] `/media/e1c9e904ca0b7b7b9686.jpg` → `/brand-media/wheel-straightener-wrapped-vankim.png` — dùng ở 1 trang.
- [x] `/media/d31690b85badd7a66939.jpg` → `/brand-media/steel-pallet-workshop-vankim.png` — dùng ở 2 trang.
- [x] `/media/76d669a1528e10a3bc89.jpg` → `/brand-media/steel-pallet-outdoor-vankim.png` — dùng ở 1 trang.
- [x] `/media/352d5a3e14525dc25cdd.jpg` → `/brand-media/steel-pallet-tarp-vankim.png` — dùng ở 1 trang.
- [x] `/media/77d4f1907335b0f842eb.jpg` → `/brand-media/steel-pallet-shop-vankim.png` — dùng ở 1 trang.
- [x] `/media/823e07024c2d725ff282.jpg` → `/brand-media/steel-pallet-frame-vankim.png` — dùng ở 1 trang.
- [x] `/media/05acaebb1ed80157861b.jpg` → `/brand-media/cnc-milled-trim-vankim.png` — dùng ở 1 trang.
- [x] `/media/dfdaca47412ef41c226c.jpg` → `/brand-media/cnc-milled-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/cf8c270a6d665e814cf7.jpg` → `/brand-media/wash-machine-1-vankim.png` — dùng ở 1 trang.
- [x] `/media/b12efb1d9b30a977d9ab.jpg` → `/brand-media/wash-machine-2-vankim.png` — dùng ở 1 trang.
- [x] `/media/dd31735320be20f09891.jpg` → `/brand-media/wash-machine-3-vankim.png` — dùng ở 1 trang.
- [x] `/media/9cc9e154fe9deab021da.jpg` → `/brand-media/wash-machine-4-vankim.png` — dùng ở 1 trang.
- [x] `/media/dd5b485daad49398c4e8.jpg` → `/brand-media/wash-machine-5-vankim.png` — dùng ở 1 trang.
- [x] `/media/d4eee5ffd149295b73cc.jpg` → `/brand-media/wash-machine-6-vankim.png` — dùng ở 1 trang.
- [x] `/media/3e446d79c92f4d69912b.jpg` → `/brand-media/wash-machine-7-vankim.png` — dùng ở 1 trang.
- [x] `/media/56f12268dd113d79aa14.jpg` → `/brand-media/wash-machine-8-vankim.png` — dùng ở 1 trang.
- [x] `/media/c9842b6c6b7bdd15441e.jpg` → `/brand-media/wash-machine-9-vankim.png` — dùng ở 1 trang.
- [x] `/media/ecc3ad4a553f2f0bf6cc.jpg` → `/brand-media/wash-machine-10-vankim.png` — dùng ở 1 trang.
- [x] `/media/a13e966a2c010cb6cccc.jpg` → `/brand-media/wash-machine-11-vankim.png` — dùng ở 1 trang.
- [x] `/media/ec65fc7e0939ec5035b6.jpg` → `/brand-media/wash-machine-12-vankim.png` — dùng ở 1 trang.
- [x] `/media/8745794b9d4ca6a20a94.jpg` → `/brand-media/cnc-turned-tooling-set-vankim.png` — dùng ở 1 trang.
- [x] `/media/001ab6eb57b1ae18c50b.jpg` → `/brand-media/cnc-turned-tooling-closeup-vankim.png` — dùng ở 1 trang.
- [x] `/media/4786400505ff1fedbf73.jpg` → `/brand-media/cnc-turned-tooling-group-vankim.png` — dùng ở 1 trang.
- [x] `/media/4d01efa0978d21e09e78.jpg` → `/brand-media/laser-tiger-panel-vankim.png` — dùng ở 1 trang.
- [x] `/media/7edbb0e70fee2c0b7c3f.jpg` → `/brand-media/cnc-wildlife-panel-vankim.png` — dùng ở 2 trang.
- [x] `/media/c9d7b61daf91ea9f57a4.jpg` → `/brand-media/mechanical-services-banner-vankim.png` — dùng ở 12 trang.
- [x] `/media/0c9a317c947ffae226f0.jpg` → `/brand-media/laser-cut-stacked-parts-vankim.png` — dùng ở 2 trang.
- [x] `/media/a04eab3573aa39f7d28c.jpg` → `/brand-media/laser-cutting-bed-vankim.png` — dùng ở 2 trang.
- [x] `/media/96284729f5765cf01938.jpg` → `/brand-media/laser-cut-decorative-sheets-vankim.png` — dùng ở 4 trang.
- [x] `/media/dcee69a57523e490d22d.jpg` → `/brand-media/laser-cutting-machine-vankim.png` — dùng ở 2 trang.
- [x] `/media/52199ffe7af5ff4fd047.jpg` → `/brand-media/precision-machined-parts-vankim.png` — dùng ở 2 trang.
- [x] `/media/544d59e70f8802d5c6b1.jpg` → `/brand-media/precision-machined-parts-vankim.png` — dùng ở 1 trang.
- [x] `/media/f9b1a76fd44f65dd70f6.jpg` → `/brand-media/precision-welding-vankim.png` — dùng ở 1 trang.
- [x] `/media/4c5ba0dfcb57b901bea4.jpg` → `/brand-media/machined-flanges-vankim.png` — dùng ở 1 trang.
- [x] `/media/cf79b939336cf9130038.jpg` → `/brand-media/cnc-machined-brackets-vankim.png` — dùng ở 1 trang.
- [x] `/media/a671d23b3c91134af9e6.jpg` → `/brand-media/cnc-mold-machining-vankim.png` — dùng ở 1 trang.
- [x] `/media/6df049c2e39ddfe658f1.jpg` → `/brand-media/cnc-floral-rosette-vankim.png` — dùng ở 1 trang.
- [x] `/media/fba1cdb64b0d2a400c50.jpg` → `/brand-media/cnc-scrollwork-panels-vankim.png` — dùng ở 1 trang.
- [x] `/media/488dd7632624acd2c773.jpg` → `/brand-media/cnc-floral-gate-vankim.png` — dùng ở 1 trang.
- [x] `/media/e0b1d3b48021376ac890.jpg` → `/brand-media/cnc-bird-panel-vankim.png` — dùng ở 2 trang.
- [x] `/media/a66bb7ce3e1c30a1c65b.jpg` → `/brand-media/cnc-perforated-screen-vankim.png` — dùng ở 1 trang.
- [x] `/media/e22ac06c7a8c5bb0b80e.jpg` → `/brand-media/cnc-perforated-table-vankim.png` — dùng ở 1 trang.
- [x] `/media/3bb2a62a8b709eda7ab8.jpg` → `/brand-media/cnc-cutting-machine-vankim.png` — dùng ở 1 trang.

## Ảnh đã kiểm tra, không cần thay watermark

- [—] `/media/4fb79a41b9f6e95a2931.jpg` — Không có watermark cũ; kiểm tra trực quan.
- [—] `/media/c8c68556247f5168b3c1.jpg` — Không có watermark cũ; kiểm tra trực quan.
- [—] `/media/ba211835702618ea89b4.jpg` — Không có watermark cũ; kiểm tra trực quan.
- [—] `/media/bcba49443ba6898f90d7.jpg` — Không có watermark cũ; kiểm tra trực quan.
- [—] `/media/63776e72e22012fec9a0.jpg` — Không có watermark cũ; kiểm tra trực quan.
- [—] `/media/5bcc2e4ffa20b425675c.jpg` — Không có watermark cũ; kiểm tra trực quan.
- [—] `/media/5669dd1078d231acf765.jpg` — Không có watermark cũ; kiểm tra trực quan.
- [—] `/media/6b6158d97c6a5f66ef61.jpg` — Không có watermark cũ; trùng ảnh đã kiểm tra sạch.
- [—] `/media/7b55baec4f3ef557a227.jpg` — Không có watermark cũ.
- [—] `/media/561c9c9d3decc6447892.jpg` — Không có watermark cũ; trùng ảnh đã kiểm tra sạch.
- [—] `/media/f86785487090e4cb3f3c.jpg` — Không có watermark cũ.
- [—] `/media/bfca93091803bc7ddda5.jpg` — Không có watermark cũ.
- [—] `/media/176fc1d97cc670ed13fe.jpg` — Không có watermark cũ.
- [—] `/media/200aa2048a68b68cfde2.jpg` — Không có watermark cũ.
- [—] `/media/bea381620244a0d6344e.jpg` — Không có watermark cũ.
- [—] `/media/f84002730daf4f0d58b3.jpg` — Không có watermark cũ.
- [—] `/media/c0197b6b60a1081857e4.jpg` — Không có watermark cũ.
- [—] `/media/6a7fb8500249291d1d91.jpg` — Không có watermark cũ; trùng ảnh đã kiểm tra sạch.
- [—] `/media/30cab80c746895765a2a.jpg` — Không có watermark cũ.
- [—] `/media/c8f11f18d85fa62f116c.jpg` — Không có watermark cũ.
- [—] `/media/963553a0c36ed13c9cc1.jpg` — Không có watermark cũ.
- [—] `/media/6b7ccceb8cfd713c5bbd.jpg` — Không có watermark cũ.
- [—] `/media/e84021febf8f4a5253ee.jpg` — Không có watermark cũ.
- [—] `/media/d161d7b36644bfc03835.jpg` — Không có watermark cũ.
- [—] `/media/228f06c10d11183fb8ef.jpg` — Không có watermark cũ.
- [—] `/media/669a0815bb5a1437f1c5.jpg` — Không có watermark cũ.
- [—] `/media/88a5a48e610bcf895c51.jpg` — Không có watermark cũ; trùng ảnh bánh răng đã kiểm tra sạch.
- [—] `/media/9acf7ac629f9fe732ff2.jpg` — Không có watermark cũ.
- [—] `/media/aca79ae36ae65388b11f.jpg` — Không có watermark cũ.
- [—] `/media/577319a20518cdfc6959.jpg` — Không có watermark cũ.
- [—] `/media/5a4117edf87edb6e3609.jpg` — Không có watermark cũ.
- [—] `/media/88280b64dac0e6d32517.jpg` — Không có watermark cũ.
- [—] `/media/d66a4363b73cc3eba52d.jpg` — Không có watermark cũ.
- [—] `/media/001ad8ceb6cd664eb335.jpg` — Không có watermark cũ.
- [—] `/media/f87581452718abe2f9f3.jpg` — Không có watermark cũ.
- [—] `/media/ada7ad1afe6402bfb595.jpg` — Không có watermark cũ.
- [—] `/media/7fd873987f0280c5df6a.jpg` — Không có watermark cũ.
- [—] `/media/d3150a16b62ddc0b26bf.jpg` — Không có watermark cũ.
- [—] `/media/a6e1f7043338aa0fb873.jpg` — Không có watermark cũ.
- [—] `/media/ce77ed535254173906f2.jpg` — Không có watermark cũ.
- [—] `/media/569741c715e84585662d.jpg` — Không có watermark cũ.
- [—] `/media/7e9cba9253bc82f51e3a.jpg` — Không có watermark cũ.
- [—] `/media/1bc08a0615253173ae2e.jpg` — Không có watermark cũ.
- [—] `/media/9d98cf42344085f8095d.jpg` — Không có watermark cũ.
- [—] `/media/d6dab872282d42f9eed3.jpg` — Không có watermark cũ.
- [—] `/media/271dd0b7b4af0265c28c.jpg` — Không có watermark cũ; trùng ảnh đã kiểm tra sạch.
- [—] `/media/201658740c9e02fa7ac1.jpg` — Không có watermark cũ.
- [—] `/media/f0426842e31b3c58b540.jpg` — Không có watermark cũ.
- [—] `/media/eea9368c0b80a3340c8a.jpg` — Không có watermark cũ.
- [—] `/media/9f152749a0470ddaa310.jpg` — Không có watermark cũ.
- [—] `/media/9efdd25d0e03abca753d.jpg` — Không có watermark cũ.
- [—] `/media/40c7bc42863af2898653.jpg` — Không có watermark cũ.
- [—] `/media/4a99e18aaf30b20a7134.jpg` — Không có watermark cũ; trùng ảnh đã kiểm tra sạch.
- [—] `/media/1bd3b35cb4f5634ad412.jpg` — Không có watermark cũ; trùng ảnh đã kiểm tra sạch.
- [—] `/media/907165ac645d2ed2a3cd.jpg` — Không có watermark cũ.
- [—] `/media/23de97f884e480f7c3bc.jpg` — Không có watermark cũ.
- [—] `/media/8ee977b8b15f0e7f2d03.jpg` — Không có watermark cũ.
- [—] `/media/1d7bf7d83260ab7a3e53.jpg` — Không có watermark cũ.
- [—] `/media/e375d53730d0556db997.jpg` — Không có watermark cũ.
- [—] `/media/65196399a97e8b472e6d.jpg` — Không có watermark cũ.
- [—] `/media/ea0be8849abae7f34cc9.jpg` — Không có watermark cũ; mã 032-FMB22 là ký hiệu trên sản phẩm.
- [—] `/media/4a361c74f79401a86baa.jpg` — Không có watermark cũ.
- [—] `/media/e58ed2ec840462b914cf.jpg` — Không có watermark cũ.
- [—] `/media/7de3229efdc5c84e9a08.jpg` — Không có watermark cũ.
- [—] `/media/d0f05c194bdc2e73538c.jpg` — Không có watermark cũ.
- [—] `/media/401ea327b042781477db.jpg` — Không có watermark cũ.
- [—] `/media/fce9aad42e0625bc337e.jpg` — Không có watermark cũ.
- [—] `/media/535a2c446db5aae2fd70.jpg` — Không có watermark cũ.
- [—] `/media/9d9b4c6747e4771a6477.jpg` — Không có watermark cũ; trùng ảnh đã kiểm tra sạch.
- [—] `/media/f8ee787276f51b5c3991.jpg` — Không có watermark cũ.
- [—] `/media/904a3089d00bc556cf1d.jpg` — Không có watermark cũ.
- [—] `/media/fe69d50f87fb1ddeca0b.jpg` — Không có watermark cũ.
- [—] `/media/4a7020ba9cef3ff4d5e5.jpg` — Không có watermark cũ; trùng ảnh vỏ máy đã kiểm tra sạch.
- [—] `/media/87bafd8736555f4e6eaa.jpg` — Không có watermark cũ.
- [—] `/media/8b55423de9bdfe3bb4dd.jpg` — Không có watermark cũ.
- [—] `/media/e35ac31cc2de00107e83.jpg` — Không có watermark cũ.
- [—] `/media/a6b1473870729e828b35.jpg` — Không có watermark cũ.
- [—] `/media/838cf5249e5b03c2cde1.jpg` — Không có watermark cũ.
- [—] `/media/7f0d4ff2e428a3e0da2d.jpg` — Không có watermark cũ; chữ ERSystem là ký hiệu trên sản phẩm.
- [—] `/media/dd14ef4632983936b6b2.jpg` — Không có watermark cũ.
- [—] `/media/f99c87d000221cebe96f.jpg` — Không có watermark cũ.
- [—] `/media/b50f55f82df56de7332c.jpg` — Không có watermark cũ; trùng ảnh bánh răng đã kiểm tra sạch.
- [—] `/media/917cc516a34c4016c431.jpg` — Không có watermark cũ.
- [—] `/media/340f5f0146a7fd8d5c50.jpg` — Không có watermark cũ.
- [—] `/media/0d96ce65d8088af796b2.jpg` — Không có watermark cũ.
- [—] `/media/c9fbe2fda7e20f8d53e7.jpg` — Không có watermark cũ.
- [—] `/media/3bcff12cfd7c35845a2d.jpg` — Không có watermark cũ.
- [—] `/media/7e949ad631196746b670.jpg` — Không có watermark cũ.
- [—] `/media/26305ae25b64637851d0.jpg` — Không có watermark cũ.
- [—] `/media/ad35355013377ba38b45.jpg` — Không có watermark cũ.
- [—] `/media/3f9845aa433aa4c7c152.jpg` — Không có watermark cũ.
- [—] `/media/cab10c8313c9804f1dbe.jpg` — Không có watermark cũ.
- [—] `/media/ae3734bbb8475ad5e0d6.jpg` — Không có watermark cũ.
- [—] `/media/f21713be8419d6453fa9.jpg` — Không có watermark cũ.
- [—] `/media/12063dda297c44f11788.jpg` — Không có watermark cũ.
- [—] `/media/7cbe655aad43cf75bdc4.jpg` — Không có watermark cũ.
- [—] `/media/aba3ce286718587f09bf.jpg` — Không có watermark cũ.
- [—] `/media/24594876c91a6450842a.jpg` — Không có watermark cũ.
- [—] `/media/190e3520c8c8ecd54f36.jpg` — Không có watermark cũ.
- [—] `/media/a0b73ac9abb0bc4467d1.jpg` — Không có watermark cũ.
- [—] `/media/e8a16b95bed931f4e0fd.jpg` — Không có watermark cũ.
- [—] `/media/81b4813d26be54d1e438.jpg` — Không có watermark cũ.
- [—] `/media/b66a159d710f1ae20dfe.jpg` — Không có watermark cũ; trùng ảnh /media/e8a16b95bed931f4e0fd.jpg.
- [—] `/media/8446584b26970e2fef56.jpg` — Không có watermark cũ; trùng ảnh /media/e8a16b95bed931f4e0fd.jpg.
- [—] `/media/925d2ab23437ad81472a.jpg` — Không có watermark cũ.
- [—] `/media/51b9bac1c5c760598528.jpg` — Không có watermark cũ.
- [—] `/media/d05fed563de1fd1e10ae.jpg` — Không có watermark cũ.
- [—] `/media/292ff0adc5ec48f134b1.jpg` — Không có watermark cũ.
- [—] `/media/65c95f89d692e712e55d.jpg` — Không có watermark cũ.
- [—] `/media/da067ae4e19aa5eb028d.jpg` — Không có watermark cũ.
- [—] `/media/4faabd4b686fae40f72c.jpg` — Không có watermark cũ; trùng ảnh /media/da067ae4e19aa5eb028d.jpg.
- [—] `/media/5d934bc7fc7a58bad425.jpg` — Không có watermark cũ.
- [—] `/media/2b49fa02555e10797b80.jpg` — Không có watermark cũ.
- [—] `/media/a47a47c21a7f0451d408.jpg` — Không có watermark cũ.
- [—] `/media/9b42d8109c070198fb0f.jpg` — Không có watermark cũ.
- [—] `/media/a92ff15ed5240c41d831.jpg` — Không có watermark cũ.
- [—] `/media/a4fa30abeb93fa5b1607.jpg` — Không có watermark cũ.
- [—] `/media/8120eb47f227d3c62914.jpg` — Không có watermark cũ.
- [—] `/media/b294688b1fd96f739ea9.jpg` — Không có watermark cũ.
- [—] `/media/7f4ca51be3d211abe175.jpg` — Không có watermark cũ; trùng ảnh /media/8120eb47f227d3c62914.jpg.
- [—] `/media/7393500f4e631e337cd4.jpg` — Không có watermark cũ.
- [—] `/media/ae20a641e3074d14bbb7.jpg` — Không có watermark cũ.
- [—] `/media/d5dd8197788131e34ae5.jpg` — Không có watermark cũ; trùng ảnh /media/3752bbb34e5899a13fbd.jpg.
- [—] `/media/df99d98c1aaaef46da93.jpg` — Không có watermark cũ.
- [—] `/media/ff30dbdce4811e4d09d8.jpg` — Không có watermark cũ.
- [—] `/media/b4934e9fd5ac61c34e18.jpg` — Không có watermark cũ.
- [—] `/media/2ffed876f34a799fe196.jpg` — Không có watermark cũ.
- [—] `/media/e4a8023534778c83f123.jpg` — Không có watermark cũ; trùng ảnh /media/2ffed876f34a799fe196.jpg.
- [—] `/media/5275fe183f1b6f4bc85a.jpg` — Không có watermark cũ.
- [—] `/media/a4b4f7aa1eaa26d2aa34.jpg` — Không có watermark cũ; trùng ảnh /media/4be9235eff3d6367890b.jpg.
- [—] `/media/6d9bdac4a1e24bb8282b.jpg` — Không có watermark cũ.
- [—] `/media/fe9439029fb282a90990.jpg` — Không có watermark cũ.
- [—] `/media/de2a7ef08767b2ae008e.jpg` — Không có watermark cũ.
- [—] `/media/099059cac9fb5d6c4c2d.jpg` — Không có watermark cũ.
- [—] `/media/f03c5106c18af495ea5b.jpg` — Không có watermark cũ.
- [—] `/media/e2ddfc5138d367fbeba9.jpg` — Không có watermark cũ; trùng ảnh /media/099059cac9fb5d6c4c2d.jpg.
- [—] `/media/3fa6ffdcf244c6f810e5.jpg` — Không có watermark cũ.
- [—] `/media/5b4f36c09ff6b4cff623.jpg` — Không có watermark cũ; trùng ảnh /media/08395c1799986d4ba333.jpg.
- [—] `/media/5735b65216675eb5e246.jpg` — Không có watermark cũ.
- [—] `/media/4776dc49830afbab729e.jpg` — Không có watermark cũ.
- [—] `/media/f0d72e665b4096d7a1f3.jpg` — Không có watermark cũ.
- [—] `/media/b80eaade1be6aca1f29f.jpg` — Không có watermark cũ.
- [—] `/media/7f62c9a94239aa79122d.jpg` — Không có watermark cũ; trùng ảnh /media/b80eaade1be6aca1f29f.jpg.
- [—] `/media/d99a18a155042964054d.jpg` — Không có watermark cũ.
- [—] `/media/08395c1799986d4ba333.jpg` — Không có watermark cũ.
- [—] `/media/18bc4cfad425794d71e6.jpg` — Không có watermark cũ.
- [—] `/media/40d4a57a55c94c401b66.jpg` — Không có watermark cũ.
- [—] `/media/2874face178c5d898dd2.jpg` — Không có watermark cũ; trùng ảnh /media/9ac069ffde63232cdf80.jpg.
- [—] `/media/1051b8d2f1a356f8a356.jpg` — Không có watermark cũ.
- [—] `/media/650161b6555e7f0af076.jpg` — Không có watermark cũ.
- [—] `/media/9d0fc3f238a28abb0fc9.jpg` — Không có watermark cũ; trùng ảnh /media/45184582a780ba8ded03.jpg.
- [—] `/media/496418a177ae55eb9905.jpg` — Không có watermark cũ.
- [—] `/media/6956255d87d043b2b4d4.jpg` — Không có watermark cũ.
- [—] `/media/a1c45a39dffe2d0bdaf7.jpg` — Không có watermark cũ.
- [—] `/media/7c20061a92c501693de0.jpg` — Không có watermark cũ.
- [—] `/media/3f80f50c32ab4fc25626.jpg` — Không có watermark cũ.
- [—] `/media/0854104df152912521a8.jpg` — Không có watermark cũ.
- [—] `/media/9ac069ffde63232cdf80.jpg` — Không có watermark cũ.
- [—] `/media/4be9235eff3d6367890b.jpg` — Không có watermark cũ.
- [—] `/media/b7d704d1100213001040.jpg` — Không có watermark cũ.
- [—] `/media/212c83abfa16e01deb76.jpg` — Không có watermark cũ; trùng ảnh /media/d369a42f283b819ec95a.jpg.
- [—] `/media/1f9be3a23b11137f1d11.jpg` — Không có watermark cũ.
- [—] `/media/7694a14a3ee71fc3d216.jpg` — Không có watermark cũ.
- [—] `/media/3752bbb34e5899a13fbd.jpg` — Không có watermark cũ.
- [—] `/media/d369a42f283b819ec95a.jpg` — Không có watermark cũ.
- [—] `/media/6a569e9ff1caadfa4b7d.jpg` — Không có watermark cũ.
- [—] `/media/3adcf00b1bfccd1d4d93.jpg` — Không có watermark cũ.
- [—] `/media/1c84540b4dd65b5628f0.jpg` — Không có watermark cũ.
- [—] `/media/42f9a1fbedb75af121a7.jpg` — Không có watermark cũ; trùng ảnh /media/3adcf00b1bfccd1d4d93.jpg.
- [—] `/media/0b4919bd1523728f0642.jpg` — Không có watermark cũ.
- [—] `/media/309ce1b0ece6fa608d4d.jpg` — Không có watermark cũ.
- [—] `/media/42f0a43cb180aa49e331.jpg` — Không có watermark cũ.
- [—] `/media/dcd592d0a698dee951a1.jpg` — Không có watermark cũ; trùng ảnh /media/5a24f3d3de9ba5db9c85.jpg.
- [—] `/media/cf557bc725067d27b27f.jpg` — Không có watermark cũ.
- [—] `/media/61a0886bf55373e5426a.jpg` — Không có watermark cũ.
- [—] `/media/3cdc8d41347d076dfec1.jpg` — Không có watermark cũ.
- [—] `/media/ebeebc74f4f9db842206.jpg` — Không có watermark cũ.
- [—] `/media/5a24f3d3de9ba5db9c85.jpg` — Không có watermark cũ.
- [—] `/media/2c547267e671eb2a7ae5.jpg` — Không có watermark cũ.
- [—] `/media/45184582a780ba8ded03.jpg` — Không có watermark cũ.
- [—] `/media/057b3d9b61371b62ecab.jpg` — Không có watermark cũ.
- [—] `/media/b6060d7963367968255a.jpg` — Không có watermark cũ.
- [—] `/media/6e6ab218a7d198706967.jpg` — Không có watermark cũ.
- [—] `/media/22c93cea9962a55d7111.jpg` — Không có watermark cũ.
- [—] `/media/19cc55f83332be18574b.jpg` — Không có watermark cũ.
- [—] `/media/ddf8a4626d1f549b3397.jpg` — Không có watermark cũ.
- [—] `/media/2ffc3b771eefeaf80628.jpg` — Không có watermark cũ.
- [—] `/media/27bf2e01f7628e447780.jpg` — Không có watermark cũ.
- [—] `/media/0343fa46ba969ce3b330.jpg` — Không có watermark cũ.
- [—] `/media/d0b60168dbe3d1f06a16.jpg` — Không có watermark cũ; trùng ảnh /media/25cc2f7bed6a23147a81.jpg.
- [—] `/media/a86f467197b2c2e65463.jpg` — Không có watermark cũ.
- [—] `/media/c76e6dae22f83e4cc1b5.jpg` — Không có watermark cũ.
- [—] `/media/618bdc7561f6d5a22de8.jpg` — Không có watermark cũ.
- [—] `/media/fb43f074172631884a84.jpg` — Không có watermark cũ.
- [—] `/media/25cc2f7bed6a23147a81.jpg` — Không có watermark cũ.
- [—] `/media/cfb1a37c4a8905e4fda9.jpg` — Không có watermark cũ.
- [—] `/media/0c3213cbfb8d8b482f80.jpg` — Không có watermark cũ.
- [—] `/media/cb7bfe6171fcc1688f45.jpg` — Không có watermark cũ.
- [—] `/media/8406a9f5c0f17af61402.jpg` — Không có watermark cũ.
- [—] `/media/2c502e20735d77306790.jpg` — Không có watermark cũ.
- [—] `/media/87a74f07d93885a2e42f.jpg` — Không có watermark cũ.
- [—] `/media/d9b8b08855b78539f8f6.jpg` — Không có watermark cũ.
- [—] `/media/a8cf095578999ae54310.jpg` — Không có watermark cũ.
- [—] `/media/e45e877bca99f0ba648c.jpg` — Không có watermark cũ.
- [—] `/media/71a61c8136a357299c8d.jpg` — Không có watermark cũ.
- [—] `/media/68c3cfedb460c0ddeda6.jpg` — Không có watermark cũ.
- [—] `/media/465eeae8a13284e04e88.jpg` — Không có watermark cũ.
- [—] `/media/e710523007ea518cd5c3.jpg` — Không có watermark cũ.
- [—] `/media/d74ad89f73fece1206ac.jpg` — Không có watermark cũ.
- [—] `/media/19a175112465113adfb0.jpg` — Không có watermark cũ.
- [—] `/media/e826f2a107f31495c488.jpg` — Không có watermark cũ.
- [—] `/media/92e4bbf15c4d2855f28f.jpg` — Không có watermark cũ.
- [—] `/media/a75ba14e16d31cb66565.jpg` — Không có watermark cũ.
- [—] `/media/70b962d41b5e7858fdca.jpg` — Không có watermark cũ; chỉ là ảnh chi tiết in 3D.
- [—] `/media/de47eb681fd0b85e2110.jpg` — Không có watermark cũ.
- [—] `/media/54674b74b2fad25f1f53.jpg` — Không có watermark cũ.
- [—] `/media/9ca7097375ac1d5c4f5d.png` — Không có watermark cũ.
- [—] `/media/8c687bed22d6de65e578.jpg` — Không có watermark cũ.
- [—] `/media/832056d0c7a2b47fef2f.jpg` — Không có watermark cũ.
- [—] `/media/01278a42c9f23c6ba34f.jpg` — Không có watermark cũ.
- [—] `/media/ddab0237bfb0cf2d1d28.jpg` — Không có watermark cũ.
- [—] `/media/493eb7c59ad995627836.jpg` — Không có watermark cũ.
- [—] `/media/6b159e52eaa85e376185.jpg` — Không có watermark cũ.
- [—] `/media/0259950403c0bc387a7c.jpg` — Không có watermark cũ.
- [—] `/media/d2ff906d2f0521f92cfb.jpg` — Không có watermark cũ.
- [—] `/media/6d76c8784a9b479d6257.jpg` — Không có watermark cũ.
- [—] `/media/ad379e57dbad991083d4.jpg` — Không có watermark cũ.
- [—] `/media/de78ce8df424ef96182a.jpg` — Không có watermark cũ.
- [—] `/media/bfca9a5e4829f84e8a7f.jpg` — Không có watermark cũ.
- [—] `/media/c55cf8c0201ac8090ac1.jpg` — Không có watermark cũ.
- [—] `/media/82c794a2570b1bc3ca76.jpg` — Không có watermark cũ; chữ là nội dung khắc thật trên sản phẩm.
- [—] `/media/a78c8e28a36827176206.jpg` — Không có watermark cũ; chữ là nội dung khắc thật trên sản phẩm.
- [—] `/media/5f9c68e51fdc7cd15d0a.png` — Không có watermark cũ.
- [—] `/media/4d8fe8d7fe2875f07f2c.png` — Không có watermark cũ.
- [—] `/media/9db7e66b151dfda25f3f.png` — Không có watermark cũ.
- [—] `/media/bd011510a3933f2fbdf7.png` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/ababec62b4add6ad13f3.png` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/496e91f6eda19b5177ea.jpg` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/a91ce09b6133ba7dbbc7.jpg` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/31c33b3f83f949f57b84.jpg` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/4c3995531441930f0dde.jpg` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/a3b21a5692f1abfe2a6c.png` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/bab7297e1c7ba56282d5.png` — Logo thương hiệu đối tác, không phải watermark.
- [—] `/media/e3af61ab44f0b3af0de6.jpg` — Chỉ có thông tin khắc thật trên bảng máy; không có watermark cũ.
- [—] `/media/8b1a698dc07b89391603.jpg` — Chỉ có mã khắc trực tiếp trên chi tiết; không có watermark cũ.
- [—] `/media/d970b39bb07654540b1e.jpg` — Chữ khắc trang trí trên ly là nội dung sản phẩm; không có watermark cũ.
- [—] `/media/a8f41796ee3392a9f82c.jpg` — Thông số khắc trực tiếp trên bảng máy; không có watermark cũ.
- [—] `/media/71c2ca11337fac781b19.jpg` — Ảnh minh hoạ chính sách đổi trả, không có watermark cũ.
- [—] `/media/3d7cfd23e457aae68ca6.jpg` — Ảnh minh hoạ giao nhận, không có watermark cũ.
- [—] `/media/6ad8b1341a3e83f5f0b6.png` — Ảnh minh hoạ thanh toán, không có watermark cũ.
- [—] `/media/45058944ee2993cf9058.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.
- [—] `/media/07c870fbc0dae2ea03c8.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.
- [—] `/media/803f311f1a77e0f248bc.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.
- [—] `/media/479c8c7f98718b8058d9.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.
- [—] `/media/ce2ccd1071cc894585a5.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.
- [—] `/media/4e4e95c6f65a5b2a1d44.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.
- [—] `/media/70934889193ead42788a.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.
- [—] `/media/afd1a616546a71ceb5a6.jpg` — Ảnh chi tiết nhựa in 3D, không có watermark cũ.

## Ảnh cần nguồn sạch hoặc xử lý thủ công

- [!] `/media/9e151baf1992fd681031.jpg` — Ảnh nguồn không được import vì URL gốc trả HTTP 404; cần ảnh gốc mới nếu muốn hiển thị.

## Danh sách bài viết và ảnh cần xử lý

### [x] Gia Công Kim Loại Tấm & Cơ Khí Chính Xác Theo Yêu Cầu Tại TP.HCM

- Route: `/`
- Ảnh cần rà: 13
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/0c3213cbfb8d8b482f80.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-so-sanh.jpg
  - [—] `/media/de47eb681fd0b85e2110.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-ung-dung.jpg
  - [—] `/media/54674b74b2fad25f1f53.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/80391050.jpg
  - [—] `/media/bd011510a3933f2fbdf7.png` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/55562960.png
  - [—] `/media/ababec62b4add6ad13f3.png` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/24693012.png
  - [—] `/media/496e91f6eda19b5177ea.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/53927317.jpg
  - [—] `/media/a91ce09b6133ba7dbbc7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/83861929.jpg
  - [—] `/media/31c33b3f83f949f57b84.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/85883815.jpg
  - [—] `/media/4c3995531441930f0dde.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/38941613.jpg
  - [—] `/media/a3b21a5692f1abfe2a6c.png` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/91279182.png
  - [—] `/media/bab7297e1c7ba56282d5.png` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/20741491.png

### [x] Cắt Laser Lim Loại - Sắt - Thép...

- Route: `/cat-laser-lim-loai-sat-thep-119/`
- Ảnh cần rà: 10
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg

### [x] Chế Tạo Máy Móc Thiết Bị

- Route: `/che-tao-may-moc-thiet-bi-111/`
- Ảnh cần rà: 5
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/16e74ea51d6c27014a88.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/356230235202/may-rua-phoi-tu-dong.jpg
  - [x] `/media/399cb05ca63ca14a4944.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/356230235202.jpg
  - [x] `/media/fa38c829b1107e592a22.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/377543081921.jpg

### [x] Cam Kết Chất Lượng Gia Công Cơ Khí

- Route: `/chinh-sach/cam-ket-chat-luong-gia-cong-co-khi-279.html`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Chính Sách Bảo Hành

- Route: `/chinh-sach/chinh-sach-bao-hanh-57.html`
- Ảnh cần rà: 2
  - [—] `/media/9ca7097375ac1d5c4f5d.png` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/86883956.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Chính Sách Bảo Mật Thông Tin

- Route: `/chinh-sach/chinh-sach-bao-mat-thong-tin-214.html`
- Ảnh cần rà: 2
  - [—] `/media/8c687bed22d6de65e578.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/56843105.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Chính Sách Đổi Trả Hàng Và Hoàn Tiền

- Route: `/chinh-sach/chinh-sach-doi-tra-hang-va-hoan-tien-55.html`
- Ảnh cần rà: 2
  - [—] `/media/71c2ca11337fac781b19.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/65312018.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Chính Sách Vận Chuyển & Giao Nhận

- Route: `/chinh-sach/chinh-sach-van-chuyen-va-giao-nhan-52.html`
- Ảnh cần rà: 2
  - [—] `/media/3d7cfd23e457aae68ca6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/95342582.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Điều khoản sử dụng Website

- Route: `/chinh-sach/dieu-khoan-su-dung-website-278.html`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Năng Lực Sản Xuất Gia Công Cơ Khí

- Route: `/chinh-sach/nang-luc-san-xuat-gia-cong-co-khi-280.html`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Quy Định & Hình Thức Thanh Toán

- Route: `/chinh-sach/quy-dinh-va-hinh-thuc-thanh-toan-56.html`
- Ảnh cần rà: 2
  - [—] `/media/6ad8b1341a3e83f5f0b6.png` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/67250797.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Cửa Cuốn Nhôm

- Route: `/cua-cuon-nhom-114/`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Chọn đúng công đoạn.  Hoàn thiện đúng nhu cầu.

- Route: `/dich-vu`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Chọn đúng công đoạn.  Hoàn thiện đúng nhu cầu.

- Route: `/dich-vu.html`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Cắt bẻ kim loại, sắt, inox tấm

- Route: `/dich-vu/cat-be-kim-loai-sat-tole-inox-tam-169.html`
- Ảnh cần rà: 6
  - [—] `/media/832056d0c7a2b47fef2f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/37354008.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/01278a42c9f23c6ba34f.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/41206192tu-van.jpg
  - [x] `/media/dbecbd957dee7ddd6522.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-be-kim-loai.jpg
  - [x] `/media/1ef599c9c4fcd126675c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-inox-sat-tole.jpg
  - [x] `/media/bd126ec2f3d9885b112f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-inox-tam.jpg

### [x] Cắt Laser Kim Loại - Sắt - Thép - Inox - Nhôm ....

- Route: `/dich-vu/cat-laser-kim-loai-sat-thep-inox-nhom--201.html`
- Ảnh cần rà: 5
  - [x] `/media/04338b775afd8525979d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/07868811.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/01278a42c9f23c6ba34f.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/41206192tu-van.jpg
  - [x] `/media/38b4c8763fb628e03e84.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-laser-tphcm.jpg
  - [x] `/media/f88fbb2e9a766116a6cf.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-fiber.jpg

### [x] Dịch vụ gia công cơ khí

- Route: `/dich-vu/gia-cong-co-khi-164.html`
- Ảnh cần rà: 3
  - [—] `/media/ddab0237bfb0cf2d1d28.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/02425426.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/01278a42c9f23c6ba34f.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/41206192tu-van.jpg

### [x] Dịch vụ sửa chữa Rulo - trục cán

- Route: `/dich-vu/sua-chua-rulo-truc-can-167.html`
- Ảnh cần rà: 7
  - [x] `/media/d05d410f8967ac182723.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/95825955.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/01278a42c9f23c6ba34f.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/41206192tu-van.jpg
  - [x] `/media/50ce5b52986c53c7d8a9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dich-vu-sua-may-can-silicon.jpg
  - [x] `/media/154355ea77d42dfa475c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sua-may-can-silicon.jpg
  - [x] `/media/cff2f7defd8593126c93.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sua-may-can-silicon-re.jpg
  - [x] `/media/422716d5085affb20693.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sua-may-can-silicon-tphcm.jpg

### [x] Sửa cửa cuốn tại TPHCM

- Route: `/dich-vu/sua-cua-cuon-gia-re-166.html`
- Ảnh cần rà: 5
  - [—] `/media/493eb7c59ad995627836.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/90364911.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/01278a42c9f23c6ba34f.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/41206192tu-van.jpg
  - [—] `/media/6b159e52eaa85e376185.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dichvu2(9).jpg
  - [—] `/media/0259950403c0bc387a7c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dich-vu-cham-soc-khach-hang.jpg

### [x] Thiết kế thi công Vít Tải - Băng Tải inox TPHCM

- Route: `/dich-vu/thiet-ke-thi-cong-vit-tai-bang-tai-luoi-inox-tphcm-177.html`
- Ảnh cần rà: 10
  - [x] `/media/a0e2eeaa10e2f1b491b7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/16171391.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/01278a42c9f23c6ba34f.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/41206192tu-van.jpg
  - [x] `/media/51b9786ffb9a295985d7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-vit-tai-bang-tai-inox-1.jpg
  - [x] `/media/cab2c1ad6fac1c17de2e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-vit-tai-bang-tai-inox-2.jpg
  - [x] `/media/0372abc368e5f2b57701.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-vit-tai-bang-tai-inox-3.jpg
  - [x] `/media/a79c09b1c6a4d7f2684e.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-vit-tai-bang-tai-inox-4.jpg
  - [x] `/media/1528945f271fc1f7f906.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-vit-tai-bang-tai-inox-5.jpg
  - [x] `/media/1843670e515a58969b70.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/Bang-tai-con-lan-inox.jpg
  - [x] `/media/bacf20062a950ac18b8b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/bang-tai-luoi-inox-304-soi-xoan.jpg

### [x] Gia Công Bánh Răng

- Route: `/gia-cong-banh-rang-112/`
- Ảnh cần rà: 4
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/a7bce9d62e21d62ac5cf.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/348417272204/gia-cong-banh-rang-tphcm.jpg
  - [x] `/media/7089bc522119e1100672.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/348417272204.jpg

### [x] Gia công bánh răng nhựa tại TPHCMbằng công nghệ in 3D.

- Route: `/gia-cong-banh-rang-nhua-tphcm.html`
- Ảnh cần rà: 2
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/92e4bbf15c4d2855f28f.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh.jpg

### [x] Gia Công Cơ Khí Chính Xác

- Route: `/gia-cong-co-khi-chinh-xac-113/`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Gia Công Thép Định Hình

- Route: `/gia-cong-thep-dinh-hinh-117/`
- Ảnh cần rà: 3
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/d3ab39997479c6848498.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/047828844370.jpg

### [x] Một đối tác. Nhiều giải pháp gia công.

- Route: `/gioi-thieu.html`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Hồ sơ năng lựcCơ khí Khởi Minh.

- Route: `/ho-so-nang-luc.html`
- Ảnh cần rà: 1
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] In 3D nhựa kỹ thuật theo yêu cầu.

- Route: `/in-3d-nhua-ky-thuat.html`
- Ảnh cần rà: 10
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/92e4bbf15c4d2855f28f.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh.jpg
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [—] `/media/d2ff906d2f0521f92cfb.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-do-ga.jpg
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/de78ce8df424ef96182a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-cu.jpg
  - [—] `/media/bfca9a5e4829f84e8a7f.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-puly.jpg
  - [—] `/media/c55cf8c0201ac8090ac1.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-robot.jpg
  - [—] `/media/70b962d41b5e7858fdca.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ong-gio.jpg

### [x] Khắc Laser

- Route: `/khac-laser-121/`
- Ảnh cần rà: 4
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/82c794a2570b1bc3ca76.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/710399250569/khac-laser-kim-loai.jpg
  - [—] `/media/a78c8e28a36827176206.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/710399250569.jpg

### [x] Liên hệ Khởi Minh. Kết nối trực tiếp xưởng.

- Route: `/lien-he.html`
- Ảnh cần rà: 1
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Phễu Inox Công Nghiệp

- Route: `/pheu-inox-cong-nghiep-116/`
- Ảnh cần rà: 3
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/bffbf2e25cbab6cd29de.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/321581225596.jpg

### [x] Quạt Hút Thổi Công Nghiệp

- Route: `/quat-hut-thoi-cong-nghiep-115/`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Sản phẩm cơ khí. Gia công theo bản vẽ.

- Route: `/san-pham.html`
- Ảnh cần rà: 24
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/6bd7044181296be5a385.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/075470343649/san-pham-phay-cnc.jpg
  - [x] `/media/8f0a38edd688441d9737.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/075470343649.jpg
  - [x] `/media/13f80559255f88932bfd.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/195890580394/san-pham-tien-cnc.jpg
  - [x] `/media/bbe296bdcb8b455a96fd.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/195890580394.jpg
  - [—] `/media/82c794a2570b1bc3ca76.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/710399250569/khac-laser-kim-loai.jpg
  - [—] `/media/a78c8e28a36827176206.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/710399250569.jpg
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/16e74ea51d6c27014a88.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/356230235202/may-rua-phoi-tu-dong.jpg
  - [x] `/media/399cb05ca63ca14a4944.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/356230235202.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg
  - [x] `/media/ded3086a5d64f869b7b0.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/962172609300.jpg
  - [x] `/media/bffbf2e25cbab6cd29de.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/321581225596.jpg
  - [x] `/media/d3ab39997479c6848498.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/047828844370.jpg
  - [x] `/media/fa38c829b1107e592a22.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/377543081921.jpg
  - [x] `/media/a7bce9d62e21d62ac5cf.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/348417272204/gia-cong-banh-rang-tphcm.jpg
  - [x] `/media/7089bc522119e1100672.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/348417272204.jpg

### [ ] Băng tải lưới inox

- Route: `/san-pham/bang-tai-luoi-inox-485.html`
- Ảnh cần rà: 6
  - [x] `/media/ded3086a5d64f869b7b0.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/962172609300.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/1843670e515a58969b70.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/Bang-tai-con-lan-inox.jpg
  - [!] `/media/9e151baf1992fd681031.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/luoi-bang-tai-inox-dang-tam-phang-1.jpg
  - [x] `/media/bacf20062a950ac18b8b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/bang-tai-luoi-inox-304-soi-xoan.jpg
  - [x] `/media/2e03db663ccd7dc0382e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/luoi-bang-tai-inox.jpg

### [x] Cắt Laser Chấn Gấp Inox

- Route: `/san-pham/cat-laser-chan-gap-inox-490.html`
- Ảnh cần rà: 13
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/dc714c011cfec478da17.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chan-gap-inox.jpg
  - [x] `/media/8414135cf4f93920c224.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-bao-chan-inox.jpg
  - [x] `/media/3c543508894869dfc645.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-chan-inox.jpg
  - [x] `/media/b36b3b61614366ea5f26.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-chan-inox-tphcm.jpg
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg

### [x] Cắt laser Chi Tiết Máy

- Route: `/san-pham/cat-laser-chi-tiet-may-487.html`
- Ảnh cần rà: 17
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/e24964c3f11bd2033809.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-kim-loai-bang-may-laser-fiber.jpg
  - [x] `/media/d27e84a8c4ebd4a471a1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-laser-fiber-chi-tiet-may.jpg
  - [x] `/media/81f820a748b064242080.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-laser-gia-re.jpg
  - [x] `/media/9712588fc7222c11ea41.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-chi-tiet-may-4.jpg
  - [x] `/media/6e0272bf6e4a45614b95.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may.jpg
  - [x] `/media/9cb3ea1fd5e4adc1f9ae.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-1.jpg
  - [x] `/media/7c370fa715d15643ae82.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-gia-re.jpg
  - [x] `/media/0873059bdda75a0994d2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-theo-yeu-cau.jpg
  - [x] `/media/b49a8ac61c14cd00816d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-tphcm.jpg
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg

### [x] Cắt Laser Hoa Văn Kim Loại

- Route: `/san-pham/cat-laser-hoa-van-kim-loai-489.html`
- Ảnh cần rà: 20
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/24405b6e35a3dea642d3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-laser-tphcm.jpg
  - [x] `/media/2036e36b7d4a17a14603.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-plasma.jpg
  - [x] `/media/c27f115857ef411019ce.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-trang-tri.jpg
  - [x] `/media/174687b3bcb2586ee6f4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-kim-loai-hoa-van-laser.jpg
  - [x] `/media/afe5dc3faba54d720d10.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-hoa-van-kim-loai.jpg
  - [x] `/media/4d103b1c67ac92d84cb4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-hoa-van-kim-loai-tam.jpg
  - [x] `/media/357807ae23edb6a4af74.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-hoa-van-trang-tri.jpg
  - [x] `/media/9d19af0cdd9dba5631f4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-hoa-van-vach-ngan.jpg
  - [x] `/media/8016bd8017f4581f6eed.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-vach-ngan-kim-loai.jpg
  - [x] `/media/4d01efa0978d21e09e78.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/hoa-tiet-kim-loai-cat-laser.jpg
  - [x] `/media/d35fb5e6831704b3dedf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/hoa-van-kim-loai.jpg
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg

### [x] Cắt laser kim loại

- Route: `/san-pham/cat-laser-kim-loai-486.html`
- Ảnh cần rà: 14
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/b657e52895acac890965.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-thep.jpg
  - [x] `/media/af41f9cded8dc65c715a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-inox.jpg
  - [x] `/media/9d17b5768eb97ec94b0c.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam.jpg
  - [x] `/media/f9cfa2fee9bcc68e35c9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-gia-re.jpg
  - [x] `/media/aaf240ed9a9a7adef4cc.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-cong-kim-loai-tam-tp-hcm-sat-10ly.jpg
  - [x] `/media/285babd3dfdd3f5ea636.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-1.jpg
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg

### [x] Cắt Laser Kim Loại Tấm

- Route: `/san-pham/cat-laser-kim-loai-tam-488.html`
- Ảnh cần rà: 17
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/964660ad114a6fe3f11d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-cong-tai-khoi-minh.jpg
  - [x] `/media/908bcf68da6b8cac8078.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai(1).jpg
  - [x] `/media/64eddab0b6928f1e1ba5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam(1).jpg
  - [x] `/media/8338d1543970974f2343.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam-gia-re.jpg
  - [x] `/media/482dae7218cd172f0efd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam-tphcm.jpg
  - [x] `/media/a0f9f16c1b0544677ac9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gai-cong-kim-loai-tam.jpg
  - [x] `/media/8e5919dd228e442e52e8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-cat-laser-kim-loai-tam.jpg
  - [x] `/media/2e185321aed1f7445453.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-laser-kim-loai-tam.jpg
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg

### [x] Cắt Laser Lim Loại - Sắt - Thép...

- Route: `/san-pham/cat-laser-lim-loai-sat-thep-119/`
- Ảnh cần rà: 10
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg

### [x] Cắt Thép Tấm

- Route: `/san-pham/cat-thep-tam-492.html`
- Ảnh cần rà: 16
  - [x] `/media/f5557990635b2c62afd8.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/989529918876.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/7141a426acbca4f43c5a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-thep-tam.jpg
  - [x] `/media/80b278cea0cd2dbba2e1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-thep-tam-1.jpg
  - [x] `/media/a79843e83b01e2a29174.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-thep-tam-2.jpg
  - [x] `/media/12f6eb58c2e87bad56a0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-thep-tam-3.jpg
  - [x] `/media/e364c097c7470ec35970.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-thep-tam-5.jpg
  - [x] `/media/dce1d3762f1fcc074413.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-thep-tam-6.jpg
  - [x] `/media/70249acd540d50d6dfc6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-thep-tam-7.jpg
  - [x] `/media/642c65adf2849eb9c943.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/081107816113.jpg
  - [x] `/media/1e102039e6688be5f930.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/459518022696.jpg
  - [x] `/media/10815f2eddce66ae6cce.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/241734645111.jpg
  - [x] `/media/eb746fd269ddfb7de7c8.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/376609786842/cat-laser-chi-tiet-may.jpg
  - [x] `/media/3e186babe9485eb235e6.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/376609786842.jpg
  - [x] `/media/58844b6d30a7add3345e.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/058559210416/cat-laser-kim-loai.jpg
  - [x] `/media/dff6c9f56459b8280ec2.jpg` — dùng ở 9 trang — nguồn: https://cokhitonghop.vn/upload/product/058559210416.jpg

### [x] Gia Công Bánh Răng TPHCM

- Route: `/san-pham/gia-cong-banh-rang-481.html`
- Ảnh cần rà: 11
  - [x] `/media/7089bc522119e1100672.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/348417272204.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/5f9c68e51fdc7cd15d0a.png` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang.png
  - [—] `/media/4d8fe8d7fe2875f07f2c.png` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-1.png
  - [—] `/media/9db7e66b151dfda25f3f.png` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-2.png
  - [x] `/media/1be635151db24eb88c81.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-4.jpg
  - [x] `/media/56c375bb5849e17ea70d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-5.jpg
  - [x] `/media/65ec900cfdce83d06b51.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-6.jpg
  - [x] `/media/24ccdd2007a9d8290e88.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-7.jpg
  - [x] `/media/367698abbc96ab85f5c4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-3.jpg
  - [x] `/media/7dc99e490d5f5452a63d.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-tphcm.jpg

### [x] Gia Công Bánh Răng TPHCM

- Route: `/san-pham/gia-cong-banh-rang-tphcm-481.html`
- Ảnh cần rà: 11
  - [x] `/media/7089bc522119e1100672.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/348417272204.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/5f9c68e51fdc7cd15d0a.png` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang.png
  - [—] `/media/4d8fe8d7fe2875f07f2c.png` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-1.png
  - [—] `/media/9db7e66b151dfda25f3f.png` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-2.png
  - [x] `/media/1be635151db24eb88c81.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-4.jpg
  - [x] `/media/56c375bb5849e17ea70d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-5.jpg
  - [x] `/media/65ec900cfdce83d06b51.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-6.jpg
  - [x] `/media/24ccdd2007a9d8290e88.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-7.jpg
  - [x] `/media/367698abbc96ab85f5c4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-banh-rang-3.jpg
  - [x] `/media/7dc99e490d5f5452a63d.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-tphcm.jpg

### [x] Gia công Phễu inox công nghiệp | Giá rẻ chất lượng

- Route: `/san-pham/gia-cong-pheu-inox-cong-nghiep-gia-re-chat-luong-484.html`
- Ảnh cần rà: 5
  - [x] `/media/bffbf2e25cbab6cd29de.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/321581225596.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/6900240af67277d9e081.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/pheu-inox-cong-nghiep.jpg
  - [x] `/media/a7b38f570a8114064666.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/pheu-inox-cong-nghiep-3.jpg
  - [x] `/media/6d2e490d34883790db7b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/pheu-inox-cong-nghiep-2.jpg

### [x] Khắc Laser kim loại

- Route: `/san-pham/khac-laser-kim-loai-493.html`
- Ảnh cần rà: 8
  - [—] `/media/a78c8e28a36827176206.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/710399250569.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/838b230d9afcfdba416a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-3.jpg
  - [x] `/media/b92485342fcc4d06b434.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-4.jpg
  - [—] `/media/e3af61ab44f0b3af0de6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-7.jpg
  - [—] `/media/8b1a698dc07b89391603.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-9.jpg
  - [—] `/media/d970b39bb07654540b1e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-10.jpg
  - [—] `/media/a8f41796ee3392a9f82c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-11.jpg

### [x] Máy nắn mâm xe

- Route: `/san-pham/may-nan-mam-xe-482.html`
- Ảnh cần rà: 6
  - [x] `/media/fa38c829b1107e592a22.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/377543081921.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/baadad3a792ece532142.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-nan-mam-xe.jpg
  - [x] `/media/e1c9e904ca0b7b7b9686.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-nan-mam-xe-1.jpg
  - [x] `/media/16e74ea51d6c27014a88.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/356230235202/may-rua-phoi-tu-dong.jpg
  - [x] `/media/399cb05ca63ca14a4944.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/356230235202.jpg

### [x] Máy Rửa Phôi Tự Động

- Route: `/san-pham/may-rua-phoi-tu-dong-491.html`
- Ảnh cần rà: 15
  - [x] `/media/399cb05ca63ca14a4944.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/356230235202.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/cf8c270a6d665e814cf7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong1.jpg
  - [x] `/media/b12efb1d9b30a977d9ab.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong2.jpg
  - [x] `/media/dd31735320be20f09891.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong8.jpg
  - [x] `/media/9cc9e154fe9deab021da.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong24.jpg
  - [x] `/media/dd5b485daad49398c4e8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong11.jpg
  - [x] `/media/d4eee5ffd149295b73cc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong12.jpg
  - [x] `/media/3e446d79c92f4d69912b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong13.jpg
  - [x] `/media/56f12268dd113d79aa14.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong17.jpg
  - [x] `/media/c9842b6c6b7bdd15441e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong19.jpg
  - [x] `/media/ecc3ad4a553f2f0bf6cc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong22.jpg
  - [x] `/media/a13e966a2c010cb6cccc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong25.jpg
  - [x] `/media/ec65fc7e0939ec5035b6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-rua-phoi-tu-dong31.jpg
  - [x] `/media/fa38c829b1107e592a22.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/377543081921.jpg

### [x] Pallet sắt

- Route: `/san-pham/pallet-sat-483.html`
- Ảnh cần rà: 7
  - [x] `/media/d3ab39997479c6848498.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/047828844370.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/d31690b85badd7a66939.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/ballet-sat.jpg
  - [x] `/media/76d669a1528e10a3bc89.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/ballet-sat-1.jpg
  - [x] `/media/352d5a3e14525dc25cdd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/pallet-sat-2.jpg
  - [x] `/media/77d4f1907335b0f842eb.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/pallet-sat-3.jpg
  - [x] `/media/823e07024c2d725ff282.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/pallet-sat-4.jpg

### [x] Sản phẩm phay CNC

- Route: `/san-pham/san-pham-phay-cnc-495.html`
- Ảnh cần rà: 6
  - [x] `/media/8f0a38edd688441d9737.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/075470343649.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/05acaebb1ed80157861b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-cnc-1.jpg
  - [x] `/media/dfdaca47412ef41c226c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-cnc-2.jpg
  - [x] `/media/13f80559255f88932bfd.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/195890580394/san-pham-tien-cnc.jpg
  - [x] `/media/bbe296bdcb8b455a96fd.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/195890580394.jpg

### [x] Sản phẩm tiện CNC

- Route: `/san-pham/san-pham-tien-cnc-494.html`
- Ảnh cần rà: 7
  - [x] `/media/bbe296bdcb8b455a96fd.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/195890580394.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/8745794b9d4ca6a20a94.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc(2).jpg
  - [x] `/media/001ab6eb57b1ae18c50b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc-1(1).jpg
  - [x] `/media/4786400505ff1fedbf73.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc-2.jpg
  - [x] `/media/6bd7044181296be5a385.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/075470343649/san-pham-phay-cnc.jpg
  - [x] `/media/8f0a38edd688441d9737.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/075470343649.jpg

### [x] Tiện Phay CNC

- Route: `/tien-phay-cnc-120/`
- Ảnh cần rà: 6
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/6bd7044181296be5a385.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/075470343649/san-pham-phay-cnc.jpg
  - [x] `/media/8f0a38edd688441d9737.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/075470343649.jpg
  - [x] `/media/13f80559255f88932bfd.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/thumb/640x480/2/upload/product/195890580394/san-pham-tien-cnc.jpg
  - [x] `/media/bbe296bdcb8b455a96fd.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/product/195890580394.jpg

### [x] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc.html`
- Ảnh cần rà: 26
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/cb7bfe6171fcc1688f45.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/92e4bbf15c4d2855f28f.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh.jpg
  - [—] `/media/8406a9f5c0f17af61402.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/2c502e20735d77306790.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/de78ce8df424ef96182a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-cu.jpg
  - [—] `/media/87a74f07d93885a2e42f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/4e4e95c6f65a5b2a1d44.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-banh-rang-cnc.jpg
  - [—] `/media/d9b8b08855b78539f8f6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/e45e877bca99f0ba648c.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ga-khoan.jpg
  - [—] `/media/a8cf095578999ae54310.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-dung-sai/dung-sai-in-3d-va-do-lap-ghep-cach-ghi-yeu-cau-tren-ban-ve.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/68c3cfedb460c0ddeda6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-vat-lieu/chon-vat-lieu-in-3d-cho-chi-tiet-co-khi-bat-dau-tu-dieu-kien-lam-viec.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg
  - [—] `/media/465eeae8a13284e04e88.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-puly/in-3d-puly-nhua-va-chi-tiet-truyen-dong-can-kiem-tra-gi.jpg
  - [—] `/media/bfca9a5e4829f84e8a7f.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-puly.jpg
  - [—] `/media/e710523007ea518cd5c3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-robot/in-3d-ma-kep-va-ga-cam-bien-robot-tu-bien-dang-den-kiem-tra-lap.jpg
  - [—] `/media/c55cf8c0201ac8090ac1.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-robot.jpg
  - [—] `/media/d74ad89f73fece1206ac.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v44-ong-gio/in-3d-ong-gio-chup-hut-va-dau-chuyen-theo-yeu-cau-luu-y-thiet-ke.jpg
  - [—] `/media/70b962d41b5e7858fdca.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ong-gio.jpg
  - [—] `/media/19a175112465113adfb0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v43-banh-rang/in-3d-banh-rang-nhua-khi-nao-phu-hop-can-cung-cap-thong-so-gi.jpg
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [—] `/media/e826f2a107f31495c488.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v43-do-ga/in-3d-do-ga-co-khi-ung-dung-lap-rap-dinh-vi-va-ket-hop-kim-loai.jpg
  - [—] `/media/d2ff906d2f0521f92cfb.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-do-ga.jpg

### [x] Bánh răng nhựa in 3D hay CNC: so sánh để chọn đúng phương án

- Route: `/tin-tuc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an-290.html`
- Ảnh cần rà: 11
  - [—] `/media/4e4e95c6f65a5b2a1d44.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-banh-rang-cnc.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/70934889193ead42788a.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-dung-sai/dung-sai-in-3d-va-do-lap-ghep-cach-ghi-yeu-cau-tren-ban-ve.jpg
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [—] `/media/bfca9a5e4829f84e8a7f.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-puly.jpg
  - [—] `/media/0c3213cbfb8d8b482f80.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-so-sanh.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg

### [x] Cắt CNC Kim Loại và cắt CNC Sắt Thép Tấm tại TPHCM

- Route: `/tin-tuc/cat-cnc-kim-loai-va-cat-cnc-sat-thep-tam-tai-tphcm-208.html`
- Ảnh cần rà: 41
  - [x] `/media/7edbb0e70fee2c0b7c3f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/81205835.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/351b04846c93bfb99e75.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai.jpg
  - [x] `/media/5d6570f333fec51662fd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai(1).jpg
  - [x] `/media/6df049c2e39ddfe658f1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-1.jpg
  - [x] `/media/fba1cdb64b0d2a400c50.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-4.jpg
  - [x] `/media/4761d5b9cea3d2f36b0a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-sat-thep-tam.jpg
  - [x] `/media/488dd7632624acd2c773.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-tam.jpg
  - [x] `/media/4869d41d4c0ff6f22a04.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/vach-ngan-cnc-trang-tri.jpg
  - [x] `/media/e22ac06c7a8c5bb0b80e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-5.jpg
  - [x] `/media/9b23ab92762174a44542.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-6.jpg
  - [x] `/media/17b81bd0491bee823702.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-sat-.jpg
  - [x] `/media/e0b1d3b48021376ac890.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-tam-tphcm.jpg
  - [x] `/media/a66bb7ce3e1c30a1c65b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-kim-loai-tap.jpg
  - [x] `/media/942c7203b02b155251a4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai(2).jpg
  - [x] `/media/3bb2a62a8b709eda7ab8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-cnc(1).jpg
  - [x] `/media/148cf5deb8daeb6ee92e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-sat.jpg
  - [x] `/media/6733c77a551b4367e463.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-thep-tam(1).jpg
  - [x] `/media/c67e13e6170d652c0c1d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-sat-tam.jpg
  - [x] `/media/a72993021efbed4a5bbb.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-cnc.jpg
  - [x] `/media/19d6442c35c1065f0f08.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-sat-gia-re.jpg
  - [x] `/media/1c2fcbf1328840d922fe.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-kim-loai-tam.jpg
  - [x] `/media/f033fb99249398a69dd6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai(4).jpg
  - [x] `/media/64bc7f488711bcbf2d6d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tphcm(2).jpg
  - [x] `/media/2fd5dcbbd1f550ad03c5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-sat-hoa-van.jpg
  - [x] `/media/ad073c3d90ce57442ba7.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-sat-tphcm.jpg
  - [x] `/media/c737a882579406cf2f09.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-sat-tam.jpg
  - [x] `/media/35e6d0711e7ed3c9c68f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/mau-cong-sat-cnc-my-thuat-dep-1.jpg
  - [x] `/media/76747ed8f8f94436c545.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/mau-cong-sat-cnc-my-thuat-dep-2.jpg
  - [x] `/media/03c5b47c216c77100e8a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/mau-cong-sat-cnc-my-thuat-dep-4.jpg
  - [x] `/media/661eaf30dd477a7259dc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/mau-cong-sat-cnc-my-thuat-dep-3.jpg
  - [x] `/media/0c7cacf865601f24ae2e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/mau-cong-sat-cnc-my-thuat-dep-6.jpg
  - [x] `/media/8de86a515dd52ee0ef7e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/mau-cong-sat-cnc-my-thuat-dep-7.jpg
  - [x] `/media/4aa69ecb877a23c3153f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/mau-cong-sat-cnc-my-thuat-dep-8.jpg
  - [x] `/media/abab0d2bcb783b8cd7bf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-cat-laser-sat-thep.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Cắt Hoa Văn Sắt CNC TPHCM – Mẫu Cửa Sắt Cổng Sắt CNC

- Route: `/tin-tuc/cat-hoa-van-sat-cnc-tphcm-mau-cua-sat-cong-sat-cnc-207.html`
- Ảnh cần rà: 15
  - [x] `/media/35fa08ef4bbffa979e10.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/62776837.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/c27f115857ef411019ce.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-trang-tri.jpg
  - [x] `/media/2036e36b7d4a17a14603.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-plasma.jpg
  - [x] `/media/24405b6e35a3dea642d3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-laser-tphcm.jpg
  - [x] `/media/4d103b1c67ac92d84cb4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-hoa-van-kim-loai-tam.jpg
  - [x] `/media/afe5dc3faba54d720d10.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-hoa-van-kim-loai.jpg
  - [x] `/media/9d19af0cdd9dba5631f4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-hoa-van-vach-ngan.jpg
  - [x] `/media/a0f9f16c1b0544677ac9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gai-cong-kim-loai-tam.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Cắt Laser Kim Loại quận Bình Tân – Gia công cắt Sắt Inox Thép tấm

- Route: `/tin-tuc/cat-laser-kim-loai-quan-binh-tan-gia-cong-cat-sat-inox-thep-tam-209.html`
- Ảnh cần rà: 18
  - [x] `/media/0c9a317c947ffae226f0.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/77390565.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/6e0272bf6e4a45614b95.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may.jpg
  - [x] `/media/a0f9f16c1b0544677ac9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gai-cong-kim-loai-tam.jpg
  - [x] `/media/e0b1d3b48021376ac890.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-kim-loai-tam-tphcm.jpg
  - [x] `/media/c27f115857ef411019ce.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-trang-tri.jpg
  - [x] `/media/f88fbb2e9a766116a6cf.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-fiber.jpg
  - [x] `/media/b36b3b61614366ea5f26.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-chan-inox-tphcm.jpg
  - [x] `/media/8338d1543970974f2343.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam-gia-re.jpg
  - [x] `/media/d27e84a8c4ebd4a471a1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-laser-fiber-chi-tiet-may.jpg
  - [x] `/media/3c543508894869dfc645.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-chan-inox.jpg
  - [x] `/media/ad073c3d90ce57442ba7.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-cnc-sat-tphcm.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Cắt laser kim loại Thủ Đức – Cắt laser Sắt Thép Inox giá rẻ

- Route: `/tin-tuc/cat-laser-kim-loai-thu-duc-cat-laser-sat-thep-inox-gia-re-202.html`
- Ảnh cần rà: 17
  - [x] `/media/a04eab3573aa39f7d28c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/44311223.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/7c370fa715d15643ae82.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-gia-re.jpg
  - [x] `/media/9cb3ea1fd5e4adc1f9ae.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-1.jpg
  - [x] `/media/81f820a748b064242080.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-laser-gia-re.jpg
  - [x] `/media/8338d1543970974f2343.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam-gia-re.jpg
  - [x] `/media/a0f9f16c1b0544677ac9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gai-cong-kim-loai-tam.jpg
  - [x] `/media/aaf240ed9a9a7adef4cc.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-cong-kim-loai-tam-tp-hcm-sat-10ly.jpg
  - [x] `/media/b657e52895acac890965.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-thep.jpg
  - [x] `/media/96284729f5765cf01938.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-re-tphcm.jpg
  - [x] `/media/dcee69a57523e490d22d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-10.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Chọn vật liệu in 3D cho chi tiết cơ khí: bắt đầu từ điều kiện làm việc

- Route: `/tin-tuc/chon-vat-lieu-in-3d-cho-chi-tiet-co-khi-bat-dau-tu-dieu-kien-lam-viec-293.html`
- Ảnh cần rà: 11
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/92e4bbf15c4d2855f28f.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh.jpg
  - [—] `/media/0c3213cbfb8d8b482f80.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-so-sanh.jpg
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [—] `/media/70b962d41b5e7858fdca.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ong-gio.jpg

### [x] Công ty gia công cơ khí chính xác tại Bình Dương

- Route: `/tin-tuc/cong-ty-gia-cong-co-khi-chinh-xac-tai-binh-duong-179.html`
- Ảnh cần rà: 14
  - [x] `/media/52199ffe7af5ff4fd047.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/46938674.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/f9b1a76fd44f65dd70f6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cong-ty-co-khi-tphcm.jpg
  - [x] `/media/544d59e70f8802d5c6b1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-phay-cnc.jpg
  - [x] `/media/4c5ba0dfcb57b901bea4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc.jpg
  - [x] `/media/cf79b939336cf9130038.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-co-khi-cnc.jpg
  - [x] `/media/a671d23b3c91134af9e6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc-gia-cong-co-khi-hien-dai.jpg
  - [x] `/media/a79c09b1c6a4d7f2684e.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-vit-tai-bang-tai-inox-4.jpg
  - [x] `/media/6900240af67277d9e081.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/pheu-inox-cong-nghiep.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Công ty gia công cơ khí quận 9 TPHCM | Gia công cơ khí chính xác

- Route: `/tin-tuc/cong-ty-gia-cong-co-khi-quan-9-tphcm-gia-cong-co-khi-chinh-xac-171.html`
- Ảnh cần rà: 10
  - [x] `/media/54d9490f2333b740a397.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/49484893.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/ba90ffde7b1079215d46.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc-1.jpg
  - [x] `/media/e414b95a5f27f8cdfb2b.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi.jpg
  - [x] `/media/71ed0ce7244877f16528.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-nan-mam-xe-3.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Đặt in 3D chi tiết cơ khí cần gửi gì? Hướng dẫn nhận hàng toàn quốc

- Route: `/tin-tuc/dat-in-3d-chi-tiet-co-khi-can-gui-gi-huong-dan-nhan-hang-toan-quoc-284.html`
- Ảnh cần rà: 11
  - [—] `/media/cfb1a37c4a8905e4fda9.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-dat-hang.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/92e4bbf15c4d2855f28f.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh.jpg
  - [—] `/media/de78ce8df424ef96182a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-cu.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/de47eb681fd0b85e2110.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-ung-dung.jpg

### [x] Dịch Vụ Gia Công Cơ Khí Quận 1 - Chất Lượng Cao

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-quan-1-chat-luong-cao-267.html`
- Ảnh cần rà: 14
  - [—] `/media/25cc2f7bed6a23147a81.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/93486617.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/fb43f074172631884a84.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-1-1.jpg
  - [—] `/media/618bdc7561f6d5a22de8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-1-2.jpg
  - [—] `/media/c76e6dae22f83e4cc1b5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-1-3.jpg
  - [—] `/media/a86f467197b2c2e65463.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-1-4.jpg
  - [—] `/media/d0b60168dbe3d1f06a16.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-1-5.jpg
  - [—] `/media/0343fa46ba969ce3b330.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-1-6.jpg
  - [—] `/media/27bf2e01f7628e447780.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-1-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ Gia Công Cơ Khí Quận 11 theo yêu cầu

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-quan-11-theo-yeu-cau-274.html`
- Ảnh cần rà: 14
  - [—] `/media/2ffc3b771eefeaf80628.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/32946114.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/ddf8a4626d1f549b3397.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-11-1.jpg
  - [—] `/media/22c93cea9962a55d7111.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-11-2.jpg
  - [—] `/media/19cc55f83332be18574b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-11-7.jpg
  - [—] `/media/057b3d9b61371b62ecab.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-11-6.jpg
  - [—] `/media/b6060d7963367968255a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-11-3.jpg
  - [—] `/media/6e6ab218a7d198706967.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-11-4.jpg
  - [—] `/media/ebeebc74f4f9db842206.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-11-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch Vụ Gia Công Cơ Khí Quận 3 – Cơ Khí Khởi Minh Uy Tín, Chất Lượng

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-quan-3-co-khi-khoi-minh-uy-tin-chat-luong-269.html`
- Ảnh cần rà: 14
  - [—] `/media/5a24f3d3de9ba5db9c85.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/85319873.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/2c547267e671eb2a7ae5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-3-1.jpg
  - [—] `/media/45184582a780ba8ded03.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-3-6.jpg
  - [—] `/media/42f0a43cb180aa49e331.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-3-7.jpg
  - [—] `/media/dcd592d0a698dee951a1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-3-2.jpg
  - [—] `/media/cf557bc725067d27b27f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-3-3.jpg
  - [—] `/media/61a0886bf55373e5426a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-3-5.jpg
  - [—] `/media/3cdc8d41347d076dfec1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-3-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch Vụ Gia Công Cơ Khí Quận 4 – Chất Lượng Tạo Nên Uy Tín

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-quan-4-chat-luong-tao-nen-uy-tin-270.html`
- Ảnh cần rà: 14
  - [—] `/media/3adcf00b1bfccd1d4d93.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/32525771.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/1c84540b4dd65b5628f0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-4-1.jpg
  - [—] `/media/42f9a1fbedb75af121a7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-4-2.jpg
  - [—] `/media/0b4919bd1523728f0642.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-4-7.jpg
  - [—] `/media/309ce1b0ece6fa608d4d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-4-6.jpg
  - [—] `/media/1f9be3a23b11137f1d11.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-4-3.jpg
  - [—] `/media/7694a14a3ee71fc3d216.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-4-4.jpg
  - [—] `/media/3752bbb34e5899a13fbd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-4-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch Vụ Gia Công Cơ Khí Quận 5 Theo Yêu Cầu

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-quan-5-theo-yeu-cau-271.html`
- Ảnh cần rà: 14
  - [—] `/media/d369a42f283b819ec95a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/60384607.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/6a569e9ff1caadfa4b7d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-5-1.jpg
  - [—] `/media/4be9235eff3d6367890b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-5-2.jpg
  - [—] `/media/b7d704d1100213001040.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-5-7.jpg
  - [—] `/media/212c83abfa16e01deb76.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-5-3.jpg
  - [—] `/media/7c20061a92c501693de0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-5-4.jpg
  - [—] `/media/3f80f50c32ab4fc25626.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-5-5.jpg
  - [—] `/media/0854104df152912521a8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-5-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ Gia Công Cơ Khí Quận Phú Nhuận Chuyên Nghiệp

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-quan-phu-nhuan-chuyen-nghiep-266.html`
- Ảnh cần rà: 14
  - [—] `/media/9ac069ffde63232cdf80.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/67271019.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/9d0fc3f238a28abb0fc9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-phu-nhuan-1.jpg
  - [—] `/media/496418a177ae55eb9905.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-phu-nhuan-2.jpg
  - [—] `/media/6956255d87d043b2b4d4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-phu-nhuan-3.jpg
  - [—] `/media/a1c45a39dffe2d0bdaf7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-phu-nhuan-4.jpg
  - [—] `/media/2874face178c5d898dd2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-phu-nhuan-5.jpg
  - [—] `/media/1051b8d2f1a356f8a356.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-phu-nhuan-6.jpg
  - [—] `/media/650161b6555e7f0af076.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-phu-nhuan-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ gia công cơ khí tại Biên Hòa theo yêu cầu

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-tai-bien-hoa-theo-yeu-cau-182.html`
- Ảnh cần rà: 13
  - [x] `/media/745b0fbd95d0ac280c21.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/43261773.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/905d4d978f9e395edf71.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tphcm.jpg
  - [x] `/media/e7ab2f1693dfc6118641.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-cnc.jpg
  - [x] `/media/18a1646973d8311ef626.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-bien-hoa-dong-nai.jpg
  - [x] `/media/c3b93936129350151c27.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tai-bien-hoa.jpg
  - [x] `/media/cfe0560147be47966c26.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc.jpg
  - [x] `/media/6900240af67277d9e081.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/pheu-inox-cong-nghiep.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ gia công cơ khí tại Cần Thơ giao hàng tận nơi

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-tai-can-tho-giao-hang-tan-noi-256.html`
- Ảnh cần rà: 14
  - [—] `/media/08395c1799986d4ba333.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/39296295.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/18bc4cfad425794d71e6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-tho-1.jpg
  - [—] `/media/40d4a57a55c94c401b66.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-tho-2.jpg
  - [—] `/media/3fa6ffdcf244c6f810e5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-tho-3.jpg
  - [—] `/media/5b4f36c09ff6b4cff623.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-tho-4.jpg
  - [—] `/media/5735b65216675eb5e246.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-tho-5.jpg
  - [—] `/media/4776dc49830afbab729e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-tho-6.jpg
  - [—] `/media/f0d72e665b4096d7a1f3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-tho-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ Gia Công Cơ Khí tại Hóc Môn theo yêu cầu

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-tai-hoc-mon-theo-yeu-cau-264.html`
- Ảnh cần rà: 14
  - [—] `/media/b80eaade1be6aca1f29f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/12380888.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/7f62c9a94239aa79122d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-hoc-mon-1.jpg
  - [—] `/media/d99a18a155042964054d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-hoc-mon-2.jpg
  - [—] `/media/5275fe183f1b6f4bc85a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-hoc-mon-7.jpg
  - [—] `/media/a4b4f7aa1eaa26d2aa34.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-hoc-mon-3.jpg
  - [—] `/media/6d9bdac4a1e24bb8282b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-hoc-mon-4.jpg
  - [—] `/media/fe9439029fb282a90990.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-hoc-mon-5.jpg
  - [—] `/media/de2a7ef08767b2ae008e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-hoc-mon-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ Gia Công Cơ Khí Tại tại Long Thành uy tín

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-tai-tai-long-thanh-uy-tin-254.html`
- Ảnh cần rà: 14
  - [—] `/media/099059cac9fb5d6c4c2d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/64717903.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/f03c5106c18af495ea5b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-thanh-1.jpg
  - [—] `/media/e2ddfc5138d367fbeba9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-thanh-2.jpg
  - [—] `/media/ae20a641e3074d14bbb7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-thanh-3.jpg
  - [—] `/media/d5dd8197788131e34ae5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-thanh-4.jpg
  - [—] `/media/df99d98c1aaaef46da93.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-thanh-5.jpg
  - [—] `/media/ff30dbdce4811e4d09d8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-thanh-6.jpg
  - [—] `/media/b4934e9fd5ac61c34e18.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-thanh-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ Gia Công Cơ Khí tại Tây Ninh theo yêu cầu

- Route: `/tin-tuc/dich-vu-gia-cong-co-khi-tai-tay-ninh-theo-yeu-cau-258.html`
- Ảnh cần rà: 14
  - [—] `/media/2ffed876f34a799fe196.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/23151449.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/e4a8023534778c83f123.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tay-ninh-1.jpg
  - [—] `/media/7393500f4e631e337cd4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tay-ninh-2.jpg
  - [—] `/media/2b49fa02555e10797b80.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tay-ninh-3.jpg
  - [—] `/media/a47a47c21a7f0451d408.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tay-ninh-4.jpg
  - [—] `/media/9b42d8109c070198fb0f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tay-ninh-5.jpg
  - [—] `/media/a92ff15ed5240c41d831.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tay-ninh-7.jpg
  - [—] `/media/a4fa30abeb93fa5b1607.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tay-ninh-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch Vụ Gia Công Tiện Phay CNC Tại Thủ Đức Giá Rẻ Uy Tín

- Route: `/tin-tuc/dich-vu-gia-cong-tien-phay-cnc-tai-thu-duc-gia-re-uy-tin-276.html`
- Ảnh cần rà: 14
  - [—] `/media/8120eb47f227d3c62914.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/95698933.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/b294688b1fd96f739ea9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-phay-cnc-thu-duc-1.jpg
  - [—] `/media/7f4ca51be3d211abe175.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-phay-cnc-thu-duc-3.jpg
  - [—] `/media/925d2ab23437ad81472a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-phay-cnc-thu-duc-4.jpg
  - [—] `/media/51b9bac1c5c760598528.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-phay-cnc-thu-duc-5.jpg
  - [—] `/media/d05fed563de1fd1e10ae.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-phay-cnc-thu-duc-6.jpg
  - [—] `/media/292ff0adc5ec48f134b1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-phay-cnc-thu-duc-7.jpg
  - [—] `/media/65c95f89d692e712e55d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-phay-cnc-thu-duc-8.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dịch vụ khắc Laser quận 8 Giá Rẻ

- Route: `/tin-tuc/dich-vu-khac-laser-quan-8-gia-re-246.html`
- Ảnh cần rà: 10
  - [—] `/media/da067ae4e19aa5eb028d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/81705315.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/4faabd4b686fae40f72c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-8-1.jpg
  - [—] `/media/5d934bc7fc7a58bad425.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-8-2.jpg
  - [—] `/media/aba3ce286718587f09bf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-8-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Đồ gá khoan in 3D kết hợp bạc kim loại: những điểm cần tính trước

- Route: `/tin-tuc/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc-291.html`
- Ảnh cần rà: 11
  - [—] `/media/e45e877bca99f0ba648c.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ga-khoan.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/70934889193ead42788a.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-dung-sai/dung-sai-in-3d-va-do-lap-ghep-cach-ghi-yeu-cau-tren-ban-ve.jpg
  - [—] `/media/d2ff906d2f0521f92cfb.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-do-ga.jpg
  - [—] `/media/24594876c91a6450842a.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-hoan-thien.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg

### [x] Đơn hàng in 3D chi tiết nhựa dạng tay vặn tại Khởi Minh

- Route: `/tin-tuc/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh-297.html`
- Ảnh cần rà: 13
  - [—] `/media/92e4bbf15c4d2855f28f.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/190e3520c8c8ecd54f36.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/chi-tiet-nhua-dang-tay-van-ba-san-pham-khoi-minh.jpg
  - [—] `/media/a0b73ac9abb0bc4467d1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/chi-tiet-nhua-dang-tay-van-lo-tron-va-tay-don-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/70934889193ead42788a.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-dung-sai/dung-sai-in-3d-va-do-lap-ghep-cach-ghi-yeu-cau-tren-ban-ve.jpg
  - [—] `/media/de47eb681fd0b85e2110.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-ung-dung.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/cfb1a37c4a8905e4fda9.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-dat-hang.jpg

### [x] Đồng hồ treo tường trang trí phòng khách GIÁ XƯỞNG Ship Toàn Quốc

- Route: `/tin-tuc/dong-ho-treo-tuong-trang-tri-phong-khach-gia-xuong-ship-toan-quoc-213.html`
- Ảnh cần rà: 16
  - [—] `/media/e8a16b95bed931f4e0fd.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/16608075.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/81b4813d26be54d1e438.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-1.jpg
  - [—] `/media/b66a159d710f1ae20dfe.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-2.jpg
  - [—] `/media/8446584b26970e2fef56.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-3.jpg
  - [—] `/media/3f9845aa433aa4c7c152.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-4.jpg
  - [—] `/media/cab10c8313c9804f1dbe.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-5.jpg
  - [—] `/media/ae3734bbb8475ad5e0d6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-6.jpg
  - [—] `/media/f21713be8419d6453fa9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-7.jpg
  - [—] `/media/12063dda297c44f11788.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-8.jpg
  - [—] `/media/7cbe655aad43cf75bdc4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/dong-ho-treo-tuong-trang-tri-phong-khach-9.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Dung sai in 3D và độ lắp ghép: cách ghi yêu cầu trên bản vẽ

- Route: `/tin-tuc/dung-sai-in-3d-va-do-lap-ghep-cach-ghi-yeu-cau-tren-ban-ve-292.html`
- Ảnh cần rà: 11
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/24594876c91a6450842a.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-hoan-thien.jpg
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg
  - [—] `/media/e45e877bca99f0ba648c.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ga-khoan.jpg

### [x] Gia công cắt Laser Kim Loại tấm TPHCM – Cắt CNC Kim Loại Giá Rẻ

- Route: `/tin-tuc/gia-cong-cat-laser-kim-loai-tam-tphcm-cat-cnc-kim-loai-gia-re-210.html`
- Ảnh cần rà: 23
  - [x] `/media/07dc4d94a5c30a3817a6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/22608188.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/1627d889f5c6c3548899.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam-tphcm(1).jpg
  - [x] `/media/f628b02ceb5580cc737a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai(2).jpg
  - [x] `/media/78f4af257629173a9986.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-1(1).jpg
  - [x] `/media/f3975fd42884a23e439f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-2.jpg
  - [—] `/media/7e949ad631196746b670.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may(1).jpg
  - [x] `/media/cd521a1598723c27efbd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-3.jpg
  - [—] `/media/26305ae25b64637851d0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tphcm(1).jpg
  - [x] `/media/c5e576a33412824e740e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-4.jpg
  - [—] `/media/ad35355013377ba38b45.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai(3).jpg
  - [x] `/media/e446673d6c599f4a91cf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-5.jpg
  - [x] `/media/a2c585436a350d6d59d1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-6.jpg
  - [x] `/media/ceeaae879816a259c9f6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-7.jpg
  - [x] `/media/f7e15f9e60c756883a6f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-8.jpg
  - [x] `/media/dcee69a57523e490d22d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-10.jpg
  - [x] `/media/5e2f88769eb7d1a7c9a4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-11.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công Cắt Thép Tấm theo yêu cầu TPHCM

- Route: `/tin-tuc/gia-cong-cat-thep-tam-theo-yeu-cau-tphcm-218.html`
- Ảnh cần rà: 22
  - [x] `/media/421992b47bce74a3de09.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/54621017.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/115953dbb8a3be4b2c93.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-thep-3.jpg
  - [x] `/media/249dc0e97e376736330f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-thep-5.jpg
  - [x] `/media/f7ae1c8505e97e42901e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-thep-tam.jpg
  - [x] `/media/9ea59647ed571245ab7e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-thep-tam-1.jpg
  - [x] `/media/5e5a248fa093f3747849.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-thep-tam-2.jpg
  - [x] `/media/8f16fe359d481a268fc1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day-7.jpg
  - [x] `/media/a918b716da99f9b0de06.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-thep-tam-3.jpg
  - [x] `/media/4314082e0eb7b3f4038f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day.jpg
  - [x] `/media/38303a959bee96135059.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day-1.jpg
  - [x] `/media/b3a45888d6475e5c7e93.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day-2.jpg
  - [x] `/media/56c4ec0c1b03c5b3d831.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day-3.jpg
  - [x] `/media/0dce082da60e19e4d32a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day-4.jpg
  - [x] `/media/8a83df3fbdf1d968d1b7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day-5.jpg
  - [x] `/media/62e3e46d2ac4096126d9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-day-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Chấn – Dập Thép Tấm TPHCM (Cắt Dập Chấn Uốn)

- Route: `/tin-tuc/gia-cong-chan-dap-thep-tam-tphcm-cat-dap-chan-uon-216.html`
- Ảnh cần rà: 22
  - [x] `/media/e99ca40a78f78679bd79.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/33458472.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/91fb4125d34ffc08a931.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-dap-thep-tam-4.jpg
  - [x] `/media/b456f9c134e6c1733a88.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-dap-thep-tam.jpg
  - [x] `/media/3e42cfeaaa39b79ca3ad.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/chan-dap-thep-tam.jpg
  - [x] `/media/988f7b97f47950154a74.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/chan-dap-thep-tam-tphcm.jpg
  - [x] `/media/147f1c9ab2a233152765.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/chan-dap-thep-tam-tphcm-1.jpg
  - [x] `/media/cfd1a772ec42713c301b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/chan-gap-thep-tam.jpg
  - [x] `/media/e4e45af1e951eb56fb34.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-dap-thep-tam-5.jpg
  - [x] `/media/f7045ce44316d28577fe.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-dap-thep-tam-1.jpg
  - [x] `/media/b50ebbc2fa817e8b7cb0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/chan-gap-thep-tam-1.jpg
  - [x] `/media/d8f0a82f6a72ae9b04c0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-CNC-kim-loai.jpg
  - [x] `/media/c6bfcbf0eaabcca1a565.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-thep-tam.jpg
  - [x] `/media/4f73ff450b04f1614db9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-dap-thep-tam-2.jpg
  - [x] `/media/0e1385e23e18d0b886cc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-dap-thep-tam-3.jpg
  - [x] `/media/911ee357bb1fe471218f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-2.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công cơ khí chính xác quận Bình Thạnh TPHCM | Uy tín chất lượng

- Route: `/tin-tuc/gia-cong-co-khi-chinh-xac-quan-binh-thanh-tphcm-uy-tin-chat-luong-174.html`
- Ảnh cần rà: 11
  - [x] `/media/8aa33d11294e80797de1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/76591117.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/6774876211ec32a5a94c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-co-khi.jpg
  - [x] `/media/6900240af67277d9e081.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/pheu-inox-cong-nghiep.jpg
  - [x] `/media/ba90ffde7b1079215d46.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc-1.jpg
  - [x] `/media/4ec7d43d7367d35e28f6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-banh-rang.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công cơ khí chính xác tại Bình Chánh TPHCM | Giá tốt uy tín

- Route: `/tin-tuc/gia-cong-co-khi-chinh-xac-tai-binh-chanh-tphcm-gia-tot-uy-tin-173.html`
- Ảnh cần rà: 10
  - [x] `/media/ca7e5fc0a3c490b2a0a5.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/68808210.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/f46c9aa9c03b72204fb1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi2.jpg
  - [x] `/media/35457470316426411733.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi3.jpg
  - [x] `/media/0acb1b7bda1c1bc532ca.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-binh-chanh.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Chính Xác Theo Yêu Cầu Tại TPHCM - Giá Rẻ Chất Lượng

- Route: `/tin-tuc/gia-cong-co-khi-chinh-xac-theo-yeu-cau-tai-tphcm-gia-re-chat-luong-163.html`
- Ảnh cần rà: 43
  - [x] `/media/4fe696e6506b3793dcb0.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/06671123.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/fc305d8e37b563d086d7.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-gia-cong-co-khi-goc.jpg
  - [x] `/media/6900240af67277d9e081.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/pheu-inox-cong-nghiep.jpg
  - [x] `/media/471d63603ac9f91d0461.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac(1).jpg
  - [x] `/media/e27816a9d49aca2104cf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chi-tiet-may.jpg
  - [x] `/media/66a59d67051dc26fdefa.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-1.jpg
  - [x] `/media/886b69e9d787e1f2b86b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(3)(1).jpg
  - [x] `/media/f186a33fd4151a6027cb.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-2.jpg
  - [x] `/media/7533735140ab234e2c22.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-2%20(4).jpg
  - [x] `/media/d506a6b8f1289184dc3f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-3.jpg
  - [x] `/media/f94175458edd975fbed2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-3%20(4).jpg
  - [x] `/media/7e3e766e15e9cf65f700.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-4.jpg
  - [x] `/media/5796c371d1a5d3021d29.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-4(1).jpg
  - [x] `/media/f12a6e1f3117c315c192.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-5.jpg
  - [x] `/media/8f0aaf9821de7cb16c0d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-CNC.jpg
  - [x] `/media/803aec19a16875faba96.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-6.jpg
  - [x] `/media/6157066f624e4982f9ee.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/chi-tiet-may.jpg
  - [x] `/media/637abebdf65db4e2cd06.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-CNC-10.jpg
  - [x] `/media/c474b73c9b62dabfb454.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-7.jpg
  - [x] `/media/7dc99e490d5f5452a63d.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-tphcm.jpg
  - [x] `/media/f5429c8c006309b89404.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-8.jpg
  - [x] `/media/5973841e3b162d1a5062.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-CNC-11.jpg
  - [x] `/media/aa066151f2101e564d5c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-9.jpg
  - [x] `/media/ba90ffde7b1079215d46.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc-1.jpg
  - [x] `/media/aae3b1cff37897cf23e5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-10.jpg
  - [x] `/media/ee31f30db8e09b160ac7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-theo-yeu-cau-1.jpg
  - [x] `/media/506ab8f4198e82cab451.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-theo-yeu-cau-2.jpg
  - [x] `/media/261c8ff095dbdc77b74e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-theo-yeu-cau-3.jpg
  - [x] `/media/32c977ff519d9a24f255.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-theo-yeu-cau-4.jpg
  - [x] `/media/f43ed33991c893507ac8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-11.jpg
  - [x] `/media/a76796af22c3e5a7e73a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-12.jpg
  - [x] `/media/686a79b17eb37dd1d05d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-theo-yeu-cau-5.jpg
  - [x] `/media/d42d7de3f5b0d63a757c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-13.jpg
  - [x] `/media/1843670e515a58969b70.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/Bang-tai-con-lan-inox.jpg
  - [x] `/media/d31690b85badd7a66939.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/ballet-sat.jpg
  - [x] `/media/882b7b23a4d9a094e8e5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-14.jpg
  - [x] `/media/3f58af78182e4ecd7d09.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-15.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công cơ khí Gò Vấp | Gia công cơ khí theo yêu cầu

- Route: `/tin-tuc/gia-cong-co-khi-go-vap-gia-cong-co-khi-theo-yeu-cau-211.html`
- Ảnh cần rà: 24
  - [x] `/media/0285a9cb866c70d16bc9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/21057247.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/fc305d8e37b563d086d7.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-gia-cong-co-khi-goc.jpg
  - [x] `/media/609aa59dc9cc851647de.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(27).jpg
  - [x] `/media/79579bb5b708257bb0bf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(22).jpg
  - [x] `/media/3f8c57cc52b12b2a5f85.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(13).jpg
  - [x] `/media/c99b3ed6dc9bd4c11d84.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(23).jpg
  - [x] `/media/45c81080f0d11399bf94.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(14).jpg
  - [x] `/media/249b804599ee9ac6bc62.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(24).jpg
  - [x] `/media/e46825f8b74182851503.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(25).jpg
  - [x] `/media/85a0ccb65a8a41a63a8b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(15).jpg
  - [x] `/media/4f0229991e63e2e861ec.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(26).jpg
  - [x] `/media/f33ae0ce92c1176c2a95.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(16).jpg
  - [x] `/media/7227092ce6eaaa77e5f0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(28).jpg
  - [x] `/media/ed38f4d7073b9115ac37.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(17).jpg
  - [x] `/media/18bf10687f26639196d3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(18).jpg
  - [x] `/media/a2b25b93cb4cd9d25fcc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(19).jpg
  - [x] `/media/dc94a49ad479e46a148e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(20).jpg
  - [x] `/media/33a4b46521ee8f922086.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(21).jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Quận 2 - Đối Tác Tin Cậy Cho Mọi Dự Án

- Route: `/tin-tuc/gia-cong-co-khi-quan-2-doi-tac-tin-cay-cho-moi-du-an-268.html`
- Ảnh cần rà: 14
  - [—] `/media/340f5f0146a7fd8d5c50.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/23919179.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/0d96ce65d8088af796b2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-2-1.jpg
  - [—] `/media/c9fbe2fda7e20f8d53e7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-2-6.jpg
  - [—] `/media/3bcff12cfd7c35845a2d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-2-7.jpg
  - [—] `/media/dd14ef4632983936b6b2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-2-2.jpg
  - [—] `/media/f99c87d000221cebe96f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-2-3.jpg
  - [—] `/media/b50f55f82df56de7332c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-2-4.jpg
  - [—] `/media/917cc516a34c4016c431.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-2-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Quận 6 – Dịch Vụ Chuyên Nghiệp Uy Tín

- Route: `/tin-tuc/gia-cong-co-khi-quan-6-dich-vu-chuyen-nghiep-uy-tin-272.html`
- Ảnh cần rà: 14
  - [—] `/media/e35ac31cc2de00107e83.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/12895665.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/a6b1473870729e828b35.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-6-1.jpg
  - [—] `/media/838cf5249e5b03c2cde1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-6-7.jpg
  - [—] `/media/7f0d4ff2e428a3e0da2d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-6-2.jpg
  - [—] `/media/fe69d50f87fb1ddeca0b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-6-3.jpg
  - [—] `/media/4a7020ba9cef3ff4d5e5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-6-4.jpg
  - [—] `/media/87bafd8736555f4e6eaa.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-6-5.jpg
  - [—] `/media/8b55423de9bdfe3bb4dd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-6-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Quận 8 – Đối Tác Tin Cậy Uy Tín

- Route: `/tin-tuc/gia-cong-co-khi-quan-8-doi-tac-tin-cay-uy-tin-273.html`
- Ảnh cần rà: 14
  - [—] `/media/535a2c446db5aae2fd70.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/20089292.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/9d9b4c6747e4771a6477.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-8-1.jpg
  - [—] `/media/f8ee787276f51b5c3991.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-8-2.jpg
  - [—] `/media/904a3089d00bc556cf1d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-8-3.jpg
  - [—] `/media/7de3229efdc5c84e9a08.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-8-7.jpg
  - [—] `/media/d0f05c194bdc2e73538c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-8-6.jpg
  - [—] `/media/401ea327b042781477db.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-8-4.jpg
  - [—] `/media/fce9aad42e0625bc337e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-8-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Quận Tân Bình Uy tín Chất lượng

- Route: `/tin-tuc/gia-cong-co-khi-quan-tan-binh-uy-tin-chat-luong-275.html`
- Ảnh cần rà: 14
  - [—] `/media/54674b74b2fad25f1f53.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/80391050.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/65196399a97e8b472e6d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tan-binh-1.jpg
  - [—] `/media/ea0be8849abae7f34cc9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tan-binh-2.jpg
  - [—] `/media/4a361c74f79401a86baa.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tan-binh-3.jpg
  - [—] `/media/e58ed2ec840462b914cf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tan-binh-4.jpg
  - [—] `/media/8ee977b8b15f0e7f2d03.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tan-binh-5.jpg
  - [—] `/media/1d7bf7d83260ab7a3e53.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tan-binh-6.jpg
  - [—] `/media/e375d53730d0556db997.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tan-binh-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Tại Cần Giờ Giao Hàng Tận Nơi

- Route: `/tin-tuc/gia-cong-co-khi-tai-can-gio-giao-hang-tan-noi-262.html`
- Ảnh cần rà: 14
  - [—] `/media/4a99e18aaf30b20a7134.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/68091962.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/1bd3b35cb4f5634ad412.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-gio-1.jpg
  - [—] `/media/907165ac645d2ed2a3cd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-gio-2.jpg
  - [—] `/media/23de97f884e480f7c3bc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-gio-3.jpg
  - [—] `/media/eea9368c0b80a3340c8a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-gio-4.jpg
  - [—] `/media/9f152749a0470ddaa310.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-gio-5.jpg
  - [—] `/media/9efdd25d0e03abca753d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-gio-7.jpg
  - [—] `/media/40c7bc42863af2898653.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-can-gio-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Tại Dĩ An Theo Yêu Cầu

- Route: `/tin-tuc/gia-cong-co-khi-tai-di-an-theo-yeu-cau-260.html`
- Ảnh cần rà: 14
  - [—] `/media/d6dab872282d42f9eed3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/19328943.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/271dd0b7b4af0265c28c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-di-an-1.jpg
  - [—] `/media/201658740c9e02fa7ac1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-di-an-2.jpg
  - [—] `/media/f0426842e31b3c58b540.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-di-an-3.jpg
  - [—] `/media/569741c715e84585662d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-di-an-4.jpg
  - [—] `/media/7e9cba9253bc82f51e3a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-di-an-5.jpg
  - [—] `/media/1bc08a0615253173ae2e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-di-an-7.jpg
  - [—] `/media/9d98cf42344085f8095d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-di-an-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Tại Đồng Nai – Khởi Minh: Dẫn Đầu Chất Lượng

- Route: `/tin-tuc/gia-cong-co-khi-tai-dong-nai-khoi-minh-dan-dau-chat-luong-253.html`
- Ảnh cần rà: 14
  - [—] `/media/7fd873987f0280c5df6a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/91835231.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/d3150a16b62ddc0b26bf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dong-nai-1.jpg
  - [—] `/media/a6e1f7043338aa0fb873.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dong-nai-2.jpg
  - [—] `/media/ce77ed535254173906f2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dong-nai-3.jpg
  - [—] `/media/d66a4363b73cc3eba52d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dong-nai-4.jpg
  - [—] `/media/001ad8ceb6cd664eb335.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dong-nai-5.jpg
  - [—] `/media/f87581452718abe2f9f3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dong-nai-6.jpg
  - [—] `/media/ada7ad1afe6402bfb595.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dong-nai-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Tại Long An Giao Hàng Tận Nơi

- Route: `/tin-tuc/gia-cong-co-khi-tai-long-an-giao-hang-tan-noi-257.html`
- Ảnh cần rà: 14
  - [—] `/media/aca79ae36ae65388b11f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/03585720.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/577319a20518cdfc6959.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-an-1.jpg
  - [—] `/media/5a4117edf87edb6e3609.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-an-2.jpg
  - [—] `/media/88280b64dac0e6d32517.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-an-4.jpg
  - [—] `/media/228f06c10d11183fb8ef.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-an-3.jpg
  - [—] `/media/669a0815bb5a1437f1c5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-an-6.jpg
  - [—] `/media/88a5a48e610bcf895c51.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-an-5.jpg
  - [—] `/media/9acf7ac629f9fe732ff2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-long-an-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí Tại Nhơn Trạch Uy Tín Chuyên Nghiệp

- Route: `/tin-tuc/gia-cong-co-khi-tai-nhon-trach-uy-tin-chuyen-nghiep-255.html`
- Ảnh cần rà: 14
  - [—] `/media/963553a0c36ed13c9cc1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/77878061.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/6b7ccceb8cfd713c5bbd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nhon-trach-1.jpg
  - [—] `/media/e84021febf8f4a5253ee.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nhon-trach-2.jpg
  - [—] `/media/d161d7b36644bfc03835.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nhon-trach-3.jpg
  - [—] `/media/c0197b6b60a1081857e4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nhon-trach-4.jpg
  - [—] `/media/6a7fb8500249291d1d91.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nhon-trach-7.jpg
  - [—] `/media/30cab80c746895765a2a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nhon-trach-5.jpg
  - [—] `/media/c8f11f18d85fa62f116c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nhon-trach-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công cơ khí tại quận 10 TPHCM | Cơ khí chính xác giá rẻ

- Route: `/tin-tuc/gia-cong-co-khi-tai-quan-10-tphcm-co-khi-chinh-xac-gia-re-176.html`
- Ảnh cần rà: 11
  - [x] `/media/6c6a9f7f6cb050916939.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/47049848.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/411998d8b4f9de858d04.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chi-tiet-may.jpg
  - [x] `/media/f46c9aa9c03b72204fb1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi2.jpg
  - [x] `/media/cacf73f58ca8294b55cf.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dan-dung.jpg
  - [x] `/media/ef4071dc4c5c86dab9de.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/che-tao-khuon-mau-co-khi.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công cơ khí tại quận 7 TPHCM | Gia công chính xác theo yêu cầu

- Route: `/tin-tuc/gia-cong-co-khi-tai-quan-7-tphcm-gia-cong-chinh-xac-theo-yeu-cau-172.html`
- Ảnh cần rà: 11
  - [x] `/media/08eba1720a856ea6639c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/87230282.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/ef4071dc4c5c86dab9de.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/che-tao-khuon-mau-co-khi.jpg
  - [x] `/media/e414b95a5f27f8cdfb2b.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi.jpg
  - [x] `/media/4ec7d43d7367d35e28f6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-banh-rang.jpg
  - [x] `/media/98ec29bac9bcabd26333.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công cơ khí tại quận Tân Phú TPHCM | Gia công cơ khí chính xác giá rẻ

- Route: `/tin-tuc/gia-cong-co-khi-tai-quan-tan-phu-tphcm-gia-cong-co-khi-chinh-xac-gia-re-175.html`
- Ảnh cần rà: 10
  - [x] `/media/65433e293041e47a31ea.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/24734264.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/905d4d978f9e395edf71.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tphcm.jpg
  - [x] `/media/411998d8b4f9de858d04.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chi-tiet-may.jpg
  - [x] `/media/4b6789db00ddda99ae48.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-co-khi-tan-phu-tphcm.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí tại Thủ Dầu Một uy tín chuyên nghiệp

- Route: `/tin-tuc/gia-cong-co-khi-tai-thu-dau-mot-uy-tin-chuyen-nghiep-261.html`
- Ảnh cần rà: 14
  - [—] `/media/176fc1d97cc670ed13fe.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/38234233.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/200aa2048a68b68cfde2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-thu-dau-mot-1.jpg
  - [—] `/media/bea381620244a0d6344e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-thu-dau-mot-2.jpg
  - [—] `/media/f84002730daf4f0d58b3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-thu-dau-mot-4.jpg
  - [—] `/media/7b55baec4f3ef557a227.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-thu-dau-mot-3.jpg
  - [—] `/media/561c9c9d3decc6447892.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-thu-dau-mot-5.jpg
  - [—] `/media/f86785487090e4cb3f3c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-thu-dau-mot-6.jpg
  - [—] `/media/bfca93091803bc7ddda5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-thu-dau-mot-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công cơ khí tại quận Thủ Đức | Cơ khí chính xác TPHCM

- Route: `/tin-tuc/gia-cong-co-khi-tai-thu-duc-co-khi-chinh-xac-tphcm-170.html`
- Ảnh cần rà: 23
  - [x] `/media/079eb95b4139809abdf8.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/33116534.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/30b4af50d839e643fb2a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac(2).jpg
  - [x] `/media/ba90ffde7b1079215d46.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc-1.jpg
  - [x] `/media/8499ddf3aa7b6499a67c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(1).jpg
  - [x] `/media/10a82a56f217e928f50e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac-quan-thu-duc.jpg
  - [x] `/media/1b58e5a5e07932279e90.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-quan-thu-duc-tphcm.jpg
  - [x] `/media/86d98ba0dccb630d009c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(2).jpg
  - [x] `/media/db9166da7901d65cb6d4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(3).jpg
  - [x] `/media/0b16643e2437c20543b7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(4).jpg
  - [x] `/media/77b24c4aa19bdbff3b14.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(9).jpg
  - [x] `/media/c4c2949cd3260374955d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(10).jpg
  - [x] `/media/4fa4c8f98433c7366f7c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(5).jpg
  - [x] `/media/6ef5a8536ac137b61f4d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(6).jpg
  - [x] `/media/28c494dc6ce52632a19b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(7).jpg
  - [x] `/media/fd6a84ef6295b7d1a297.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(11).jpg
  - [x] `/media/cb094e7a8af5077a7d1e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(12).jpg
  - [x] `/media/9e0bd8a65ccfca0926db.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi%20(8).jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia Công Cơ Khí tại Vũng Tàu Uy Tín Chuyên Nghiệp

- Route: `/tin-tuc/gia-cong-co-khi-tai-vung-tau-uy-tin-chuyen-nghiep-259.html`
- Ảnh cần rà: 14
  - [—] `/media/5669dd1078d231acf765.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/65310406.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/6b6158d97c6a5f66ef61.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-vung-tau-1.jpg
  - [—] `/media/bcba49443ba6898f90d7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-vung-tau-2.jpg
  - [—] `/media/63776e72e22012fec9a0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-vung-tau-4.jpg
  - [—] `/media/5bcc2e4ffa20b425675c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-vung-tau-3.jpg
  - [—] `/media/4fb79a41b9f6e95a2931.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-vung-tau-5.jpg
  - [—] `/media/c8c68556247f5168b3c1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-vung-tau-6.jpg
  - [—] `/media/ba211835702618ea89b4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-vung-tau-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Gia Công Cửa Cổng Sắt Cắt CNC tại TPHCM – Mẫu cổng sắt CNC

- Route: `/tin-tuc/gia-cong-cua-cong-sat-cat-cnc-tai-tphcm-mau-cong-sat-cnc-217.html`
- Ảnh cần rà: 52
  - [x] `/media/cf6711aaa9092f5e3c20.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/10587743.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/3dd055673da0e1b11f09.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-24.jpg
  - [x] `/media/b1a73e4c0aafc53b58db.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-1.jpg
  - [x] `/media/b50ab8c9912f91574979.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-25.jpg
  - [x] `/media/56d54a65f5cc2754755d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep.jpg
  - [x] `/media/ead1ce8b72d369002c20.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-2.jpg
  - [x] `/media/16facfac56c6d92fcdf3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-26.jpg
  - [x] `/media/1895fc43ea43967889df.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-27.jpg
  - [x] `/media/a6285b8040e73d9f65f0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-3.jpg
  - [x] `/media/07188b77449f7d9d14e4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-4.jpg
  - [x] `/media/5e953c15c22049f9614d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-28.jpg
  - [x] `/media/3ac38d7beb51d9f590ac.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-5.jpg
  - [x] `/media/165882f515e36a97bb0b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-29.jpg
  - [x] `/media/f5d0d58899883d4b01bd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-2-canh.jpg
  - [x] `/media/656468719cc2eca6c6b8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-30.jpg
  - [x] `/media/2d6ff1ee4e7186f51a22.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-2-canh-1.jpg
  - [x] `/media/f6c3576a656f92003a2a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-2-canh-2.jpg
  - [x] `/media/3814b15864d542d0ef14.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-2-canh-3.jpg
  - [x] `/media/943c893c44ea10756cc6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-4-canh.jpg
  - [x] `/media/294de494d8c652a5dd91.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-4-canh-1.jpg
  - [x] `/media/a928a35d18f4e2563322.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-4-canh-2.jpg
  - [x] `/media/e13335e01a552df6e7f5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-4-canh-3.jpg
  - [x] `/media/cc4db1f76baf9368ebc5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-sat-cat-cnc-4-canh-4.jpg
  - [x] `/media/71d133bbab9bbcb9c453.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-6.jpg
  - [x] `/media/e38ebb41ec64ce18adf5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-7.jpg
  - [x] `/media/5d012cfb28b520893eb3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-31.jpg
  - [x] `/media/c6cf7981625875bb6895.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-8.jpg
  - [x] `/media/d36e8c20513199ad43f4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-32.jpg
  - [x] `/media/e04e9c44a112030818d7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-9.jpg
  - [x] `/media/558f542c0eaee6cc35e6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-10.jpg
  - [ ] `/media/7c40bec89610c5b2c27f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-11.jpg
  - [ ] `/media/b682f5e6a8e0db34f429.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-33.jpg
  - [ ] `/media/b8e48eb2dbca6c569d41.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-12.jpg
  - [ ] `/media/119d240a3adf4c4d2952.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cnc-hinh-con-buom.jpg
  - [ ] `/media/7a40dc0563dcbe871fa9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-13.jpg
  - [ ] `/media/adc37a9d8a56ee3b4ccd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-14.jpg
  - [ ] `/media/136eae1d1525e6b7b3a9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-15.jpg
  - [ ] `/media/3f56dd0dfd7ad05d6493.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-16.jpg
  - [ ] `/media/37a23b0214ecdaf94e85.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-17.jpg
  - [ ] `/media/9cd1c665eca3b2de47ee.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-18.jpg
  - [ ] `/media/6110e52c4324d2338087.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-19.jpg
  - [ ] `/media/930d7f4adb7f731eaf4e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-20.jpg
  - [ ] `/media/fecb3c4414f1e6696cd1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-21.jpg
  - [ ] `/media/e1263fad0b39e8f47184.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-23.jpg
  - [ ] `/media/336af5c7e36210144d8b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cua-cong-sat-cat-cnc-dep-22.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Gia công Inox theo yêu cầu TPHCM | Xưởng gia công Inox giá rẻ

- Route: `/tin-tuc/gia-cong-inox-theo-yeu-cau-tphcm-xuong-gia-cong-inox-gia-re-212.html`
- Ảnh cần rà: 18
  - [ ] `/media/66cc223419890acda822.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/13195708.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/0998212460a8063a0ef0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-tren-inox.jpg
  - [ ] `/media/959a5e8755776a282a8a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/chan-gap-inox.jpg
  - [ ] `/media/106a805647efd3c26b4a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-bao-chan-inox-01.jpg
  - [ ] `/media/1f4245ca4d61218f5d71.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-chan-sat-thep-inox.jpg
  - [ ] `/media/984e7d94d8b8827085a2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-inox.jpg
  - [ ] `/media/ff29a51c34ec4bcee63b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-inox-1.jpg
  - [ ] `/media/1678337d0aed1b96c181.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-inox-3-1.jpg
  - [ ] `/media/b436b1afd57618d688b1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-inox-theo-yeu-cau-1.jpg
  - [ ] `/media/4f54becd3bcaf5c79f68.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-inox-theo-yeu-cau-16.jpg
  - [ ] `/media/120036fd368369f579fa.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-inox-theo-yeu-cau-gia-re.jpg
  - [x] `/media/3c543508894869dfc645.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-chan-inox.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Gia công sau in 3D: khoan, doa, tạo ren và lắp phụ kiện kim loại

- Route: `/tin-tuc/gia-cong-sau-in-3d-khoan-doa-tao-ren-va-lap-phu-kien-kim-loai-283.html`
- Ảnh cần rà: 11
  - [—] `/media/24594876c91a6450842a.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-hoan-thien.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/e45e877bca99f0ba648c.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ga-khoan.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/d2ff906d2f0521f92cfb.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-do-ga.jpg
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg

### [ ] Gia công Tiện Phay CNC chính xác theo yêu cầu TPHCM

- Route: `/tin-tuc/gia-cong-tien-cnc-phay-cnc-chinh-xac-theo-yeu-cau-tphcm-180.html`
- Ảnh cần rà: 21
  - [ ] `/media/39fd7158a73cbac2dbe4.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/91219653.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/2d023ce4a7da133dc37a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-cnc.jpg
  - [ ] `/media/da86956eecd49da6da6e.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-3.jpg
  - [ ] `/media/565bdef49f0fb7bb8486.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cac-chi-tiet.jpg
  - [ ] `/media/6e3bcced447f04479a05.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-4.jpg
  - [ ] `/media/6edaddf6b31ab95e8ee9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc.jpg
  - [ ] `/media/43ba3820aa15fcc60688.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc(1).jpg
  - [ ] `/media/344cde05df7b1882044b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc(1).jpg
  - [ ] `/media/ef8b7bb5c83461ef9559.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc-1.jpg
  - [ ] `/media/a37bc98d40d4aa3e2d20.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc(1).jpg
  - [ ] `/media/9e46d3ed1687bad150c8.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/jig-nhua-nhom.jpg
  - [ ] `/media/6c232938b30455cfcb1d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-1.jpg
  - [x] `/media/03714822033e8dcf4b0f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-do-ga-jig.jpg
  - [ ] `/media/a611f3ad3eccedd588bf.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-khuon.jpg
  - [ ] `/media/bd0c8d9f57a7912951e9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-2.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Gia công Tiện Phay CNC chính xác theo yêu cầu TPHCM

- Route: `/tin-tuc/gia-cong-tien-phay-cnc-chinh-xac-theo-yeu-cau-tphcm-180.html`
- Ảnh cần rà: 21
  - [ ] `/media/39fd7158a73cbac2dbe4.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/91219653.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/2d023ce4a7da133dc37a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-cnc.jpg
  - [ ] `/media/da86956eecd49da6da6e.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-3.jpg
  - [ ] `/media/565bdef49f0fb7bb8486.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cac-chi-tiet.jpg
  - [ ] `/media/6e3bcced447f04479a05.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-4.jpg
  - [ ] `/media/6edaddf6b31ab95e8ee9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc.jpg
  - [ ] `/media/43ba3820aa15fcc60688.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc(1).jpg
  - [ ] `/media/344cde05df7b1882044b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc(1).jpg
  - [ ] `/media/ef8b7bb5c83461ef9559.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/tien-cnc-1.jpg
  - [ ] `/media/a37bc98d40d4aa3e2d20.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc(1).jpg
  - [ ] `/media/9e46d3ed1687bad150c8.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/jig-nhua-nhom.jpg
  - [ ] `/media/6c232938b30455cfcb1d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-1.jpg
  - [x] `/media/03714822033e8dcf4b0f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-do-ga-jig.jpg
  - [ ] `/media/a611f3ad3eccedd588bf.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/phay-khuon.jpg
  - [ ] `/media/bd0c8d9f57a7912951e9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-phay-cnc-2.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] In 3D bánh răng nhựa: khi nào phù hợp, cần cung cấp thông số gì?

- Route: `/tin-tuc/in-3d-banh-rang-nhua-khi-nao-phu-hop-can-cung-cap-thong-so-gi-285.html`
- Ảnh cần rà: 11
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/4e4e95c6f65a5b2a1d44.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-banh-rang-cnc.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/bfca9a5e4829f84e8a7f.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-puly.jpg

### [x] In 3D chi tiết nhựa theo mẫu cũ: cần đo và xác nhận những gì?

- Route: `/tin-tuc/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi-289.html`
- Ảnh cần rà: 11
  - [—] `/media/de78ce8df424ef96182a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-cu.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/70934889193ead42788a.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-dung-sai/dung-sai-in-3d-va-do-lap-ghep-cach-ghi-yeu-cau-tren-ban-ve.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/cfb1a37c4a8905e4fda9.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-dat-hang.jpg

### [x] In 3D đồ gá cơ khí: ứng dụng lắp ráp, định vị và kết hợp kim loại

- Route: `/tin-tuc/in-3d-do-ga-co-khi-ung-dung-lap-rap-dinh-vi-va-ket-hop-kim-loai-286.html`
- Ảnh cần rà: 11
  - [—] `/media/d2ff906d2f0521f92cfb.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-do-ga.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/e45e877bca99f0ba648c.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ga-khoan.jpg
  - [—] `/media/c55cf8c0201ac8090ac1.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-robot.jpg
  - [—] `/media/24594876c91a6450842a.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-hoan-thien.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg

### [x] In 3D hay CNC nhựa: chọn phương án nào cho chi tiết của bạn?

- Route: `/tin-tuc/in-3d-hay-cnc-nhua-chon-phuong-an-nao-cho-chi-tiet-cua-ban-282.html`
- Ảnh cần rà: 11
  - [—] `/media/0c3213cbfb8d8b482f80.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-so-sanh.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/4e4e95c6f65a5b2a1d44.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-banh-rang-cnc.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg

### [x] In 3D má kẹp và gá cảm biến robot: từ biên dạng đến kiểm tra lắp

- Route: `/tin-tuc/in-3d-ma-kep-va-ga-cam-bien-robot-tu-bien-dang-den-kiem-tra-lap-295.html`
- Ảnh cần rà: 11
  - [—] `/media/c55cf8c0201ac8090ac1.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-robot.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/d2ff906d2f0521f92cfb.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-do-ga.jpg
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg

### [x] In 3D mẫu thử cơ khí: kiểm tra hình dáng, lắp ghép và thiết kế

- Route: `/tin-tuc/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke-288.html`
- Ảnh cần rà: 11
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/70934889193ead42788a.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-dung-sai/dung-sai-in-3d-va-do-lap-ghep-cach-ghi-yeu-cau-tren-ban-ve.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg
  - [—] `/media/0c3213cbfb8d8b482f80.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-so-sanh.jpg
  - [—] `/media/cfb1a37c4a8905e4fda9.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-dat-hang.jpg

### [x] In 3D ống gió, chụp hút và đầu chuyển theo yêu cầu: lưu ý thiết kế

- Route: `/tin-tuc/in-3d-ong-gio-chup-hut-va-dau-chuyen-theo-yeu-cau-luu-y-thiet-ke-296.html`
- Ảnh cần rà: 11
  - [—] `/media/70b962d41b5e7858fdca.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ong-gio.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg

### [x] In 3D puly nhựa và chi tiết truyền động: cần kiểm tra gì?

- Route: `/tin-tuc/in-3d-puly-nhua-va-chi-tiet-truyen-dong-can-kiem-tra-gi-294.html`
- Ảnh cần rà: 11
  - [—] `/media/bfca9a5e4829f84e8a7f.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-puly.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [—] `/media/4e4e95c6f65a5b2a1d44.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-banh-rang-cnc.jpg
  - [—] `/media/24594876c91a6450842a.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-hoan-thien.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg

### [x] In 3D vỏ thiết bị và giá đỡ theo yêu cầu: thiết kế để lắp vừa

- Route: `/tin-tuc/in-3d-vo-thiet-bi-va-gia-do-theo-yeu-cau-thiet-ke-de-lap-vua-287.html`
- Ảnh cần rà: 11
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/70b962d41b5e7858fdca.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-ong-gio.jpg
  - [—] `/media/71a61c8136a357299c8d.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-dung-sai.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/afd1a616546a71ceb5a6.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-vat-lieu.jpg

### [ ] Khắc laser Bình Chánh trên kim loại, giao tận nơi

- Route: `/tin-tuc/khac-laser-binh-chanh-gia-re-249.html`
- Ảnh cần rà: 10
  - [ ] `/media/ef4c33ffde88641f7e7c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/40848773.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/7d48fae45492a1efac87.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-binh-chanh-1.jpg
  - [ ] `/media/f4bc5ec2817549f20c31.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-binh-chanh-2.jpg
  - [ ] `/media/649bac6a9a7bc706dbd3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-binh-chanh-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 1 Giá Rẻ Khắc Nhanh

- Route: `/tin-tuc/khac-laser-quan-1-gia-re-khac-nhanh-241.html`
- Ảnh cần rà: 10
  - [ ] `/media/984d957b1e56722b85c4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/58555133.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/ca92750cd93494f23293.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-1-6.jpg
  - [ ] `/media/0d5ea2158edc79f04442.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-1-4.jpg
  - [ ] `/media/2c588d9ccedf30feedbe.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-1-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 10 Giá Rẻ Uy Tín

- Route: `/tin-tuc/khac-laser-quan-10-gia-re-uy-tin-239.html`
- Ảnh cần rà: 11
  - [ ] `/media/afeedfec6996800e4fde.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/39946199.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/7ec8fe1ea789e4e5bb24.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-10-5.jpg
  - [ ] `/media/fce136ea1991fa7e85f0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-10-4.jpg
  - [ ] `/media/6b50ba0f530d66dc4da6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-10-7.jpg
  - [ ] `/media/c84c1a3f352c6c6dda9e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-10-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 11 Lấy Liền

- Route: `/tin-tuc/khac-laser-quan-11-lay-lien-247.html`
- Ảnh cần rà: 11
  - [ ] `/media/e78d2d2b359a5eaed62b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/51776847.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/a4339146e63b4d4e0ca1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-11-5.jpg
  - [ ] `/media/9ac6f2d139203b6239b5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-11-1.jpg
  - [ ] `/media/032d25ee9f42e1429489.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-11-2.jpg
  - [ ] `/media/8437ee32870658a40e4f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-11-3.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc laser quận 12: mã chi tiết, nhãn máy kim loại

- Route: `/tin-tuc/khac-laser-quan-12-gia-re-248.html`
- Ảnh cần rà: 10
  - [ ] `/media/11f039da13949b2cc6e6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/27200212.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/8af53ab03e4efbd671ea.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-12-2.jpg
  - [ ] `/media/f3bd5b5a36a8a3faa5b9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-12-1.jpg
  - [ ] `/media/5b163333bc5fcb03fa06.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-12-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 3 Giá Rẻ Đẹp

- Route: `/tin-tuc/khac-laser-quan-3-gia-re-dep-240.html`
- Ảnh cần rà: 11
  - [ ] `/media/cdfaef54716e7de42325.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/11114582.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/8c26da02fb422877605f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-3-3.jpg
  - [ ] `/media/a55c4d707701917c320a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-3-1.jpg
  - [ ] `/media/854841c4e71466cf0532.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-3-2.jpg
  - [ ] `/media/1d8caaf29c819f4cd070.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-3-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 4 Giá Rẻ Uy Tín

- Route: `/tin-tuc/khac-laser-quan-4-gia-re-uy-tin-242.html`
- Ảnh cần rà: 10
  - [ ] `/media/a91ed3387750d936414b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/14176994.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/67280cf1c6a32c91cce6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-4-6.jpg
  - [ ] `/media/575e7a1aa58486d86834.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-4-4.jpg
  - [ ] `/media/d4aaba47133b93358517.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-4-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 5 trên kim loại theo yêu cầu

- Route: `/tin-tuc/khac-laser-quan-5-tren-moi-chat-lieu-243.html`
- Ảnh cần rà: 10
  - [ ] `/media/2350307d27c275c1f313.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/17359733.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/dfae8cb1123044fb69b2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-5-1.jpg
  - [ ] `/media/cd8dea14c6e5a733255e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-5-4.jpg
  - [ ] `/media/90d76c0d5e1d59a81fb3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-5-2.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 6 Giá Rẻ Giao Tận Nơi

- Route: `/tin-tuc/khac-laser-quan-6-gia-re-giao-tan-noi-245.html`
- Ảnh cần rà: 10
  - [ ] `/media/e5deac3af652b8acaf7d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/89486224.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/bea0473e8744b439d07e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-1.jpg
  - [ ] `/media/67a9b1061ffe1b92b692.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-6-3.jpg
  - [ ] `/media/f869b94534978f21d3c5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-6-2.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận 7 Giá Rẻ Uy Tín

- Route: `/tin-tuc/khac-laser-quan-7-gia-re-uy-tin-244.html`
- Ảnh cần rà: 10
  - [ ] `/media/3a868bf528b59419eecd.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/69837416.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/e0d4a4566ff61982aefc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-7-1.jpg
  - [ ] `/media/7a87f82dd1fc997f3233.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-7-2.jpg
  - [ ] `/media/b34f873f30cd21b038bf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-7-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận Bình Tân mọi số lượng

- Route: `/tin-tuc/khac-laser-quan-binh-tan-moi-so-luong-236.html`
- Ảnh cần rà: 11
  - [ ] `/media/dcc9148ac5f354660f39.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/08610314.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/9f212986f77f8e878690.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-19(1).jpg
  - [ ] `/media/62c657b2474bd84a259a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-9(1).jpg
  - [ ] `/media/40f5ec2be489e02493e6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-11(1).jpg
  - [ ] `/media/1cf7049415c46130ed83.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-3(1).jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc laser Bình Thạnh trên kim loại: tư vấn lấy liền

- Route: `/tin-tuc/khac-laser-quan-binh-thanh-lay-lien-250.html`
- Ảnh cần rà: 10
  - [ ] `/media/f2e1c995db548f833a90.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/52366637.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/d01db7d556f7bd948053.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-binh-thanh-2.jpg
  - [ ] `/media/a3abc7b22b8215302614.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-binh-thanh-3.jpg
  - [ ] `/media/a5a9cd3d084627731e44.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-binh-thanh-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc laser Gò Vấp: tên, logo trên kim loại từ 1 sản phẩm

- Route: `/tin-tuc/khac-laser-quan-go-vap-gia-re-dep-251.html`
- Ảnh cần rà: 10
  - [ ] `/media/e924c99fde2bfb1a78ad.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/16036618.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/81fbf1a34da8a101d5a5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-go-vap-3.jpg
  - [ ] `/media/f348eaf5bce29b7cfb1e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-go-vap-2.jpg
  - [ ] `/media/a82ea038fb7283b02d3f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-go-vap-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc laser Phú Nhuận: chữ, logo và mã trên kim loại

- Route: `/tin-tuc/khac-laser-quan-phu-nhuan-gia-re-252.html`
- Ảnh cần rà: 10
  - [ ] `/media/7f48540d337096842b3c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/63266193.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/1c7c7da9720df5ed6a7c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-phu-nhuan-1.jpg
  - [ ] `/media/e3bbe3240a831d65f17c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-phu-nhuan-4.jpg
  - [ ] `/media/a9080ad63f7eb055ddfa.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-phu-nhuan-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận Tân Bình Lấy Liền

- Route: `/tin-tuc/khac-laser-quan-tan-binh-lay-lien-238.html`
- Ảnh cần rà: 10
  - [ ] `/media/61f86fa0dd968e7243a3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/11849232.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/0642e78ed5191757e1cc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-tan-binh-1.jpg
  - [ ] `/media/6a6bb676c736689c830d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-tan-binh-4.jpg
  - [ ] `/media/84cc6389186c5a9a918b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-tan-binh-3.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser quận Tân Phú giá rẻ

- Route: `/tin-tuc/khac-laser-quan-tan-phu-gia-re-237.html`
- Ảnh cần rà: 10
  - [ ] `/media/c7d7173ec4b842b9ccbc.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/95115800.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/ccbbe475a31e9f3aff03.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-tan-phu-1.jpg
  - [ ] `/media/c5ead9d46069d5a5c6d5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-tan-phu-3.jpg
  - [ ] `/media/c3729bed4b8750e81b43.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-quan-tan-phu-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Khắc Laser trên Kim Loại TPHCM Mọi Số Lượng

- Route: `/tin-tuc/khac-laser-tren-kim-loai-tphcm-moi-so-luong-235.html`
- Ảnh cần rà: 13
  - [ ] `/media/cc4772ba5e2ce02fc94f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/63434646.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/18ae3acb5c911f88fc60.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-22.jpg
  - [ ] `/media/b13fc97ea2076ff9af78.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-21.jpg
  - [ ] `/media/f2ee4824568a1bf4f6f9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-20.jpg
  - [ ] `/media/413cdf52ea74a8cea7f8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-10(1).jpg
  - [ ] `/media/e42ebc6c179fca27768d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-19.jpg
  - [ ] `/media/53fcba8cd3562325a86a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/khac-laser-kim-loai-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Lắp đặt thang máy gia đình quận 1 uy tín

- Route: `/tin-tuc/lap-dat-thang-may-gia-dinh-quan-1-uy-tin-219.html`
- Ảnh cần rà: 14
  - [ ] `/media/ca088d4df2b34444fa1c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/30110262.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/4443a62958af914aaa25.jpeg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh.jpeg
  - [ ] `/media/9ef38c25435add6a9795.jpeg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-1.jpeg
  - [ ] `/media/9278736538741ed9fd12.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-8.jpg
  - [ ] `/media/731d8ca7f375264c86d3.jpeg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-3.jpeg
  - [ ] `/media/bda185582325da14fd26.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-9.jpg
  - [ ] `/media/7fc8e49dfa63d8587908.jpeg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-4.jpeg
  - [ ] `/media/0fc77a3db0d2d61a949c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Lắp đặt Thang Máy Gia Đình Quận 5 An Toàn Chất Lượng

- Route: `/tin-tuc/lap-dat-thang-may-gia-dinh-quan-5-an-toan-chat-luong-223.html`
- Ảnh cần rà: 17
  - [ ] `/media/820a61d6f6710ceb6e4a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/25146139.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/266858eedc9ae7f6c430.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-1.jpg
  - [ ] `/media/0984a17e68da36419fca.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-9.jpg
  - [ ] `/media/7232f927c0966506d9da.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-2.jpg
  - [ ] `/media/8330a779602e40682396.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-8.jpg
  - [ ] `/media/3f35a8bcf8de2d583a84.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-10.jpg
  - [ ] `/media/2ffcd9a0c2f088e8d1f1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-3.jpg
  - [ ] `/media/6f0d32ef922917e2b33b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-4.jpg
  - [ ] `/media/ac58f919827489bc274f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-7.jpg
  - [ ] `/media/b1333f53e523ddce3c7f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-5.jpg
  - [ ] `/media/253941f58c0a3fff5f25.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-5-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Sắt tấm 1 ly 2 ly 3 ly 4 ly 5 ly (1mm đến 5mm) tại TPHCM

- Route: `/tin-tuc/mua-sat-tam-1-ly-2-ly-3-ly-4-ly-5-ly-1mm-den-5mm-tai-tphcm-227.html`
- Ảnh cần rà: 12
  - [ ] `/media/1d6c489406d291211453.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/68778948.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/52ae4a592de6fa1662f4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-1.jpg
  - [ ] `/media/dc7a7cd1c99239c2f841.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-2.jpg
  - [ ] `/media/c7463e212927c3c70b8e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-3.jpg
  - [ ] `/media/b8272add29cb0f888e8c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-5.jpg
  - [ ] `/media/0fbd030ed021af8c712e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Sắt tấm 6 ly 7 ly 8 ly 9 ly 10 ly (1mm đến 10mm) tại TPHCM

- Route: `/tin-tuc/mua-sat-tam-6-ly-7-ly-8-ly-9-ly-10-ly-1mm-den-10mm-tai-tphcm-228.html`
- Ảnh cần rà: 12
  - [ ] `/media/37ec93d391e1e381746d.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/80719460.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/2dc17609ab29b2b8ba84.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-6.jpg
  - [ ] `/media/0e28df1470ffae44fbd9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-7.jpg
  - [ ] `/media/b4db9b242e2509a33ed4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-10.jpg
  - [ ] `/media/2894ddadd43eea48650e.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-8.jpg
  - [ ] `/media/a5cce0011d63f5b5f8bd.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-9.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Sắt tấm 6 ly 7 ly 8 ly 9 ly 10 ly (1mm đến 10mm) tại TPHCM

- Route: `/tin-tuc/mua-sat-tam-6-ly-7-ly-8-ly-9-ly-10-ly-tai-tphcm-228.html`
- Ảnh cần rà: 12
  - [ ] `/media/37ec93d391e1e381746d.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/80719460.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/2dc17609ab29b2b8ba84.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-6.jpg
  - [ ] `/media/0e28df1470ffae44fbd9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-7.jpg
  - [ ] `/media/b4db9b242e2509a33ed4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-10.jpg
  - [ ] `/media/2894ddadd43eea48650e.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-8.jpg
  - [ ] `/media/a5cce0011d63f5b5f8bd.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/sat-tam-9.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Thép Tấm 1 ly (1 mm) và 2 ly (2mm) tại TPHCM

- Route: `/tin-tuc/mua-thep-tam-1-ly-1-mm-va-2-ly-2mm-tai-tphcm-230.html`
- Ảnh cần rà: 13
  - [ ] `/media/bb79e7c5536f1b2d6c96.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/19419751.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/67601dda56b5aae3cd12.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-1-ly.jpg
  - [ ] `/media/0a8531af0f463ee666dc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-1-ly-1.jpg
  - [ ] `/media/275ccc965dc46fed136a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-2-ly.jpg
  - [ ] `/media/b2ae24f02c6b8d5cb904.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-2-ly-1.jpg
  - [ ] `/media/fdb93be71e38fbd7312c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-2-ly-3.jpg
  - [ ] `/media/b42170379c880a4d0d8a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-2-ly-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Thép Tấm 3 ly (3 mm) và 4 ly (4mm) tại TPHCM

- Route: `/tin-tuc/mua-thep-tam-3-ly-3-mm-va-4-ly-4mm-tai-tphcm-231.html`
- Ảnh cần rà: 15
  - [ ] `/media/4d2fade90accdd90f7b6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/15824419.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/a7a65e23bc8e8e94a7c5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-3-ly.jpg
  - [ ] `/media/a6433afa24e29d64cc9d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-3-ly-1.jpg
  - [ ] `/media/8e066bcd48b96cc5477a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-4-ly.jpg
  - [ ] `/media/0cda258664f79a31c74b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-4-ly-1.jpg
  - [ ] `/media/23b3fafe609daa2f6ef3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-4-ly-5.jpg
  - [ ] `/media/dc02faf1c8d6f8180e6d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-4-ly-2.jpg
  - [ ] `/media/8c0f9896d05410451e65.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-4-ly-3.jpg
  - [ ] `/media/a74bec544aba642e0386.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-4-ly-4.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Thép tấm 5 ly đến 10 ly tại TPHCM

- Route: `/tin-tuc/mua-thep-tam-5-ly-den-10-ly-tai-tphcm-233.html`
- Ảnh cần rà: 14
  - [ ] `/media/3b08d4ee66fea96f1f83.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/27158131.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/e5980c91da4d2799fda8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-5-ly-1.jpg
  - [ ] `/media/c4e6053b283db3285a44.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-5-ly-2.jpg
  - [ ] `/media/7a75faa4fd740f8bf102.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-5-ly-3.jpg
  - [ ] `/media/b8a3d8b62e8eb8e8d6ff.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-5-ly-4.jpg
  - [ ] `/media/908ba63d87957f1fa5e0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-10-ly-1.jpg
  - [ ] `/media/7ba899cc8639c287ca7e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-10-ly-3.jpg
  - [ ] `/media/4f615eafaf718c658f8a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-10-ly-2.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Thép tấm chống trượt 2mm tại TPHCM

- Route: `/tin-tuc/mua-thep-tam-chong-truot-2mm-tai-tphcm-232.html`
- Ảnh cần rà: 14
  - [ ] `/media/35d1e1b29a2b17b43e4c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/58608435.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/1d9672506eee0bd8fc17.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-chong-truot-1.jpg
  - [ ] `/media/191a64462ddb8934504c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-chong-truot-2.jpg
  - [ ] `/media/01a959fd1c8e5376dbf3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-chong-truot-3.jpg
  - [ ] `/media/970bfdd867462a9d1bb6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-chong-truot-4.jpg
  - [ ] `/media/1d59835f0aa839a2cdfd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-chong-truot-7.jpg
  - [ ] `/media/857f98edb9c50222bfdb.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-chong-truot-5.jpg
  - [ ] `/media/00d2802924b4cc516496.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-chong-truot-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Thép Tấm đục lỗ tại TPHCM

- Route: `/tin-tuc/mua-thep-tam-duc-lo-tai-tphcm-234.html`
- Ảnh cần rà: 15
  - [ ] `/media/7b36dfdc8e629e830be6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/30771716.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/74189a9a1ce3613d6135.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo.jpg
  - [ ] `/media/21190699078d59785539.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo-1.jpg
  - [ ] `/media/6efbf0549f8947990669.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo-2.jpg
  - [ ] `/media/4b6484794114534ab998.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo-6.jpg
  - [ ] `/media/adea69390de2c6ab45b3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo-3.jpg
  - [ ] `/media/6e1dc6c364b4ec20ebd4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo-7.jpg
  - [ ] `/media/0925a0c4902742e22ce2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo-4.jpg
  - [ ] `/media/5f21f6a57cffb79b6da2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/tam-thep-dap-lo-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Mua Thép Tấm SS400 tại TPHCM Giá Rẻ

- Route: `/tin-tuc/mua-thep-tam-ss400-tai-tphcm-gia-re-229.html`
- Ảnh cần rà: 17
  - [ ] `/media/48166782861a518066d8.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/01661830.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/e817efc2be90ecc087e5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-1.jpg
  - [ ] `/media/930cc404ea5d19823ffd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-2.jpg
  - [ ] `/media/f0a02295782d3e1352a3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-3.jpg
  - [ ] `/media/e8ff7a0517aa7f86db05.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-4.jpg
  - [ ] `/media/135766ce67d0ffb65174.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-5.jpg
  - [ ] `/media/f789dcdf9257034beb7f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-10.jpg
  - [ ] `/media/993e6eec692c623dae9c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-6.jpg
  - [ ] `/media/4f1f1074c9cd47abc127.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-9.jpg
  - [ ] `/media/e3418a5a119980b76ba8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-7.jpg
  - [ ] `/media/93166d8097d975081b3c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thep-tam-ss400-8.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Nhận Cắt Laser Kim Loại Sắt Thép Inox Nhôm TPHCM | Cắt Laser Fiber giá rẻ

- Route: `/tin-tuc/nhan-cat-laser-kim-loai-sat-thep-inox-nhom-tphcm-cat-laser-fiber-gia-re-181.html`
- Ảnh cần rà: 28
  - [ ] `/media/c494847f2c8fc08a15a6.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/35338802.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/f88fbb2e9a766116a6cf.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-fiber.jpg
  - [x] `/media/e24964c3f11bd2033809.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-kim-loai-bang-may-laser-fiber.jpg
  - [ ] `/media/091b3c15de7912bf0ba6.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai.jpg
  - [x] `/media/9cb3ea1fd5e4adc1f9ae.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-1.jpg
  - [x] `/media/38b4c8763fb628e03e84.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-laser-tphcm.jpg
  - [x] `/media/9712588fc7222c11ea41.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-chi-tiet-may-4.jpg
  - [x] `/media/dc714c011cfec478da17.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chan-gap-inox.jpg
  - [x] `/media/8414135cf4f93920c224.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-bao-chan-inox.jpg
  - [x] `/media/2036e36b7d4a17a14603.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-plasma.jpg
  - [x] `/media/c27f115857ef411019ce.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-trang-tri.jpg
  - [x] `/media/aaf240ed9a9a7adef4cc.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-cong-kim-loai-tam-tp-hcm-sat-10ly.jpg
  - [x] `/media/9d17b5768eb97ec94b0c.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam.jpg
  - [ ] `/media/e20ffb056584942d97c2.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-gia-re-tphcm.jpg
  - [ ] `/media/debe082392ae100cacc0.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-la-ser-kim-loai-tphcm.jpg
  - [x] `/media/96284729f5765cf01938.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-re-tphcm.jpg
  - [ ] `/media/927fb42f50a66e071c9b.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tphcm.jpg
  - [x] `/media/b657e52895acac890965.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-thep.jpg
  - [x] `/media/af41f9cded8dc65c715a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-inox.jpg
  - [x] `/media/285babd3dfdd3f5ea636.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-1.jpg
  - [x] `/media/f9cfa2fee9bcc68e35c9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-gia-re.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Nhận Cắt Laser Kim Loại Sắt Thép Inox Nhôm TPHCM | Cắt Laser Fiber giá rẻ

- Route: `/tin-tuc/nhan-cat-laser-kim-loai-sat-thep-inox-tphcm-cat-laser-fiber-gia-re-181.html`
- Ảnh cần rà: 28
  - [ ] `/media/c494847f2c8fc08a15a6.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/35338802.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/f88fbb2e9a766116a6cf.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-fiber.jpg
  - [x] `/media/e24964c3f11bd2033809.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-kim-loai-bang-may-laser-fiber.jpg
  - [ ] `/media/091b3c15de7912bf0ba6.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai.jpg
  - [x] `/media/9cb3ea1fd5e4adc1f9ae.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-1.jpg
  - [x] `/media/38b4c8763fb628e03e84.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-laser-tphcm.jpg
  - [x] `/media/9712588fc7222c11ea41.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-chi-tiet-may-4.jpg
  - [x] `/media/dc714c011cfec478da17.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chan-gap-inox.jpg
  - [x] `/media/8414135cf4f93920c224.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-bao-chan-inox.jpg
  - [x] `/media/2036e36b7d4a17a14603.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-plasma.jpg
  - [x] `/media/c27f115857ef411019ce.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-trang-tri.jpg
  - [x] `/media/aaf240ed9a9a7adef4cc.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-cong-kim-loai-tam-tp-hcm-sat-10ly.jpg
  - [x] `/media/9d17b5768eb97ec94b0c.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam.jpg
  - [ ] `/media/e20ffb056584942d97c2.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-gia-re-tphcm.jpg
  - [ ] `/media/debe082392ae100cacc0.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-la-ser-kim-loai-tphcm.jpg
  - [x] `/media/96284729f5765cf01938.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-re-tphcm.jpg
  - [ ] `/media/927fb42f50a66e071c9b.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tphcm.jpg
  - [x] `/media/b657e52895acac890965.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-thep.jpg
  - [x] `/media/af41f9cded8dc65c715a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-inox.jpg
  - [x] `/media/285babd3dfdd3f5ea636.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-1.jpg
  - [x] `/media/f9cfa2fee9bcc68e35c9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-gia-re.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Nhận Cắt Laser Kim Loại Sắt Thép Inox Nhôm TPHCM | Cắt Laser Fiber giá rẻ

- Route: `/tin-tuc/nhan-cat-laser-kim-loai-sat-thep-nhom-tphcm-cat-laser-fiber-gia-re-181.html`
- Ảnh cần rà: 28
  - [ ] `/media/c494847f2c8fc08a15a6.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/35338802.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/f88fbb2e9a766116a6cf.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-fiber.jpg
  - [x] `/media/e24964c3f11bd2033809.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-kim-loai-bang-may-laser-fiber.jpg
  - [ ] `/media/091b3c15de7912bf0ba6.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai.jpg
  - [x] `/media/9cb3ea1fd5e4adc1f9ae.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chi-tiet-may-1.jpg
  - [x] `/media/38b4c8763fb628e03e84.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-cat-laser-tphcm.jpg
  - [x] `/media/9712588fc7222c11ea41.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-chi-tiet-may-4.jpg
  - [x] `/media/dc714c011cfec478da17.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-chan-gap-inox.jpg
  - [x] `/media/8414135cf4f93920c224.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-bao-chan-inox.jpg
  - [x] `/media/2036e36b7d4a17a14603.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-plasma.jpg
  - [x] `/media/c27f115857ef411019ce.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-hoa-van-trang-tri.jpg
  - [x] `/media/aaf240ed9a9a7adef4cc.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-cong-kim-loai-tam-tp-hcm-sat-10ly.jpg
  - [x] `/media/9d17b5768eb97ec94b0c.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tam.jpg
  - [ ] `/media/e20ffb056584942d97c2.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-gia-re-tphcm.jpg
  - [ ] `/media/debe082392ae100cacc0.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-la-ser-kim-loai-tphcm.jpg
  - [x] `/media/96284729f5765cf01938.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-gia-re-tphcm.jpg
  - [ ] `/media/927fb42f50a66e071c9b.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-tphcm.jpg
  - [x] `/media/b657e52895acac890965.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-thep.jpg
  - [x] `/media/af41f9cded8dc65c715a.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-inox.jpg
  - [x] `/media/285babd3dfdd3f5ea636.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-1.jpg
  - [x] `/media/f9cfa2fee9bcc68e35c9.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-laser-kim-loai-gia-re.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Nhận gia công cơ khí tại quận Bình Tân TPHCM | Uy tín chuyên nghiệp

- Route: `/tin-tuc/nhan-gia-cong-co-khi-tai-quan-binh-tan-tphcm-uy-tin-chuyen-nghiep-165.html`
- Ảnh cần rà: 11
  - [ ] `/media/c66db623ad083fd7d31d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/67825755.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/ef4071dc4c5c86dab9de.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/che-tao-khuon-mau-co-khi.jpg
  - [ ] `/media/78fcba59a75c3ea50bf4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-chinh-xac.jpg
  - [x] `/media/6774876211ec32a5a94c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/san-pham-gia-cong-co-khi.jpg
  - [x] `/media/6157066f624e4982f9ee.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/chi-tiet-may.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/2/`
- Ảnh cần rà: 24
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/706854551c470a9b29bb.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v43-vo-gia-do/in-3d-vo-thiet-bi-va-gia-do-theo-yeu-cau-thiet-ke-de-lap-vua.jpg
  - [—] `/media/6d76c8784a9b479d6257.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-vo-gia-do.jpg
  - [ ] `/media/5606149206d417dbd319.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v42-so-sanh/in-3d-hay-cnc-nhua-chon-phuong-an-nao-cho-chi-tiet-cua-ban.jpg
  - [—] `/media/0c3213cbfb8d8b482f80.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-so-sanh.jpg
  - [ ] `/media/ea6171df6387ab11f4b2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v42-hoan-thien/gia-cong-sau-in-3d-khoan-doa-tao-ren-va-lap-phu-kien-kim-loai.jpg
  - [—] `/media/24594876c91a6450842a.jpg` — dùng ở 6 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-hoan-thien.jpg
  - [ ] `/media/da78760a88c1e5399f14.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v42-dat-hang/dat-in-3d-chi-tiet-co-khi-can-gui-gi-huong-dan-nhan-hang-toan-quoc.jpg
  - [—] `/media/cfb1a37c4a8905e4fda9.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-dat-hang.jpg
  - [ ] `/media/176692697ad15614cf88.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/kh-in3d-v42-ung-dung/ung-dung-in-3d-nhua-trong-co-khi-nhung-chi-tiet-co-the-che-tao.jpg
  - [—] `/media/de47eb681fd0b85e2110.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-ung-dung.jpg
  - [—] `/media/8120eb47f227d3c62914.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/95698933.jpg
  - [ ] `/media/51db7e3955cfb2c6d422.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/80391050/gia-cong-co-khi-quan-tan-binh-uy-tin-chat-luong.jpg
  - [—] `/media/54674b74b2fad25f1f53.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/80391050.jpg
  - [ ] `/media/13b83490527a73d1c937.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/32946114/dich-vu-gia-cong-co-khi-quan-11-theo-yeu-cau.jpg
  - [—] `/media/2ffc3b771eefeaf80628.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/32946114.jpg
  - [—] `/media/535a2c446db5aae2fd70.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/20089292.jpg
  - [ ] `/media/c2379269ffdf7b9b0453.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/12895665/gia-cong-co-khi-quan-6-dich-vu-chuyen-nghiep-uy-tin.jpg
  - [—] `/media/e35ac31cc2de00107e83.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/12895665.jpg
  - [ ] `/media/276fece597673368b13f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/60384607/dich-vu-gia-cong-co-khi-quan-5-theo-yeu-cau.jpg
  - [—] `/media/d369a42f283b819ec95a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/60384607.jpg
  - [ ] `/media/b100d0cf3553516d6eb2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/32525771/dich-vu-gia-cong-co-khi-quan-4-chat-luong-tao-nen-uy-tin.jpg
  - [—] `/media/3adcf00b1bfccd1d4d93.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/32525771.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/3/`
- Ảnh cần rà: 26
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/7e6da7440d0b655dd626.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/85319873/dich-vu-gia-cong-co-khi-quan-3-co-khi-khoi-minh-uy-tin-chat-luong.jpg
  - [—] `/media/5a24f3d3de9ba5db9c85.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/85319873.jpg
  - [ ] `/media/6ded2a545b8a616eef9a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/23919179/gia-cong-co-khi-quan-2-doi-tac-tin-cay-cho-moi-du-an.jpg
  - [—] `/media/340f5f0146a7fd8d5c50.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/23919179.jpg
  - [ ] `/media/0478600f5ed5241a232f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/93486617/dich-vu-gia-cong-co-khi-quan-1-chat-luong-cao.jpg
  - [—] `/media/25cc2f7bed6a23147a81.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/93486617.jpg
  - [ ] `/media/7263d9bdb7f919d48517.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/67271019/dich-vu-gia-cong-co-khi-quan-phu-nhuan-chuyen-nghiep.jpg
  - [—] `/media/9ac069ffde63232cdf80.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/67271019.jpg
  - [ ] `/media/27421b8f11a9c6f4b85a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/47748129/xuong-gia-cong-co-khi-tai-nha-be-theo-yeu-cau.jpg
  - [ ] `/media/3892f0780ca146e926b9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/47748129.jpg
  - [ ] `/media/15147e5e0e228d68ba5c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/12380888/dich-vu-gia-cong-co-khi-tai-hoc-mon-theo-yeu-cau.jpg
  - [—] `/media/b80eaade1be6aca1f29f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/12380888.jpg
  - [ ] `/media/533cb14e579809ee9f19.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/80864418/xuong-gia-cong-co-khi-tai-cu-chi-uy-tin.jpg
  - [ ] `/media/635db377de21a5408413.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/80864418.jpg
  - [ ] `/media/15826c530526ec067a5e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/68091962/gia-cong-co-khi-tai-can-gio-giao-hang-tan-noi.jpg
  - [—] `/media/4a99e18aaf30b20a7134.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/68091962.jpg
  - [ ] `/media/cb1a1e790a47466682fc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/38234233/gia-cong-co-khi-tai-thu-dau-mot-uy-tin-chuyen-nghiep.jpg
  - [—] `/media/176fc1d97cc670ed13fe.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/38234233.jpg
  - [ ] `/media/6fa1030cc0910be2d4bc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/19328943/gia-cong-co-khi-tai-di-an-theo-yeu-cau.jpg
  - [—] `/media/d6dab872282d42f9eed3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/19328943.jpg
  - [ ] `/media/1ba7fb74d1aa7cd345ab.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/65310406/gia-cong-co-khi-tai-vung-tau-uy-tin-chuyen-nghiep.jpg
  - [—] `/media/5669dd1078d231acf765.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/65310406.jpg
  - [ ] `/media/3c55022aa620492c914c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/23151449/dich-vu-gia-cong-co-khi-tai-tay-ninh-theo-yeu-cau.jpg
  - [—] `/media/2ffed876f34a799fe196.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/23151449.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/4/`
- Ảnh cần rà: 26
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/e1c21cdd6d36c47da847.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/03585720/gia-cong-co-khi-tai-long-an-giao-hang-tan-noi.jpg
  - [—] `/media/aca79ae36ae65388b11f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/03585720.jpg
  - [ ] `/media/f2d615d4c99ed21a10f6.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/39296295/dich-vu-gia-cong-co-khi-tai-can-tho-giao-hang-tan-noi.jpg
  - [—] `/media/08395c1799986d4ba333.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/39296295.jpg
  - [ ] `/media/bd73fdf5a59d2a83d8dc.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/77878061/gia-cong-co-khi-tai-nhon-trach-uy-tin-chuyen-nghiep.jpg
  - [—] `/media/963553a0c36ed13c9cc1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/77878061.jpg
  - [ ] `/media/0f1121ede5b049eca1b4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/64717903/dich-vu-gia-cong-co-khi-tai-tai-long-thanh-uy-tin.jpg
  - [—] `/media/099059cac9fb5d6c4c2d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/64717903.jpg
  - [ ] `/media/18de06349a9b8a3066ae.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/91835231/gia-cong-co-khi-tai-dong-nai-khoi-minh-dan-dau-chat-luong.jpg
  - [—] `/media/7fd873987f0280c5df6a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/91835231.jpg
  - [ ] `/media/54f9d39030421e0b74bd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/63266193/khac-laser-quan-phu-nhuan-gia-re.jpg
  - [ ] `/media/7f48540d337096842b3c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/63266193.jpg
  - [ ] `/media/3083dd90bdcca437d3da.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/16036618/khac-laser-quan-go-vap-gia-re-dep.jpg
  - [ ] `/media/e924c99fde2bfb1a78ad.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/16036618.jpg
  - [ ] `/media/1dc9ef122f2a8ae3b704.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/52366637/khac-laser-quan-binh-thanh-lay-lien.jpg
  - [ ] `/media/f2e1c995db548f833a90.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/52366637.jpg
  - [ ] `/media/b39170ad8d4843e2742e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/40848773/khac-laser-binh-chanh-gia-re.jpg
  - [ ] `/media/ef4c33ffde88641f7e7c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/40848773.jpg
  - [ ] `/media/09ef771fd13b3eab198e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/27200212/khac-laser-quan-12-gia-re.jpg
  - [ ] `/media/11f039da13949b2cc6e6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/27200212.jpg
  - [ ] `/media/db99e958c96bb961be35.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/51776847/khac-laser-quan-11-lay-lien.jpg
  - [ ] `/media/e78d2d2b359a5eaed62b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/51776847.jpg
  - [ ] `/media/f8e9165b6b6536d73e9b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/81705315/dich-vu-khac-laser-quan-8-gia-re.jpg
  - [—] `/media/da067ae4e19aa5eb028d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/81705315.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/5/`
- Ảnh cần rà: 26
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/8fc99729caf4ae94dda2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/89486224/khac-laser-quan-6-gia-re-giao-tan-noi.jpg
  - [ ] `/media/e5deac3af652b8acaf7d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/89486224.jpg
  - [ ] `/media/bac95dbec95236425d9b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/69837416/khac-laser-quan-7-gia-re-uy-tin.jpg
  - [ ] `/media/3a868bf528b59419eecd.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/69837416.jpg
  - [ ] `/media/2bcb6fabd82e7889ffae.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/17359733/khac-laser-quan-5-tren-moi-chat-lieu.jpg
  - [ ] `/media/2350307d27c275c1f313.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/17359733.jpg
  - [ ] `/media/6ff3f15d8bb327632417.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/14176994/khac-laser-quan-4-gia-re-uy-tin.jpg
  - [ ] `/media/a91ed3387750d936414b.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/14176994.jpg
  - [ ] `/media/59a4273571c45b08fe57.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/58555133/khac-laser-quan-1-gia-re-khac-nhanh.jpg
  - [ ] `/media/984d957b1e56722b85c4.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/58555133.jpg
  - [ ] `/media/77fa22da63e51cc616fd.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/11114582/khac-laser-quan-3-gia-re-dep.jpg
  - [ ] `/media/cdfaef54716e7de42325.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/11114582.jpg
  - [ ] `/media/85a3ce7c852e07aeb1f4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/39946199/khac-laser-quan-10-gia-re-uy-tin.jpg
  - [ ] `/media/afeedfec6996800e4fde.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/39946199.jpg
  - [ ] `/media/e5dc00bac48e189965d1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/11849232/khac-laser-quan-tan-binh-lay-lien.jpg
  - [ ] `/media/61f86fa0dd968e7243a3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/11849232.jpg
  - [ ] `/media/bb7ad560fda6f718d44c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/95115800/khac-laser-quan-tan-phu-gia-re.jpg
  - [ ] `/media/c7d7173ec4b842b9ccbc.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/95115800.jpg
  - [ ] `/media/52c25dd3a2efc2f62f66.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/08610314/khac-laser-quan-binh-tan-moi-so-luong.jpg
  - [ ] `/media/dcc9148ac5f354660f39.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/08610314.jpg
  - [ ] `/media/dd2774513d71c2323a83.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/63434646/khac-laser-tren-kim-loai-tphcm-moi-so-luong.jpg
  - [ ] `/media/cc4772ba5e2ce02fc94f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/63434646.jpg
  - [ ] `/media/ee4f16c47159bdaa871d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/30771716/mua-thep-tam-duc-lo-tai-tphcm.jpg
  - [ ] `/media/7b36dfdc8e629e830be6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/30771716.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/6/`
- Ảnh cần rà: 26
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/af195559b7b6cce63173.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/27158131/mua-thep-tam-5-ly-den-10-ly-tai-tphcm.jpg
  - [ ] `/media/3b08d4ee66fea96f1f83.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/27158131.jpg
  - [ ] `/media/f95193ae9739e7ab157d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/58608435/mua-thep-tam-chong-truot-2mm-tai-tphcm.jpg
  - [ ] `/media/35d1e1b29a2b17b43e4c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/58608435.jpg
  - [ ] `/media/3992eea60dcf2e64d937.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/15824419/mua-thep-tam-3-ly-3-mm-va-4-ly-4mm-tai-tphcm.jpg
  - [ ] `/media/4d2fade90accdd90f7b6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/15824419.jpg
  - [ ] `/media/9965c67d2c12430f5f37.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/19419751/mua-thep-tam-1-ly-1-mm-va-2-ly-2mm-tai-tphcm.jpg
  - [ ] `/media/bb79e7c5536f1b2d6c96.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/19419751.jpg
  - [ ] `/media/3b74b8a3cb0f8d8ef454.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/01661830/mua-thep-tam-ss400-tai-tphcm-gia-re.jpg
  - [ ] `/media/48166782861a518066d8.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/01661830.jpg
  - [ ] `/media/c3eeae6b2152f3505e8c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/80719460/mua-sat-tam-6-ly-7-ly-8-ly-9-ly-10-ly-1mm-den-10mm-tai-tphcm.jpg
  - [ ] `/media/37ec93d391e1e381746d.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/80719460.jpg
  - [ ] `/media/1d8c93845011757a08af.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/68778948/mua-sat-tam-1-ly-2-ly-3-ly-4-ly-5-ly-1mm-den-5mm-tai-tphcm.jpg
  - [ ] `/media/1d6c489406d291211453.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/68778948.jpg
  - [ ] `/media/b9cec38bdc896519686a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/20327224/thi-cong-thang-may-gia-dinh-quan-8-uy-tin.jpg
  - [ ] `/media/c40f2b24f4dc09251ac3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/20327224.jpg
  - [ ] `/media/c804fa5ec57e87710c80.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/65395307/tu-van-lap-dat-thang-may-gia-dinh-quan-7-gia-re.jpg
  - [ ] `/media/13cc227be0b82e28031f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/65395307.jpg
  - [ ] `/media/0b3fbf62bd151ca77e55.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/90954953/thi-cong-lap-dat-thang-may-gia-dinh-quan-6.jpg
  - [ ] `/media/14cab6e0fe51d04a7373.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/90954953.jpg
  - [ ] `/media/46838be6f1e1158ccad8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/25146139/lap-dat-thang-may-gia-dinh-quan-5-an-toan-chat-luong.jpg
  - [ ] `/media/820a61d6f6710ceb6e4a.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/25146139.jpg
  - [ ] `/media/8717f343d5f97e8f5e4b.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/67210725/thi-cong-thang-may-gia-dinh-quan-4-gia-re.jpg
  - [ ] `/media/914651473e0c3609e54f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/67210725.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/7/`
- Ảnh cần rà: 26
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/73385c841eb10fa3d8a8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/90600031/thiet-ke-thi-cong-thang-may-gia-dinh-quan-3.jpg
  - [ ] `/media/08b4670394dd72743c81.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/90600031.jpg
  - [ ] `/media/040f74c912a80ad7f6b1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/28175722/thi-cong-thang-may-gia-dinh-quan-2-gia-re.jpg
  - [ ] `/media/ff8b38e0f07a32388711.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/28175722.jpg
  - [ ] `/media/4730cec0ce6031e98c81.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/30110262/lap-dat-thang-may-gia-dinh-quan-1-uy-tin.jpg
  - [ ] `/media/ca088d4df2b34444fa1c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/30110262.jpg
  - [ ] `/media/1c6e5815b7339ec90946.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/54621017/gia-cong-cat-thep-tam-theo-yeu-cau-tphcm.jpg
  - [x] `/media/421992b47bce74a3de09.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/54621017.jpg
  - [ ] `/media/16c3c9c6d64a3cb49a3a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/10587743/gia-cong-cua-cong-sat-cat-cnc-tai-tphcm-mau-cong-sat-cnc.jpg
  - [x] `/media/cf6711aaa9092f5e3c20.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/10587743.jpg
  - [ ] `/media/2f049d5006fa4fa95c05.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/33458472/gia-cong-chan-dap-thep-tam-tphcm-cat-dap-chan-uon.jpg
  - [x] `/media/e99ca40a78f78679bd79.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/33458472.jpg
  - [ ] `/media/a39ee440693a04db74c2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/46989785/xuong-gia-cong-cat-thep-tam-tphcm-cat-chan-dap-thep-tam.jpg
  - [ ] `/media/b6c9f5ebf39fc89e83e6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/46989785.jpg
  - [ ] `/media/fffca3a9e07788236ba1.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/16608075/dong-ho-treo-tuong-trang-tri-phong-khach-gia-xuong-ship-toan-quoc.jpg
  - [—] `/media/e8a16b95bed931f4e0fd.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/16608075.jpg
  - [ ] `/media/36ece80e8ef6951aa5b4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/13195708/gia-cong-inox-theo-yeu-cau-tphcm-xuong-gia-cong-inox-gia-re.jpg
  - [ ] `/media/66cc223419890acda822.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/13195708.jpg
  - [ ] `/media/7d03d0bf41cbf620a81a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/21057247/gia-cong-co-khi-go-vap-gia-cong-co-khi-theo-yeu-cau.jpg
  - [x] `/media/0285a9cb866c70d16bc9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/21057247.jpg
  - [ ] `/media/ac44f523f9d7f2073937.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/22608188/gia-cong-cat-laser-kim-loai-tam-tphcm-cat-cnc-kim-loai-gia-re.jpg
  - [x] `/media/07dc4d94a5c30a3817a6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/22608188.jpg
  - [ ] `/media/eebd29e38ec415685836.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/77390565/cat-laser-kim-loai-quan-binh-tan-gia-cong-cat-sat-inox-thep-tam.jpg
  - [x] `/media/0c9a317c947ffae226f0.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/77390565.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/8/`
- Ảnh cần rà: 26
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/25342349f6391b3ae17f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/81205835/cat-cnc-kim-loai-va-cat-cnc-sat-thep-tam-tai-tphcm.jpg
  - [x] `/media/7edbb0e70fee2c0b7c3f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/81205835.jpg
  - [ ] `/media/6473c20966f02f8710a5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/62776837/cat-hoa-van-sat-cnc-tphcm-mau-cua-sat-cong-sat-cnc.jpg
  - [x] `/media/35fa08ef4bbffa979e10.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/62776837.jpg
  - [ ] `/media/fe91e5cbbdb36c487429.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/44311223/cat-laser-kim-loai-thu-duc-cat-laser-sat-thep-inox-gia-re.jpg
  - [x] `/media/a04eab3573aa39f7d28c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/44311223.jpg
  - [ ] `/media/966ff5109cea6a61140c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/43261773/dich-vu-gia-cong-co-khi-tai-bien-hoa-theo-yeu-cau.jpg
  - [x] `/media/745b0fbd95d0ac280c21.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/43261773.jpg
  - [ ] `/media/e24789c8626e7892d14e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/35338802/nhan-cat-laser-kim-loai-sat-thep-inox-nhom-tphcm-cat-laser-fiber-gia-re.jpg
  - [ ] `/media/c494847f2c8fc08a15a6.jpg` — dùng ở 4 trang — nguồn: https://cokhitonghop.vn/upload/news/35338802.jpg
  - [ ] `/media/f1c600572fd0ddf6d719.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/91219653/gia-cong-tien-phay-cnc-chinh-xac-theo-yeu-cau-tphcm.jpg
  - [ ] `/media/39fd7158a73cbac2dbe4.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/news/91219653.jpg
  - [ ] `/media/b5fa9143fca664f43d85.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/46938674/cong-ty-gia-cong-co-khi-chinh-xac-tai-binh-duong.jpg
  - [x] `/media/52199ffe7af5ff4fd047.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/46938674.jpg
  - [ ] `/media/90caa185f34825c26bd2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/89125172/sua-cua-cuon-tai-tphcm-gia-re-uy-tin-bao-hanh-lau-dai-sua-nhanh.jpg
  - [ ] `/media/806e8e5b994c9addb2b6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/89125172.jpg
  - [ ] `/media/b06dcba33e7f1006db37.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/47049848/gia-cong-co-khi-tai-quan-10-tphcm-co-khi-chinh-xac-gia-re.jpg
  - [x] `/media/6c6a9f7f6cb050916939.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/47049848.jpg
  - [ ] `/media/96391213a6ba10feef47.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/24734264/gia-cong-co-khi-tai-quan-tan-phu-tphcm-gia-cong-co-khi-chinh-xac-gia-re.jpg
  - [x] `/media/65433e293041e47a31ea.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/24734264.jpg
  - [ ] `/media/8db31d0c98b45219892d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/76591117/gia-cong-co-khi-chinh-xac-quan-binh-thanh-tphcm-uy-tin-chat-luong.jpg
  - [x] `/media/8aa33d11294e80797de1.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/76591117.jpg
  - [ ] `/media/fb3f4e43792681b3f490.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/68808210/gia-cong-co-khi-chinh-xac-tai-binh-chanh-tphcm-gia-tot-uy-tin.jpg
  - [x] `/media/ca7e5fc0a3c490b2a0a5.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/68808210.jpg

### [ ] Tin tức & kiến thức cơ khí. Hiểu rõ trước khi gia công.

- Route: `/tin-tuc/page/9/`
- Ảnh cần rà: 14
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/bc3e6146136d09d8fabb.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/87230282/gia-cong-co-khi-tai-quan-7-tphcm-gia-cong-chinh-xac-theo-yeu-cau.jpg
  - [x] `/media/08eba1720a856ea6639c.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/87230282.jpg
  - [ ] `/media/db272b201f9a8f363be9.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/49484893/cong-ty-gia-cong-co-khi-quan-9-tphcm-gia-cong-co-khi-chinh-xac.jpg
  - [x] `/media/54d9490f2333b740a397.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/49484893.jpg
  - [ ] `/media/1afc48e520229bfcae12.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/33116534/gia-cong-co-khi-tai-thu-duc-co-khi-chinh-xac-tphcm.jpg
  - [x] `/media/079eb95b4139809abdf8.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/33116534.jpg
  - [ ] `/media/73478e284f7ad69962ab.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/18825378/xuong-gia-cong-co-khi-quan-12-tphcm-gia-cong-co-khi-chinh-xac.jpg
  - [x] `/media/09954731739ff4badde3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/18825378.jpg
  - [ ] `/media/e34f3d21cf963c68d541.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/67825755/nhan-gia-cong-co-khi-tai-quan-binh-tan-tphcm-uy-tin-chuyen-nghiep.jpg
  - [ ] `/media/c66db623ad083fd7d31d.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/67825755.jpg
  - [ ] `/media/8923977646b56a81fa4a.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/thumb/800x600/2/upload/news/06671123/gia-cong-co-khi-chinh-xac-theo-yeu-cau-tai-tphcm-gia-re-chat-luong.jpg
  - [x] `/media/4fe696e6506b3793dcb0.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/06671123.jpg

### [ ] Sửa cửa cuốn tại TPHCM | Giá rẻ Uy Tín | Bảo hành lâu dài | Sửa nhanh

- Route: `/tin-tuc/sua-cua-cuon-tai-tphcm-gia-re-uy-tin-bao-hanh-lau-dai-sua-nhanh-178.html`
- Ảnh cần rà: 10
  - [ ] `/media/806e8e5b994c9addb2b6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/89125172.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/1e10aa4ee4e78710e024.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sua-cua-cuon-tphcm.jpg
  - [ ] `/media/43c44812300c9e3cac63.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/sua-cua-cuon-uy-tin-nhanh-chong.jpg
  - [ ] `/media/36af736091514fd8c464.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/phu-kien-cua-cuon_02.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Thi công lắp đặt Thang Máy Gia Đình Quận 6

- Route: `/tin-tuc/thi-cong-lap-dat-thang-may-gia-dinh-quan-6-224.html`
- Ảnh cần rà: 16
  - [ ] `/media/14cab6e0fe51d04a7373.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/90954953.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/278167e90acd4a58aa99.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-8.jpg
  - [ ] `/media/d1ac2d3beb9ba4a9c878.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-7.jpg
  - [ ] `/media/fd706b6b844b33d5a1b5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-1.jpg
  - [ ] `/media/f07880f9a525571a2be2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-6.jpg
  - [ ] `/media/1961b7371b7f6a741b23.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-2.jpg
  - [ ] `/media/7a5c0b49e1b94927dfc7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-9.jpg
  - [ ] `/media/f92b14ebe3c5cccc9515.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-3.jpg
  - [ ] `/media/4571ce8187188d439b0c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-4.jpg
  - [ ] `/media/7c08d3e95a3ffb8b2596.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-6-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Thi công Thang Máy Gia Đình Quận 2 Giá Rẻ

- Route: `/tin-tuc/thi-cong-thang-may-gia-dinh-quan-2-gia-re-220.html`
- Ảnh cần rà: 17
  - [ ] `/media/ff8b38e0f07a32388711.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/28175722.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/1117913b12b330616f3d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-6.jpg
  - [ ] `/media/c264bbdb09405ff4333d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-1.jpg
  - [ ] `/media/ed177fcdac06893a1971.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-5.jpg
  - [ ] `/media/5f0a11397e778b56e1b8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-7.jpg
  - [ ] `/media/f4158c29401099b68a3d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-10.jpg
  - [ ] `/media/b3dfbf8815732ebad815.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-2.jpg
  - [ ] `/media/641bbdee75eddd1dba3e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-4.jpg
  - [ ] `/media/b9232824590cec54381f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-8.jpg
  - [ ] `/media/8e741fc431960c43041c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-3.jpg
  - [ ] `/media/199041b5de3a07d33f5f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-2-9.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Thi Công Thang Máy Gia Đình Quận 4 Giá Rẻ

- Route: `/tin-tuc/thi-cong-thang-may-gia-dinh-quan-4-gia-re-222.html`
- Ảnh cần rà: 16
  - [ ] `/media/914651473e0c3609e54f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/67210725.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/3fa985f26e4501c4f461.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-8.jpg
  - [ ] `/media/729b3d0baf62267b6b6d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-2.jpg
  - [ ] `/media/80e6bdffc719c0e2b6bf.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-7.jpg
  - [ ] `/media/e11f2232b65a088c8865.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-3.jpg
  - [ ] `/media/c0eda117a63f6a7d17ba.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-4.jpg
  - [ ] `/media/be4764404f3f7f258c57.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-9.jpg
  - [ ] `/media/3e63b58ab1c0484bb566.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-6.jpg
  - [ ] `/media/699a76a74d53a8f618f4.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-10.jpg
  - [ ] `/media/427e2e2cf38eaf9eb20f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-4-5.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Thi Công Thang Máy Gia Đình Quận 8 Uy Tín

- Route: `/tin-tuc/thi-cong-thang-may-gia-dinh-quan-8-uy-tin-226.html`
- Ảnh cần rà: 17
  - [ ] `/media/c40f2b24f4dc09251ac3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/20327224.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/988deac6c610e3c2379d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-1.jpg
  - [ ] `/media/620a67ed05c0c73b6170.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-2.jpg
  - [ ] `/media/579038423b759197f621.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-10.jpg
  - [ ] `/media/6b6a9f93bffabf8b45e3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-3.jpg
  - [ ] `/media/5c3865b8720ba4a66d54.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-4.jpg
  - [ ] `/media/63c9759227d94afa959e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-9.jpg
  - [ ] `/media/32606a22110a7193a295.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-5.jpg
  - [ ] `/media/cdd9300ba0ed4ac99558.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-7.jpg
  - [ ] `/media/7a9f8cceceb25b12acf2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-8.jpg
  - [ ] `/media/c9ac6a3445cf6acb8648.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-8-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Thiết kế Thi Công Thang Máy Gia Đình Quận 3

- Route: `/tin-tuc/thiet-ke-thi-cong-thang-may-gia-dinh-quan-3-221.html`
- Ảnh cần rà: 16
  - [ ] `/media/08b4670394dd72743c81.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/90600031.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/66950c4b363ac94ef027.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-20.jpg
  - [ ] `/media/cd1cd7a37ca62b117762.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-11.jpg
  - [ ] `/media/5cce4b6351c998067cc8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-12.jpg
  - [ ] `/media/fcf2047e217df06dc84e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-18.jpg
  - [ ] `/media/43cc153c5f8052edcfea.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-13.jpg
  - [ ] `/media/210e06991445d6199af3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-16.jpg
  - [ ] `/media/543b4679ea017386cee5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-14.jpg
  - [ ] `/media/60c53f39575095bebb0c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-17.jpg
  - [ ] `/media/b30a11228cec2b501db2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-15.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Tư vấn lắp đặt Thang Máy Gia Đình Quận 7 Giá Rẻ

- Route: `/tin-tuc/tu-van-lap-dat-thang-may-gia-dinh-quan-7-gia-re-225.html`
- Ảnh cần rà: 17
  - [ ] `/media/13cc227be0b82e28031f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/65395307.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/3ccfbf4e5580d44fe474.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-1.jpg
  - [ ] `/media/dbaeb308803e8ce4a54e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-2.jpg
  - [ ] `/media/0a61f7875c5323b4b8a7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-3.jpg
  - [ ] `/media/e37dec658eff8c6f10e5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-4.jpg
  - [ ] `/media/c93f61369acdfe5308b8.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-10.jpg
  - [ ] `/media/4352332bb7783b7d83b0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-5.jpg
  - [ ] `/media/7a162d092dc32db6dd54.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-9.jpg
  - [ ] `/media/b997a33dfeec449cff93.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-6.jpg
  - [ ] `/media/83b789bdc879d10d9525.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-8.jpg
  - [ ] `/media/65d12c047c341ffa2181.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/thang-may-gia-dinh-quan-7-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Ứng dụng in 3D nhựa trong cơ khí: những chi tiết có thể chế tạo

- Route: `/tin-tuc/ung-dung-in-3d-nhua-trong-co-khi-nhung-chi-tiet-co-the-che-tao-281.html`
- Ảnh cần rà: 11
  - [—] `/media/de47eb681fd0b85e2110.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v42-ung-dung.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg
  - [—] `/media/92e4bbf15c4d2855f28f.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh.jpg
  - [—] `/media/ad379e57dbad991083d4.jpg` — dùng ở 10 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v44-mau-thu.jpg
  - [—] `/media/a75ba14e16d31cb66565.jpg` — dùng ở 8 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-banh-rang.jpg
  - [—] `/media/d2ff906d2f0521f92cfb.jpg` — dùng ở 7 trang — nguồn: https://cokhitonghop.vn/upload/news/kh-in3d-v43-do-ga.jpg

### [ ] Xưởng gia công cắt Thép Tấm TPHCM | Cắt Chấn Dập Thép Tấm

- Route: `/tin-tuc/xuong-gia-cong-cat-thep-tam-tphcm-cat-chan-dap-thep-tam-215.html`
- Ảnh cần rà: 16
  - [ ] `/media/b6c9f5ebf39fc89e83e6.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/46989785.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/c9d7b61daf91ea9f57a4.jpg` — dùng ở 12 trang — nguồn: https://cokhitonghop.vn/upload/images/banner-cat-laser-kim-loai-goc.jpg
  - [x] `/media/01173f717f55732537f7.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-3.jpg
  - [ ] `/media/8ef397c546965f6129ea.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/chan-thep-tam.jpg
  - [ ] `/media/d89ddd34700f7cbaf4f2.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-chan-thep-tam.jpg
  - [ ] `/media/d95893ac6f861abcda43.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-chan-thep-tam-2.jpg
  - [ ] `/media/589bb9d363aecf200101.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam.jpg
  - [ ] `/media/ef7e05afe4becadbf6a5.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-chan-thep-tam-1.jpg
  - [ ] `/media/4ce199c028e1bf1bbb00.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-1.jpg
  - [x] `/media/911ee357bb1fe471218f.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/cat-thep-tam-2.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Xưởng gia công cơ khí quận 12 TPHCM | Gia công cơ khí chính xác

- Route: `/tin-tuc/xuong-gia-cong-co-khi-quan-12-tphcm-gia-cong-co-khi-chinh-xac-168.html`
- Ảnh cần rà: 11
  - [x] `/media/09954731739ff4badde3.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/18825378.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/ba90ffde7b1079215d46.jpg` — dùng ở 5 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-tien-cnc-1.jpg
  - [x] `/media/e414b95a5f27f8cdfb2b.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi.jpg
  - [x] `/media/cacf73f58ca8294b55cf.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-dan-dung.jpg
  - [ ] `/media/c3317ac8690cb1415469.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/may-chan.JPG
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Xưởng Gia Công Cơ Khí Tại Củ Chi Uy Tín

- Route: `/tin-tuc/xuong-gia-cong-co-khi-tai-cu-chi-uy-tin-263.html`
- Ảnh cần rà: 14
  - [ ] `/media/635db377de21a5408413.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/80864418.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/781a50f51859979c2be3.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tao-cu-chi-1.jpg
  - [ ] `/media/dddc57ee00b6342d1c6f.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tao-cu-chi-2.jpg
  - [ ] `/media/81caf841e01f54160f47.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tao-cu-chi-3.jpg
  - [ ] `/media/55fd34c2372311a6ed79.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tao-cu-chi-4.jpg
  - [ ] `/media/5252636cadadd07e3e6c.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tao-cu-chi-6.jpg
  - [ ] `/media/e2ccf201a869041300b0.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tao-cu-chi-5.jpg
  - [ ] `/media/75606b5e03832bd13104.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-tao-cu-chi-7.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [ ] Xưởng Gia Công Cơ Khí tại Nhà Bè theo yêu cầu

- Route: `/tin-tuc/xuong-gia-cong-co-khi-tai-nha-be-theo-yeu-cau-265.html`
- Ảnh cần rà: 14
  - [ ] `/media/3892f0780ca146e926b9.jpg` — dùng ở 2 trang — nguồn: https://cokhitonghop.vn/upload/news/47748129.jpg
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [ ] `/media/ec7656e7ac1282de3689.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nha-be-1.jpg
  - [ ] `/media/7f0ce28ee0f6ce20ca3d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nha-be-2.jpg
  - [ ] `/media/202b4d5cdc21f8938c3d.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nha-be-3.jpg
  - [ ] `/media/b046215b75bf43b62132.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nha-be-7.jpg
  - [ ] `/media/52a1a9b2acc1e4ac536e.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nha-be-4.jpg
  - [ ] `/media/70e5932624b8de6c8c78.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nha-be-5.jpg
  - [ ] `/media/bcc3af36420c8b7f2604.jpg` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/images/gia-cong-co-khi-nha-be-6.jpg
  - [—] `/media/45058944ee2993cf9058.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/in-3d-chi-tiet-nhua-dang-tay-van-theo-lo-khoi-minh/don-hang-in-3d-chi-tiet-nhua-dang-tay-van-tai-khoi-minh.jpg
  - [—] `/media/07c870fbc0dae2ea03c8.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-thu/in-3d-mau-thu-co-khi-kiem-tra-hinh-dang-lap-ghep-va-thiet-ke.jpg
  - [—] `/media/803f311f1a77e0f248bc.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-mau-cu/in-3d-chi-tiet-nhua-theo-mau-cu-can-do-va-xac-nhan-nhung-gi.jpg
  - [—] `/media/ce2ccd1071cc894585a5.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-banh-rang-cnc/banh-rang-nhua-in-3d-hay-cnc-so-sanh-de-chon-dung-phuong-an.jpg
  - [—] `/media/479c8c7f98718b8058d9.jpg` — dùng ở 105 trang — nguồn: https://cokhitonghop.vn/thumb/640x400/2/upload/news/kh-in3d-v44-ga-khoan/do-ga-khoan-in-3d-ket-hop-bac-kim-loai-nhung-diem-can-tinh-truoc.jpg

### [x] Tuyển dụng Khởi Minh. Cùng làm nghề cơ khí.

- Route: `/tuyen-dung.html`
- Ảnh cần rà: 2
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [ ] CÔNG TY TNHH CƠ KHÍ KHỞI MINH TUYỂN DỤNG

- Route: `/tuyen-dung/cong-ty-tnhh-co-khi-khoi-minh-tuyen-dung-277.html`
- Ảnh cần rà: 2
  - [ ] `/media/6f1636a95e6d0b966dac.png` — dùng ở 1 trang — nguồn: https://cokhitonghop.vn/upload/news/35058580.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png

### [x] Vít Tải - Băng Tải Inox

- Route: `/vit-tai-bang-tai-inox-118/`
- Ảnh cần rà: 3
  - [x] `/media/edfcb9597003e3fdd4b7.png` — dùng ở 30 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/774.png
  - [x] `/media/f6b5bf15d8acf9f7a1ba.png` — dùng ở 168 trang — nguồn: https://cokhitonghop.vn/upload/hinhanh/23041154.png
  - [x] `/media/ded3086a5d64f869b7b0.jpg` — dùng ở 3 trang — nguồn: https://cokhitonghop.vn/upload/product/962172609300.jpg

