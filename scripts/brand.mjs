import * as cheerio from 'cheerio';

export const intro='Cơ Khí Vạn Kim — Hộ Kinh Doanh Vạn Kim — tiếp nhận yêu cầu sản xuất, gia công tiện, phay và các hạng mục cơ khí theo bản vẽ hoặc mẫu. Chúng tôi trao đổi cụ thể về vật liệu, kích thước, số lượng và tiến độ để thống nhất phương án phù hợp trước khi thực hiện. Phục vụ khách hàng cá nhân và doanh nghiệp tại TP.HCM; nhu cầu giao nhận ở khu vực khác được trao đổi theo từng đơn hàng.';
// Original imported photos remain untouched in /media.  This map makes every
// published instance use its approved Vạn Kim-branded replacement instead.
const imageReplacements={
 '/media/6c6a9f7f6cb050916939.jpg':'/brand-media/precision-parts-collage-watermark-vankim.png',
 '/media/411998d8b4f9de858d04.jpg':'/brand-media/precision-parts-collage-watermark-vankim.png',
 '/media/cacf73f58ca8294b55cf.jpg':'/brand-media/stainless-tank-watermark-vankim.png',
 '/media/ef4071dc4c5c86dab9de.jpg':'/brand-media/precision-cylinders-watermark-vankim.png',
 '/media/a2b25b93cb4cd9d25fcc.jpg':'/brand-media/machined-brackets-rail-vankim.png',
 '/media/dc94a49ad479e46a148e.jpg':'/brand-media/ornamental-screen-workshop-vankim.png',
 '/media/33a4b46521ee8f922086.jpg':'/brand-media/stainless-trays-rails-vankim.png',
 '/media/7227092ce6eaaa77e5f0.jpg':'/brand-media/flanged-spools-vankim.png',
 '/media/ed38f4d7073b9115ac37.jpg':'/brand-media/stainless-panels-workshop-vankim.png',
 '/media/18bf10687f26639196d3.jpg':'/brand-media/stainless-boxes-cutouts-vankim.png',
 '/media/e46825f8b74182851503.jpg':'/brand-media/formed-cones-rings-vankim.png',
 '/media/85a0ccb65a8a41a63a8b.jpg':'/brand-media/stainless-cabinets-cones-vankim.png',
 '/media/4f0229991e63e2e861ec.jpg':'/brand-media/cnc-cutting-display-vankim.png',
 '/media/f33ae0ce92c1176c2a95.jpg':'/brand-media/wrapped-white-enclosures-vankim.png',
 '/media/3f8c57cc52b12b2a5f85.jpg':'/brand-media/stainless-cabinet-press-brake-vankim.png',
 '/media/c99b3ed6dc9bd4c11d84.jpg':'/brand-media/perforated-stainless-enclosures-vankim.png',
 '/media/45c81080f0d11399bf94.jpg':'/brand-media/laser-bed-metal-brackets-vankim.png',
 '/media/249b804599ee9ac6bc62.jpg':'/brand-media/stacked-bent-metal-parts-vankim.png',
 '/media/882b7b23a4d9a094e8e5.jpg':'/brand-media/stacked-white-metal-cabinets-vankim.png',
 '/media/3f58af78182e4ecd7d09.jpg':'/brand-media/stainless-enclosure-press-brake-vankim.png',
 '/media/609aa59dc9cc851647de.jpg':'/brand-media/precision-machined-parts-collage-vankim.png',
 '/media/79579bb5b708257bb0bf.jpg':'/brand-media/ornamental-laser-railing-vankim.png',
 '/media/e446673d6c599f4a91cf.jpg':'/brand-media/ornate-gate-workshop-vankim.png',
 '/media/a2c585436a350d6d59d1.jpg':'/brand-media/decorative-panel-workshop-vankim.png',
 '/media/ceeaae879816a259c9f6.jpg':'/brand-media/decorative-screen-vankim.png',
 '/media/f7e15f9e60c756883a6f.jpg':'/brand-media/machined-covers-vankim.png',
 '/media/5e2f88769eb7d1a7c9a4.jpg':'/brand-media/stacked-metal-parts-vankim.png',
 '/media/421992b47bce74a3de09.jpg':'/brand-media/laser-sparks-vankim.png',
 '/media/f7ae1c8505e97e42901e.jpg':'/brand-media/stacked-metal-boxes-vankim.png',
 '/media/9ea59647ed571245ab7e.jpg':'/brand-media/laser-cutting-bed-vankim.png',
 '/media/5e5a248fa093f3747849.jpg':'/brand-media/laser-sparks-vankim.png',
 '/media/8f16fe359d481a268fc1.jpg':'/brand-media/steel-plate-workshop-vankim.png',
 '/media/a918b716da99f9b0de06.jpg':'/brand-media/laser-cut-parts-stack-vankim.png',
 '/media/4314082e0eb7b3f4038f.jpg':'/brand-media/sheet-metal-stack-vankim.png',
 '/media/38303a959bee96135059.jpg':'/brand-media/aluminum-sheet-stack-vankim.png',
 '/media/b3a45888d6475e5c7e93.jpg':'/brand-media/stacked-cut-bars-vankim.png',
 '/media/56c4ec0c1b03c5b3d831.jpg':'/brand-media/sheet-metal-cart-vankim.png',
 '/media/0dce082da60e19e4d32a.jpg':'/brand-media/laser-cutting-machine-vankim.png',
 '/media/8a83df3fbdf1d968d1b7.jpg':'/brand-media/laser-cnc-bed-vankim.png',
 '/media/62e3e46d2ac4096126d9.jpg':'/brand-media/decorative-cut-panels-vankim.png',
 '/media/e99ca40a78f78679bd79.jpg':'/brand-media/stainless-bent-enclosures-vankim.png',
 '/media/91fb4125d34ffc08a931.jpg':'/brand-media/sheet-metal-stacks-vankim.png',
 '/media/b456f9c134e6c1733a88.jpg':'/brand-media/fabricated-sheet-parts-vankim.png',
 '/media/3e42cfeaaa39b79ca3ad.jpg':'/brand-media/sheet-metal-collage-vankim.png',
 '/media/988f7b97f47950154a74.jpg':'/brand-media/formed-metal-profiles-vankim.png',
 '/media/147f1c9ab2a233152765.jpg':'/brand-media/bent-metal-boxes-vankim.png',
 '/media/cfd1a772ec42713c301b.jpg':'/brand-media/bent-metal-brackets-vankim.png',
 '/media/e4e45af1e951eb56fb34.jpg':'/brand-media/raw-sheet-stock-vankim.png',
 '/media/f7045ce44316d28577fe.jpg':'/brand-media/stainless-bent-enclosures-vankim.png',
 '/media/b50ebbc2fa817e8b7cb0.jpg':'/brand-media/formed-channel-detail-vankim.png',
 '/media/d8f0a82f6a72ae9b04c0.jpg':'/brand-media/sheet-stack-workshop-vankim.png',
 '/media/c6bfcbf0eaabcca1a565.jpg':'/brand-media/sheet-fabrication-collage-vankim.png',
 '/media/4f73ff450b04f1614db9.jpg':'/brand-media/bent-panel-stack-vankim.png',
 '/media/0e1385e23e18d0b886cc.jpg':'/brand-media/bent-angle-stack-vankim.png',
 '/media/911ee357bb1fe471218f.jpg':'/brand-media/steel-plate-stacks-vankim.png',
 '/media/8aa33d11294e80797de1.jpg':'/brand-media/precision-machined-assembly-vankim.png',
 '/media/6774876211ec32a5a94c.jpg':'/brand-media/machined-ball-joint-vankim.png',
 '/media/4ec7d43d7367d35e28f6.jpg':'/brand-media/machined-gears-vankim.png',
 '/media/ca7e5fc0a3c490b2a0a5.jpg':'/brand-media/machined-bushings-set-vankim.png',
 '/media/f46c9aa9c03b72204fb1.jpg':'/brand-media/precision-machined-assembly-vankim.png',
 '/media/35457470316426411733.jpg':'/brand-media/machined-bushings-set-vankim.png',
 '/media/0acb1b7bda1c1bc532ca.jpg':'/brand-media/machined-fixture-vankim.png',
 '/media/4fe696e6506b3793dcb0.jpg':'/brand-media/gear-transmission-collage-vankim.png',
 '/media/fc305d8e37b563d086d7.jpg':'/brand-media/machining-workshop-banner-vankim.png',
 '/media/471d63603ac9f91d0461.jpg':'/brand-media/fabricated-frame-vankim.png',
 '/media/e27816a9d49aca2104cf.jpg':'/brand-media/precision-flanges-vankim.png',
 '/media/66a59d67051dc26fdefa.jpg':'/brand-media/machined-bushings-vankim.png',
 '/media/886b69e9d787e1f2b86b.jpg':'/brand-media/precision-components-collage-vankim.png',
 '/media/f186a33fd4151a6027cb.jpg':'/brand-media/precision-bushings-vankim.png',
 '/media/7533735140ab234e2c22.jpg':'/brand-media/precision-parts-collage-vankim.png',
 '/media/d506a6b8f1289184dc3f.jpg':'/brand-media/formed-metal-cabinets-vankim.png',
 '/media/f94175458edd975fbed2.jpg':'/brand-media/precision-machined-parts-vankim.png',
 '/media/7e3e766e15e9cf65f700.jpg':'/brand-media/cnc-workshop-green-carts-vankim.png',
 '/media/5796c371d1a5d3021d29.jpg':'/brand-media/precision-parts-collage-vankim.png',
 '/media/f12a6e1f3117c315c192.jpg':'/brand-media/cnc-milling-detail-vankim.png',
 '/media/8f0aaf9821de7cb16c0d.jpg':'/brand-media/precision-parts-collage-vankim.png',
 '/media/803aec19a16875faba96.jpg':'/brand-media/stacked-sheet-sections-vankim.png',
 '/media/6157066f624e4982f9ee.jpg':'/brand-media/precision-parts-white-vankim.png',
 '/media/637abebdf65db4e2cd06.jpg':'/brand-media/tool-holders-set-vankim.png',
 '/media/c474b73c9b62dabfb454.jpg':'/brand-media/stainless-boxes-vankim.png',
 '/media/f5429c8c006309b89404.jpg':'/brand-media/cnc-cutting-bed-detail-vankim.png',
 '/media/5973841e3b162d1a5062.jpg':'/brand-media/machined-circular-fixtures-vankim.png',
 '/media/aa066151f2101e564d5c.jpg':'/brand-media/tooling-table-parts-vankim.png',
 '/media/aae3b1cff37897cf23e5.jpg':'/brand-media/sheet-metal-frames-vankim.png',
 '/media/ee31f30db8e09b160ac7.jpg':'/brand-media/aluminum-frame-workshop-vankim.png',
 '/media/506ab8f4198e82cab451.jpg':'/brand-media/cnc-lathe-green-vankim.png',
 '/media/261c8ff095dbdc77b74e.jpg':'/brand-media/large-lathe-ring-vankim.png',
 '/media/32c977ff519d9a24f255.jpg':'/brand-media/cnc-machine-old-workshop-vankim.png',
 '/media/f43ed33991c893507ac8.jpg':'/brand-media/threaded-fittings-vankim.png',
 '/media/a76796af22c3e5a7e73a.jpg':'/brand-media/tooling-machine-workshop-vankim.png',
 '/media/686a79b17eb37dd1d05d.jpg':'/brand-media/wrapped-fabrication-equipment-vankim.png',
 '/media/d42d7de3f5b0d63a757c.jpg':'/brand-media/sheet-metal-enclosures-vankim.png',
 '/media/115953dbb8a3be4b2c93.jpg':'/brand-media/laser-cutting-sparks-vankim.png',
 '/media/249dc0e97e376736330f.jpg':'/brand-media/machined-plate-vankim.png',
 '/media/f628b02ceb5580cc737a.jpg':'/brand-media/laser-cutting-panels-vankim.png',
 '/media/78f4af257629173a9986.jpg':'/brand-media/laser-machine-workshop-vankim.png',
 '/media/f3975fd42884a23e439f.jpg':'/brand-media/perforated-panel-vankim.png',
 '/media/cd521a1598723c27efbd.jpg':'/brand-media/laser-brackets-vankim.png',
 '/media/c5e576a33412824e740e.jpg':'/brand-media/laser-machine-wide-vankim.png',
 '/media/07dc4d94a5c30a3817a6.jpg':'/brand-media/laser-workshop-vankim.png',
 '/media/1627d889f5c6c3548899.jpg':'/brand-media/laser-workshop-vankim.png',
 '/media/905d4d978f9e395edf71.jpg':'/brand-media/cnc-components-vankim.png',
 '/media/cfe0560147be47966c26.jpg':'/brand-media/cnc-machining-tool-vankim.png',
 '/media/e7ab2f1693dfc6118641.jpg':'/brand-media/machined-plate-array-vankim.png',
 '/media/18a1646973d8311ef626.jpg':'/brand-media/cnc-milling-vankim.png',
 '/media/c3b93936129350151c27.jpg':'/brand-media/machined-components-collage-vankim.png',
 '/media/745b0fbd95d0ac280c21.jpg':'/brand-media/cnc-machining-tool-vankim.png',
 '/media/09954731739ff4badde3.jpg':'/brand-media/stainless-machine-vankim.png',
 '/media/71ed0ce7244877f16528.jpg':'/brand-media/workshop-wheel-machines-vankim.png',
 '/media/e414b95a5f27f8cdfb2b.jpg':'/brand-media/stainless-industrial-machine-vankim.png',
 '/media/ba90ffde7b1079215d46.jpg':'/brand-media/precision-machined-rings-vankim.png',
 '/media/54d9490f2333b740a397.jpg':'/brand-media/precision-machined-bushings-vankim.png',
 '/media/35fa08ef4bbffa979e10.jpg':'/brand-media/cnc-floral-panel-vankim.png',
 '/media/abab0d2bcb783b8cd7bf.jpg':'/brand-media/cnc-bird-bamboo-panels-vankim.png',
 '/media/4aa69ecb877a23c3153f.jpg':'/brand-media/cnc-bronze-geometric-gate-vankim.png',
 '/media/8de86a515dd52ee0ef7e.jpg':'/brand-media/cnc-black-gold-gate-vankim.png',
 '/media/0c7cacf865601f24ae2e.jpg':'/brand-media/cnc-residential-gate-vankim.png',
 '/media/661eaf30dd477a7259dc.jpg':'/brand-media/cnc-gold-ornate-gate-vankim.png',
 '/media/03c5b47c216c77100e8a.jpg':'/brand-media/cnc-bronze-bird-gate-vankim.png',
 '/media/76747ed8f8f94436c545.jpg':'/brand-media/cnc-entry-gate-vankim.png',
 '/media/35e6d0711e7ed3c9c68f.jpg':'/brand-media/cnc-ornate-gate-vankim.png',
 '/media/c737a882579406cf2f09.jpg':'/brand-media/laser-machine-cutting-vankim.png',
 '/media/ad073c3d90ce57442ba7.jpg':'/brand-media/cnc-irregular-cut-panel-vankim.png',
 '/media/2fd5dcbbd1f550ad03c5.jpg':'/brand-media/cnc-floral-panel-floor-vankim.png',
 '/media/64bc7f488711bcbf2d6d.jpg':'/brand-media/cnc-scrollwork-parts-vankim.png',
 '/media/f033fb99249398a69dd6.jpg':'/brand-media/cnc-interlaced-screen-vankim.png',
 '/media/1c2fcbf1328840d922fe.jpg':'/brand-media/cnc-peacock-panel-vankim.png',
 '/media/19d6442c35c1065f0f08.jpg':'/brand-media/cnc-bird-floral-panel-vankim.png',
 '/media/a72993021efbed4a5bbb.jpg':'/brand-media/perforated-bent-sheets-vankim.png',
 '/media/c67e13e6170d652c0c1d.jpg':'/brand-media/cnc-city-map-art-vankim.png',
 '/media/6733c77a551b4367e463.jpg':'/brand-media/laser-cutting-bed-patterns-vankim.png',
 '/media/942c7203b02b155251a4.jpg':'/brand-media/cnc-pattern-panels-vankim.png',
 '/media/17b81bd0491bee823702.jpg':'/brand-media/cnc-stacked-ornate-panels-vankim.png',
 '/media/9b23ab92762174a44542.jpg':'/brand-media/cnc-ornate-gate-panel-vankim.png',
 '/media/4869d41d4c0ff6f22a04.jpg':'/brand-media/cnc-garden-screen-vankim.png',
 '/media/4761d5b9cea3d2f36b0a.jpg':'/brand-media/cnc-decorative-gate-panels-vankim.png',
 '/media/5d6570f333fec51662fd.jpg':'/brand-media/cnc-scrollwork-hanging-vankim.png',
 '/media/351b04846c93bfb99e75.jpg':'/brand-media/cnc-ornate-panel-vankim.png',
 '/media/148cf5deb8daeb6ee92e.jpg':'/brand-media/laser-metal-parts-vankim.png',
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
 ,'/media/7141a426acbca4f43c5a.jpg':'/brand-media/laser-workshop-vankim.png'
 ,'/media/80b278cea0cd2dbba2e1.jpg':'/brand-media/laser-workshop-portrait-vankim.png'
 ,'/media/a79843e83b01e2a29174.jpg':'/brand-media/laser-decorative-sheet-workshop-vankim.png'
 ,'/media/12f6eb58c2e87bad56a0.jpg':'/brand-media/laser-cutting-machine-vankim.png'
 ,'/media/e364c097c7470ec35970.jpg':'/brand-media/steel-sheet-laser-patterns-vankim.png'
 ,'/media/dce1d3762f1fcc074413.jpg':'/brand-media/steel-sheet-floral-laser-vankim.png'
 ,'/media/70249acd540d50d6dfc6.jpg':'/brand-media/steel-sheet-floral-machine-vankim.png'
 ,'/media/6900240af67277d9e081.jpg':'/brand-media/hopper-tower-vankim.png'
 ,'/media/a7b38f570a8114064666.jpg':'/brand-media/hopper-enclosure-vankim.png'
 ,'/media/6d2e490d34883790db7b.jpg':'/brand-media/hopper-workshop-vankim.png'
 ,'/media/1be635151db24eb88c81.jpg':'/brand-media/gear-collection-vankim.png'
 ,'/media/56c375bb5849e17ea70d.jpg':'/brand-media/gear-rack-collection-vankim.png'
 ,'/media/65ec900cfdce83d06b51.jpg':'/brand-media/gear-set-vankim.png'
 ,'/media/24ccdd2007a9d8290e88.jpg':'/brand-media/gear-collection-vankim.png'
 ,'/media/367698abbc96ab85f5c4.jpg':'/brand-media/three-gears-vankim.png'
 ,'/media/7dc99e490d5f5452a63d.jpg':'/brand-media/gear-grid-vankim.png'
 ,'/media/838b230d9afcfdba416a.jpg':'/brand-media/laser-engraved-nameplate-vankim.png'
 ,'/media/b92485342fcc4d06b434.jpg':'/brand-media/laser-marked-sample-plates-vankim.png'
 ,'/media/baadad3a792ece532142.jpg':'/brand-media/wheel-straightener-vankim.png'
 ,'/media/e1c9e904ca0b7b7b9686.jpg':'/brand-media/wheel-straightener-wrapped-vankim.png'
 ,'/media/d31690b85badd7a66939.jpg':'/brand-media/steel-pallet-workshop-vankim.png'
 ,'/media/76d669a1528e10a3bc89.jpg':'/brand-media/steel-pallet-outdoor-vankim.png'
 ,'/media/352d5a3e14525dc25cdd.jpg':'/brand-media/steel-pallet-tarp-vankim.png'
 ,'/media/77d4f1907335b0f842eb.jpg':'/brand-media/steel-pallet-shop-vankim.png'
 ,'/media/823e07024c2d725ff282.jpg':'/brand-media/steel-pallet-frame-vankim.png'
 ,'/media/05acaebb1ed80157861b.jpg':'/brand-media/cnc-milled-trim-vankim.png'
 ,'/media/dfdaca47412ef41c226c.jpg':'/brand-media/cnc-milled-parts-vankim.png'
 ,'/media/cf8c270a6d665e814cf7.jpg':'/brand-media/wash-machine-1-vankim.png'
 ,'/media/b12efb1d9b30a977d9ab.jpg':'/brand-media/wash-machine-2-vankim.png'
 ,'/media/dd31735320be20f09891.jpg':'/brand-media/wash-machine-3-vankim.png'
 ,'/media/9cc9e154fe9deab021da.jpg':'/brand-media/wash-machine-4-vankim.png'
 ,'/media/dd5b485daad49398c4e8.jpg':'/brand-media/wash-machine-5-vankim.png'
 ,'/media/d4eee5ffd149295b73cc.jpg':'/brand-media/wash-machine-6-vankim.png'
 ,'/media/3e446d79c92f4d69912b.jpg':'/brand-media/wash-machine-7-vankim.png'
 ,'/media/56f12268dd113d79aa14.jpg':'/brand-media/wash-machine-8-vankim.png'
 ,'/media/c9842b6c6b7bdd15441e.jpg':'/brand-media/wash-machine-9-vankim.png'
 ,'/media/ecc3ad4a553f2f0bf6cc.jpg':'/brand-media/wash-machine-10-vankim.png'
 ,'/media/a13e966a2c010cb6cccc.jpg':'/brand-media/wash-machine-11-vankim.png'
 ,'/media/ec65fc7e0939ec5035b6.jpg':'/brand-media/wash-machine-12-vankim.png'
 ,'/media/8745794b9d4ca6a20a94.jpg':'/brand-media/cnc-turned-tooling-set-vankim.png'
 ,'/media/001ab6eb57b1ae18c50b.jpg':'/brand-media/cnc-turned-tooling-closeup-vankim.png'
 ,'/media/4786400505ff1fedbf73.jpg':'/brand-media/cnc-turned-tooling-group-vankim.png'
 ,'/media/4d01efa0978d21e09e78.jpg':'/brand-media/laser-tiger-panel-vankim.png'
 ,'/media/7edbb0e70fee2c0b7c3f.jpg':'/brand-media/cnc-wildlife-panel-vankim.png'
 ,'/media/c9d7b61daf91ea9f57a4.jpg':'/brand-media/mechanical-services-banner-vankim.png'
 ,'/media/0c9a317c947ffae226f0.jpg':'/brand-media/laser-cut-stacked-parts-vankim.png'
 ,'/media/a04eab3573aa39f7d28c.jpg':'/brand-media/laser-cutting-bed-vankim.png'
 ,'/media/96284729f5765cf01938.jpg':'/brand-media/laser-cut-decorative-sheets-vankim.png'
 ,'/media/dcee69a57523e490d22d.jpg':'/brand-media/laser-cutting-machine-vankim.png'
 ,'/media/52199ffe7af5ff4fd047.jpg':'/brand-media/precision-machined-parts-vankim.png'
 ,'/media/544d59e70f8802d5c6b1.jpg':'/brand-media/precision-machined-parts-vankim.png'
 ,'/media/f9b1a76fd44f65dd70f6.jpg':'/brand-media/precision-welding-vankim.png'
 ,'/media/4c5ba0dfcb57b901bea4.jpg':'/brand-media/machined-flanges-vankim.png'
 ,'/media/cf79b939336cf9130038.jpg':'/brand-media/cnc-machined-brackets-vankim.png'
 ,'/media/a671d23b3c91134af9e6.jpg':'/brand-media/cnc-mold-machining-vankim.png'
 ,'/media/6df049c2e39ddfe658f1.jpg':'/brand-media/cnc-floral-rosette-vankim.png'
 ,'/media/fba1cdb64b0d2a400c50.jpg':'/brand-media/cnc-scrollwork-panels-vankim.png'
 ,'/media/488dd7632624acd2c773.jpg':'/brand-media/cnc-floral-gate-vankim.png'
 ,'/media/e0b1d3b48021376ac890.jpg':'/brand-media/cnc-bird-panel-vankim.png'
 ,'/media/a66bb7ce3e1c30a1c65b.jpg':'/brand-media/cnc-perforated-screen-vankim.png'
 ,'/media/e22ac06c7a8c5bb0b80e.jpg':'/brand-media/cnc-perforated-table-vankim.png'
 ,'/media/3bb2a62a8b709eda7ab8.jpg':'/brand-media/cnc-cutting-machine-vankim.png'
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
