import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';

const root=process.cwd();
const manifest=JSON.parse(await readFile(resolve(root,'content/manifest.json'),'utf8'));
const assetSource=new Map(manifest.assets.map(asset=>[asset.file,asset.source]));
const knownReplacements={
 '/media/bd0c8d9f57a7912951e9.jpg':'/brand-media/green-cnc-lathe-workshop-vankim.png',
 '/media/9e46d3ed1687bad150c8.jpg':'/brand-media/jig-curved-fin-fixtures-vankim.png',
 '/media/6c232938b30455cfcb1d.jpg':'/brand-media/large-ring-turning-machine-vankim.png',
 '/media/a611f3ad3eccedd588bf.jpg':'/brand-media/cnc-mold-machining-vankim.png',
 '/media/344cde05df7b1882044b.jpg':'/brand-media/cnc-tool-holder-cluster-vankim.png',
 '/media/ef8b7bb5c83461ef9559.jpg':'/brand-media/cnc-tool-holders-closeup-vankim.png',
 '/media/a37bc98d40d4aa3e2d20.jpg':'/brand-media/milling-workshop-operator-vankim.png',
 '/media/6e3bcced447f04479a05.jpg':'/brand-media/cnc-turning-machine-interior-vankim.png',
 '/media/6edaddf6b31ab95e8ee9.jpg':'/brand-media/black-turned-shafts-and-bushings-vankim.png',
 '/media/43ba3820aa15fcc60688.jpg':'/brand-media/precision-turning-chuck-vankim.png',
 '/media/2d023ce4a7da133dc37a.jpg':'/brand-media/cnc-milling-machine-green-vankim.png',
 '/media/da86956eecd49da6da6e.jpg':'/brand-media/cnc-machine-workshop-vankim.png',
 '/media/565bdef49f0fb7bb8486.jpg':'/brand-media/precision-milled-parts-black-background-vankim.png',
 '/media/4f54becd3bcaf5c79f68.jpg':'/brand-media/stainless-workshop-frames-vankim.png',
 '/media/120036fd368369f579fa.jpg':'/brand-media/stainless-workbench-press-brake-vankim.png',
 '/media/39fd7158a73cbac2dbe4.jpg':'/brand-media/precision-milled-parts-black-background-vankim.png',
 '/media/ff29a51c34ec4bcee63b.jpg':'/brand-media/stainless-channel-profiles-vankim.png',
 '/media/1678337d0aed1b96c181.jpg':'/brand-media/stainless-fabrication-workshop-vankim.png',
 '/media/b436b1afd57618d688b1.jpg':'/brand-media/stainless-tubes-profiles-clean-vankim.png',
 '/media/106a805647efd3c26b4a.jpg':'/brand-media/stainless-bent-samples-vankim.png',
 '/media/1f4245ca4d61218f5d71.jpg':'/brand-media/stainless-fabricated-panels-vankim.png',
 '/media/984e7d94d8b8827085a2.jpg':'/brand-media/stacked-stainless-trays-vankim.png',
 '/media/66cc223419890acda822.jpg':'/brand-media/stainless-tubes-and-profiles-vankim.png',
 '/media/0998212460a8063a0ef0.jpg':'/brand-media/laser-cut-stainless-brackets-vankim.png',
 '/media/959a5e8755776a282a8a.jpg':'/brand-media/stacked-bent-stainless-panels-vankim.png',
 '/media/fecb3c4414f1e6696cd1.jpg':'/brand-media/white-gold-dragon-gate-vankim.png',
 '/media/e1263fad0b39e8f47184.jpg':'/brand-media/gold-four-panel-floral-gate-vankim.png',
 '/media/336af5c7e36210144d8b.jpg':'/brand-media/gray-white-floral-gate-vankim.png',
 '/media/9cd1c665eca3b2de47ee.jpg':'/brand-media/gold-black-house-gate-vankim.png',
 '/media/6110e52c4324d2338087.jpg':'/brand-media/four-panel-gold-inlay-gate-vankim.png',
 '/media/930d7f4adb7f731eaf4e.jpg':'/brand-media/gold-phoenix-four-panel-gate-vankim.png',
 '/media/136eae1d1525e6b7b3a9.jpg':'/brand-media/classic-ornate-house-gate-vankim.png',
 '/media/3f56dd0dfd7ad05d6493.jpg':'/brand-media/black-ornate-driveway-gate-vankim.png',
 '/media/37a23b0214ecdaf94e85.jpg':'/brand-media/dark-medallion-cnc-gate-vankim.png',
 '/media/119d240a3adf4c4d2952.jpg':'/brand-media/butterfly-cut-gate-vankim.png',
 '/media/7a40dc0563dcbe871fa9.jpg':'/brand-media/decorative-metal-screen-panels-vankim.png',
 '/media/adc37a9d8a56ee3b4ccd.jpg':'/brand-media/modern-pattern-metal-gate-vankim.png',
 '/media/7c40bec89610c5b2c27f.jpg':'/brand-media/gold-ornate-double-gate-vankim.png',
 '/media/b682f5e6a8e0db34f429.jpg':'/brand-media/laser-cut-floral-sheet-machine-vankim.png',
 '/media/b8e48eb2dbca6c569d41.jpg':'/brand-media/ornate-black-gate-exterior-vankim.png',
 '/media/d36e8c20513199ad43f4.jpg':'/brand-media/dragon-phoenix-panel-vankim.png',
 '/media/e04e9c44a112030818d7.jpg':'/brand-media/white-multi-panel-gate-vankim.png',
 '/media/558f542c0eaee6cc35e6.jpg':'/brand-media/black-floral-four-panel-vankim.png',
 '/media/e38ebb41ec64ce18adf5.jpg':'/brand-media/ornate-driveway-gate-vankim.png',
 '/media/5d012cfb28b520893eb3.jpg':'/brand-media/black-gold-four-panel-vankim.png',
 '/media/c6cf7981625875bb6895.jpg':'/brand-media/black-gold-residence-gate-vankim.png',
 '/media/e13335e01a552df6e7f5.jpg':'/brand-media/gray-medallion-gate-vankim.png',
 '/media/cc4db1f76baf9368ebc5.jpg':'/brand-media/tan-floral-door-vankim.png',
 '/media/71d133bbab9bbcb9c453.jpg':'/brand-media/mint-panel-door-vankim.png',
 '/media/943c893c44ea10756cc6.jpg':'/brand-media/black-gold-four-panel-vankim.png',
 '/media/294de494d8c652a5dd91.jpg':'/brand-media/four-panel-calligraphy-vankim.png',
 '/media/a928a35d18f4e2563322.jpg':'/brand-media/purple-louver-gate-vankim.png',
 '/media/2d6ff1ee4e7186f51a22.jpg':'/brand-media/black-floral-door-vankim.png',
 '/media/f6c3576a656f92003a2a.jpg':'/brand-media/white-circular-gate-vankim.png',
 '/media/3814b15864d542d0ef14.jpg':'/brand-media/gold-modern-gate-vankim.png',
 '/media/165882f515e36a97bb0b.jpg':'/brand-media/decorative-panel-bundle-vankim.png',
 '/media/f5d0d58899883d4b01bd.jpg':'/brand-media/gold-modern-gate-vankim.png',
 '/media/656468719cc2eca6c6b8.jpg':'/brand-media/four-panel-gate-vankim.png',
 '/media/07188b77449f7d9d14e4.jpg':'/brand-media/four-panel-gate-vankim.png',
 '/media/5e953c15c22049f9614d.jpg':'/brand-media/white-ornate-door-vankim.png',
 '/media/3ac38d7beb51d9f590ac.jpg':'/brand-media/black-gold-gate-vankim.png',
 '/media/16facfac56c6d92fcdf3.jpg':'/brand-media/ornate-workshop-panels-vankim.png',
 '/media/1895fc43ea43967889df.jpg':'/brand-media/flat-cut-gate-panels-vankim.png',
 '/media/a6285b8040e73d9f65f0.jpg':'/brand-media/gold-arched-gate-vankim.png',
 '/media/b50ab8c9912f91574979.jpg':'/brand-media/white-gold-gate-vankim.png',
 '/media/56d54a65f5cc2754755d.jpg':'/brand-media/black-floral-gate-vankim.png',
 '/media/ead1ce8b72d369002c20.jpg':'/brand-media/ornate-double-gate-vankim.png',
 '/media/cf6711aaa9092f5e3c20.jpg':'/brand-media/ornate-double-gate-vankim.png',
 '/media/3dd055673da0e1b11f09.jpg':'/brand-media/gold-decorative-gate-vankim.png',
 '/media/b1a73e4c0aafc53b58db.jpg':'/brand-media/black-ornate-gate-vankim.png',
 '/media/9e0bd8a65ccfca0926db.jpg':'/brand-media/industrial-blower-vankim.png',
 '/media/28c494dc6ce52632a19b.jpg':'/brand-media/press-brake-parts-vankim.png',
 '/media/fd6a84ef6295b7d1a297.jpg':'/brand-media/cnc-machining-vankim.png',
 '/media/cb094e7a8af5077a7d1e.jpg':'/brand-media/wrapped-metal-parts-vankim.png',
 '/media/a2b25b93cb4cd9d25fcc.jpg':'/brand-media/machined-brackets-vankim.png',
 '/media/dc94a49ad479e46a148e.jpg':'/brand-media/decorative-metal-panel-workshop-vankim.png',
 '/media/33a4b46521ee8f922086.jpg':'/brand-media/stainless-sheet-boxes-vankim.png',
 '/media/7227092ce6eaaa77e5f0.jpg':'/brand-media/machined-flange-spools-vankim.png',
 '/media/ed38f4d7073b9115ac37.jpg':'/brand-media/stainless-sheet-fabrication-vankim.png',
 '/media/18bf10687f26639196d3.jpg':'/brand-media/stainless-fabricated-boxes-vankim.png',
 '/media/4fa4c8f98433c7366f7c.jpg':'/brand-media/stainless-cabinet-top-vankim.png',
 '/media/6ef5a8536ac137b61f4d.jpg':'/brand-media/stacked-angle-parts-vankim.png',
 '/media/77b24c4aa19bdbff3b14.jpg':'/brand-media/box-brackets-vankim.png',
 '/media/c4c2949cd3260374955d.jpg':'/brand-media/cad-fixture-green-vankim.png',
 '/media/db9166da7901d65cb6d4.jpg':'/brand-media/machined-fixtures-workshop-vankim.png',
 '/media/0b16643e2437c20543b7.jpg':'/brand-media/galvanized-cabinet-vankim.png',
 '/media/1b58e5a5e07932279e90.jpg':'/brand-media/welded-flange-vankim.png',
 '/media/86d98ba0dccb630d009c.jpg':'/brand-media/stacked-sheet-tabs-vankim.png',
 '/media/8499ddf3aa7b6499a67c.jpg':'/brand-media/stainless-tray-holes-vankim.png',
 '/media/10a82a56f217e928f50e.jpg':'/brand-media/precision-machined-set-vankim.png',
 '/media/079eb95b4139809abdf8.jpg':'/brand-media/welded-flange-vankim.png',
 '/media/30b4af50d839e643fb2a.jpg':'/brand-media/platform-frame-vankim.png',
 '/media/08eba1720a856ea6639c.jpg':'/brand-media/black-gears-vankim.png',
 '/media/98ec29bac9bcabd26333.jpg':'/brand-media/gear-rack-vankim.png',
 '/media/65433e293041e47a31ea.jpg':'/brand-media/machined-components-collage-vankim.png',
 '/media/4b6789db00ddda99ae48.jpg':'/brand-media/mechanical-products-catalog-vankim.png',
 '/media/6c6a9f7f6cb050916939.jpg':'/brand-media/precision-parts-collage-watermark-vankim.png',
 '/media/411998d8b4f9de858d04.jpg':'/brand-media/precision-parts-collage-watermark-vankim.png',
 '/media/cacf73f58ca8294b55cf.jpg':'/brand-media/stainless-tank-watermark-vankim.png',
 '/media/ef4071dc4c5c86dab9de.jpg':'/brand-media/precision-cylinders-watermark-vankim.png',
 '/media/a2b25b93cb4cd9d25fcc.jpg':'/brand-media/machined-brackets-vankim.png',
 '/media/dc94a49ad479e46a148e.jpg':'/brand-media/decorative-metal-panel-workshop-vankim.png',
 '/media/33a4b46521ee8f922086.jpg':'/brand-media/stainless-sheet-boxes-vankim.png',
 '/media/7227092ce6eaaa77e5f0.jpg':'/brand-media/machined-flange-spools-vankim.png',
 '/media/ed38f4d7073b9115ac37.jpg':'/brand-media/stainless-sheet-fabrication-vankim.png',
 '/media/18bf10687f26639196d3.jpg':'/brand-media/stainless-fabricated-boxes-vankim.png',
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
 '/media/6157066f624e4982f9ee.jpg':'/brand-media/precision-machined-parts-white-vankim.png',
 '/media/637abebdf65db4e2cd06.jpg':'/brand-media/tool-holders-and-boring-tools-vankim.png',
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
const checkedClean={
 '/media/b42170379c880a4d0d8a.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/4d2fade90accdd90f7b6.jpg':'Không có watermark cũ; ảnh kho tấm thép, kiểm tra trực quan.',
 '/media/a7a65e23bc8e8e94a7c5.jpg':'Không có watermark cũ; ảnh tấm gân, kiểm tra trực quan.',
 '/media/a6433afa24e29d64cc9d.jpg':'Không có watermark cũ; ảnh xếp tấm kim loại, kiểm tra trực quan.',
 '/media/8e066bcd48b96cc5477a.jpg':'Không có watermark cũ; ảnh tấm thép gia công, kiểm tra trực quan.',
 '/media/0cda258664f79a31c74b.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/bb79e7c5536f1b2d6c96.jpg':'Không có watermark cũ; ảnh kho tấm inox, kiểm tra trực quan.',
 '/media/67601dda56b5aae3cd12.jpg':'Không có watermark cũ; ảnh tấm kim loại, kiểm tra trực quan.',
 '/media/0a8531af0f463ee666dc.jpg':'Không có watermark cũ; ảnh tấm kim loại, kiểm tra trực quan.',
 '/media/275ccc965dc46fed136a.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/b2ae24f02c6b8d5cb904.jpg':'Không có watermark cũ; ảnh kho tấm kim loại, kiểm tra trực quan.',
 '/media/fdb93be71e38fbd7312c.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/37ec93d391e1e381746d.jpg':'Không có watermark cũ; ảnh kho tấm thép, kiểm tra trực quan.',
 '/media/2dc17609ab29b2b8ba84.jpg':'Không có watermark cũ; ảnh tấm kim loại, kiểm tra trực quan.',
 '/media/0e28df1470ffae44fbd9.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/b4db9b242e2509a33ed4.jpg':'Không có watermark cũ; ảnh kho tấm thép, kiểm tra trực quan.',
 '/media/2894ddadd43eea48650e.jpg':'Không có watermark cũ; ảnh tấm kim loại, kiểm tra trực quan.',
 '/media/a5cce0011d63f5b5f8bd.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/1d6c489406d291211453.jpg':'Không có watermark cũ; ảnh kho tấm kim loại, kiểm tra trực quan.',
 '/media/52ae4a592de6fa1662f4.jpg':'Không có watermark cũ; ảnh tấm kim loại, kiểm tra trực quan.',
 '/media/dc7a7cd1c99239c2f841.jpg':'Không có watermark cũ; ảnh tấm kim loại, kiểm tra trực quan.',
 '/media/c7463e212927c3c70b8e.jpg':'Không có watermark cũ; ảnh kho tấm kim loại, kiểm tra trực quan.',
 '/media/b8272add29cb0f888e8c.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/0fbd030ed021af8c712e.jpg':'Không có watermark cũ; ảnh tấm thép, kiểm tra trực quan.',
 '/media/3f35a8bcf8de2d583a84.jpg':'Không có watermark cũ; ảnh thang máy, kiểm tra trực quan.',
 '/media/2ffcd9a0c2f088e8d1f1.jpg':'Không có watermark cũ; ảnh thang máy, kiểm tra trực quan.',
 '/media/6f0d32ef922917e2b33b.jpg':'Không có watermark cũ; ảnh thang máy, kiểm tra trực quan.',
 '/media/ac58f919827489bc274f.jpg':'Không có watermark cũ; ảnh khung thang máy, kiểm tra trực quan.',
 '/media/b1333f53e523ddce3c7f.jpg':'Không có watermark cũ; ảnh cabin thang máy, kiểm tra trực quan.',
 '/media/253941f58c0a3fff5f25.jpg':'Không có watermark cũ; ảnh giếng thang máy, kiểm tra trực quan.',
 '/media/820a61d6f6710ceb6e4a.jpg':'Không có watermark cũ; ảnh thang máy nội thất, kiểm tra trực quan.',
 '/media/266858eedc9ae7f6c430.jpg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/0984a17e68da36419fca.jpg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/7232f927c0966506d9da.jpg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/8330a779602e40682396.jpg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/731d8ca7f375264c86d3.jpeg':'Không có watermark cũ; ảnh thang máy, kiểm tra trực quan.',
 '/media/bda185582325da14fd26.jpg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/7fc8e49dfa63d8587908.jpeg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/0fc77a3db0d2d61a949c.jpg':'Không có watermark cũ; ảnh thang máy, kiểm tra trực quan.',
 '/media/ca088d4df2b34444fa1c.jpg':'Không có watermark cũ; ảnh nội thất/thang máy, kiểm tra trực quan.',
 '/media/4443a62958af914aaa25.jpeg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/9ef38c25435add6a9795.jpeg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/9278736538741ed9fd12.jpg':'Không có watermark cũ; ảnh thang máy gia đình, kiểm tra trực quan.',
 '/media/b13fc97ea2076ff9af78.jpg':'Không có watermark cũ; chữ là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/f2ee4824568a1bf4f6f9.jpg':'Không có watermark cũ; mã/chữ là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/413cdf52ea74a8cea7f8.jpg':'Không có watermark cũ; chữ là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/e42ebc6c179fca27768d.jpg':'Không có watermark cũ; mã/chữ là chi tiết khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/53fcba8cd3562325a86a.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/c5ead9d46069d5a5c6d5.jpg':'Không có watermark cũ; chữ là thông tin khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/c3729bed4b8750e81b43.jpg':'Không có watermark cũ; chữ/biểu tượng là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/cc4772ba5e2ce02fc94f.jpg':'Không có watermark cũ; mã/chữ là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/18ae3acb5c911f88fc60.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/6a6bb676c736689c830d.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/84cc6389186c5a9a918b.jpg':'Không có watermark cũ; chữ/biểu tượng là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/c7d7173ec4b842b9ccbc.jpg':'Không có watermark cũ; chữ là thông tin nameplate, kiểm tra trực quan.',
 '/media/ccbbe475a31e9f3aff03.jpg':'Không có watermark cũ; mã/chữ là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/e3bbe3240a831d65f17c.jpg':'Không có watermark cũ; chữ/QR là thông tin trên sản phẩm, kiểm tra trực quan.',
 '/media/a9080ad63f7eb055ddfa.jpg':'Không có watermark cũ; mã/chữ là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/61f86fa0dd968e7243a3.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/0642e78ed5191757e1cc.jpg':'Không có watermark cũ; đây là nameplate sản phẩm, kiểm tra trực quan.',
 '/media/f348eaf5bce29b7cfb1e.jpg':'Không có watermark cũ; mã/chữ là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/a82ea038fb7283b02d3f.jpg':'Không có watermark cũ; đây là ảnh thiết bị và chi tiết gia công, kiểm tra trực quan.',
 '/media/7f48540d337096842b3c.jpg':'Không có watermark cũ; mã số là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/1c7c7da9720df5ed6a7c.jpg':'Không có watermark cũ; chữ là mã khắc trên chi tiết cơ khí, kiểm tra trực quan.',
 '/media/a3abc7b22b8215302614.jpg':'Không có watermark cũ; logo/chữ là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/a5a9cd3d084627731e44.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/e924c99fde2bfb1a78ad.jpg':'Không có watermark cũ; chữ là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/81fbf1a34da8a101d5a5.jpg':'Không có watermark cũ; đây là nameplate sản phẩm, kiểm tra trực quan.',
 '/media/40f5ec2be489e02493e6.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/1cf7049415c46130ed83.jpg':'Không có watermark cũ; chữ là thông tin sản phẩm, kiểm tra trực quan.',
 '/media/f2e1c995db548f833a90.jpg':'Không có watermark cũ; chữ/biểu tượng là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/d01db7d556f7bd948053.jpg':'Không có watermark cũ; chữ là mã khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/b34f873f30cd21b038bf.jpg':'Không có watermark cũ; chữ là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/dcc9148ac5f354660f39.jpg':'Không có watermark cũ; chữ là thông tin khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/9f212986f77f8e878690.jpg':'Không có watermark cũ; mã/chữ là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/62c657b2474bd84a259a.jpg':'Không có watermark cũ; mã QR/chữ là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/f869b94534978f21d3c5.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/3a868bf528b59419eecd.jpg':'Không có watermark cũ; chữ/biểu tượng là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/e0d4a4566ff61982aefc.jpg':'Không có watermark cũ; chữ là thông tin sản phẩm, kiểm tra trực quan.',
 '/media/7a87f82dd1fc997f3233.jpg':'Không có watermark cũ; chữ là thông tin khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/90d76c0d5e1d59a81fb3.jpg':'Không có watermark cũ; mã QR/chữ là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/e5deac3af652b8acaf7d.jpg':'Không có watermark cũ; chữ là nội dung khắc/in trên sản phẩm, kiểm tra trực quan.',
 '/media/bea0473e8744b439d07e.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/67a9b1061ffe1b92b692.jpg':'Không có watermark cũ; đây là nhãn sản phẩm của bên đặt hàng, kiểm tra trực quan.',
 '/media/d4aaba47133b93358517.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/2350307d27c275c1f313.jpg':'Không có watermark cũ; chữ/mã là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/dfae8cb1123044fb69b2.jpg':'Không có watermark cũ; chữ là thông tin nhãn sản phẩm, kiểm tra trực quan.',
 '/media/cd8dea14c6e5a733255e.jpg':'Không có watermark cũ; chữ là mã khắc trên chi tiết cơ khí, kiểm tra trực quan.',
 '/media/1d8caaf29c819f4cd070.jpg':'Không có watermark cũ; chữ là mã khắc trên chi tiết cơ khí, kiểm tra trực quan.',
 '/media/a91ed3387750d936414b.jpg':'Không có watermark cũ; chữ/biểu tượng là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/67280cf1c6a32c91cce6.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/575e7a1aa58486d86834.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/cdfaef54716e7de42325.jpg':'Không có watermark cũ; logo/chữ là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/8c26da02fb422877605f.jpg':'Không có watermark cũ; chữ/biểu tượng là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/a55c4d707701917c320a.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/854841c4e71466cf0532.jpg':'Không có watermark cũ; chữ là thông tin khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/11f039da13949b2cc6e6.jpg':'Không có watermark cũ; chữ là chi tiết khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/8af53ab03e4efbd671ea.jpg':'Không có watermark cũ; nội dung là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/f3bd5b5a36a8a3faa5b9.jpg':'Không có watermark cũ; chữ là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/5b163333bc5fcb03fa06.jpg':'Không có watermark cũ; chữ là nội dung in trên sản phẩm, kiểm tra trực quan.',
 '/media/a4339146e63b4d4e0ca1.jpg':'Không có watermark cũ; chữ là nhãn sản phẩm, kiểm tra trực quan.',
 '/media/9ac6f2d139203b6239b5.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/032d25ee9f42e1429489.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/8437ee32870658a40e4f.jpg':'Không có watermark cũ; chữ là thông tin nhãn sản phẩm, kiểm tra trực quan.',
 '/media/6b50ba0f530d66dc4da6.jpg':'Không có watermark cũ; chữ là thông tin khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/c84c1a3f352c6c6dda9e.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/e78d2d2b359a5eaed62b.jpg':'Không có watermark cũ; chữ là thông tin trên nhãn sản phẩm, kiểm tra trực quan.',
 '/media/afeedfec6996800e4fde.jpg':'Không có watermark cũ; chữ là chi tiết khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/7ec8fe1ea789e4e5bb24.jpg':'Không có watermark cũ; chỉ có vạch đo/chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/fce136ea1991fa7e85f0.jpg':'Không có watermark cũ; chữ là nội dung khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/ca92750cd93494f23293.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/0d5ea2158edc79f04442.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/2c588d9ccedf30feedbe.jpg':'Không có watermark cũ; chữ là nội dung sản phẩm, kiểm tra trực quan.',
 '/media/f4bc5ec2817549f20c31.jpg':'Không có watermark cũ; chỉ là chữ thông tin sản phẩm, kiểm tra trực quan.',
 '/media/649bac6a9a7bc706dbd3.jpg':'Không có watermark cũ; chữ/biểu tượng là chi tiết sản phẩm, kiểm tra trực quan.',
 '/media/984d957b1e56722b85c4.jpg':'Không có watermark cũ; chữ là thông tin khắc trên sản phẩm, kiểm tra trực quan.',
 '/media/ef4c33ffde88641f7e7c.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/7d48fae45492a1efac87.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/4fb79a41b9f6e95a2931.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/c8c68556247f5168b3c1.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/ba211835702618ea89b4.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/bcba49443ba6898f90d7.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/63776e72e22012fec9a0.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/5bcc2e4ffa20b425675c.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/5669dd1078d231acf765.jpg':'Không có watermark cũ; kiểm tra trực quan.',
 '/media/6b6158d97c6a5f66ef61.jpg':'Không có watermark cũ; trùng ảnh đã kiểm tra sạch.',
 '/media/7b55baec4f3ef557a227.jpg':'Không có watermark cũ.',
 '/media/561c9c9d3decc6447892.jpg':'Không có watermark cũ; trùng ảnh đã kiểm tra sạch.',
 '/media/f86785487090e4cb3f3c.jpg':'Không có watermark cũ.',
 '/media/bfca93091803bc7ddda5.jpg':'Không có watermark cũ.',
 '/media/176fc1d97cc670ed13fe.jpg':'Không có watermark cũ.',
 '/media/200aa2048a68b68cfde2.jpg':'Không có watermark cũ.',
 '/media/bea381620244a0d6344e.jpg':'Không có watermark cũ.',
 '/media/f84002730daf4f0d58b3.jpg':'Không có watermark cũ.',
 '/media/c0197b6b60a1081857e4.jpg':'Không có watermark cũ.',
 '/media/6a7fb8500249291d1d91.jpg':'Không có watermark cũ; trùng ảnh đã kiểm tra sạch.',
 '/media/30cab80c746895765a2a.jpg':'Không có watermark cũ.',
 '/media/c8f11f18d85fa62f116c.jpg':'Không có watermark cũ.',
 '/media/963553a0c36ed13c9cc1.jpg':'Không có watermark cũ.',
 '/media/6b7ccceb8cfd713c5bbd.jpg':'Không có watermark cũ.',
 '/media/e84021febf8f4a5253ee.jpg':'Không có watermark cũ.',
 '/media/d161d7b36644bfc03835.jpg':'Không có watermark cũ.',
 '/media/228f06c10d11183fb8ef.jpg':'Không có watermark cũ.',
 '/media/669a0815bb5a1437f1c5.jpg':'Không có watermark cũ.',
 '/media/88a5a48e610bcf895c51.jpg':'Không có watermark cũ; trùng ảnh bánh răng đã kiểm tra sạch.',
 '/media/9acf7ac629f9fe732ff2.jpg':'Không có watermark cũ.',
 '/media/aca79ae36ae65388b11f.jpg':'Không có watermark cũ.',
 '/media/577319a20518cdfc6959.jpg':'Không có watermark cũ.',
 '/media/5a4117edf87edb6e3609.jpg':'Không có watermark cũ.',
 '/media/88280b64dac0e6d32517.jpg':'Không có watermark cũ.',
 '/media/d66a4363b73cc3eba52d.jpg':'Không có watermark cũ.',
 '/media/001ad8ceb6cd664eb335.jpg':'Không có watermark cũ.',
 '/media/f87581452718abe2f9f3.jpg':'Không có watermark cũ.',
 '/media/ada7ad1afe6402bfb595.jpg':'Không có watermark cũ.',
 '/media/7fd873987f0280c5df6a.jpg':'Không có watermark cũ.',
 '/media/d3150a16b62ddc0b26bf.jpg':'Không có watermark cũ.',
 '/media/a6e1f7043338aa0fb873.jpg':'Không có watermark cũ.',
 '/media/ce77ed535254173906f2.jpg':'Không có watermark cũ.',
 '/media/569741c715e84585662d.jpg':'Không có watermark cũ.',
 '/media/7e9cba9253bc82f51e3a.jpg':'Không có watermark cũ.',
 '/media/1bc08a0615253173ae2e.jpg':'Không có watermark cũ.',
 '/media/9d98cf42344085f8095d.jpg':'Không có watermark cũ.',
 '/media/d6dab872282d42f9eed3.jpg':'Không có watermark cũ.',
 '/media/271dd0b7b4af0265c28c.jpg':'Không có watermark cũ; trùng ảnh đã kiểm tra sạch.',
 '/media/201658740c9e02fa7ac1.jpg':'Không có watermark cũ.',
 '/media/f0426842e31b3c58b540.jpg':'Không có watermark cũ.',
 '/media/eea9368c0b80a3340c8a.jpg':'Không có watermark cũ.',
 '/media/9f152749a0470ddaa310.jpg':'Không có watermark cũ.',
 '/media/9efdd25d0e03abca753d.jpg':'Không có watermark cũ.',
 '/media/40c7bc42863af2898653.jpg':'Không có watermark cũ.',
 '/media/4a99e18aaf30b20a7134.jpg':'Không có watermark cũ; trùng ảnh đã kiểm tra sạch.',
 '/media/1bd3b35cb4f5634ad412.jpg':'Không có watermark cũ; trùng ảnh đã kiểm tra sạch.',
 '/media/907165ac645d2ed2a3cd.jpg':'Không có watermark cũ.',
 '/media/23de97f884e480f7c3bc.jpg':'Không có watermark cũ.',
 '/media/8ee977b8b15f0e7f2d03.jpg':'Không có watermark cũ.',
 '/media/1d7bf7d83260ab7a3e53.jpg':'Không có watermark cũ.',
 '/media/e375d53730d0556db997.jpg':'Không có watermark cũ.',
 '/media/65196399a97e8b472e6d.jpg':'Không có watermark cũ.',
 '/media/ea0be8849abae7f34cc9.jpg':'Không có watermark cũ; mã 032-FMB22 là ký hiệu trên sản phẩm.',
 '/media/4a361c74f79401a86baa.jpg':'Không có watermark cũ.',
 '/media/e58ed2ec840462b914cf.jpg':'Không có watermark cũ.',
 '/media/7de3229efdc5c84e9a08.jpg':'Không có watermark cũ.',
 '/media/d0f05c194bdc2e73538c.jpg':'Không có watermark cũ.',
 '/media/401ea327b042781477db.jpg':'Không có watermark cũ.',
 '/media/fce9aad42e0625bc337e.jpg':'Không có watermark cũ.',
 '/media/535a2c446db5aae2fd70.jpg':'Không có watermark cũ.',
 '/media/9d9b4c6747e4771a6477.jpg':'Không có watermark cũ; trùng ảnh đã kiểm tra sạch.',
 '/media/f8ee787276f51b5c3991.jpg':'Không có watermark cũ.',
 '/media/904a3089d00bc556cf1d.jpg':'Không có watermark cũ.',
 '/media/fe69d50f87fb1ddeca0b.jpg':'Không có watermark cũ.',
 '/media/4a7020ba9cef3ff4d5e5.jpg':'Không có watermark cũ; trùng ảnh vỏ máy đã kiểm tra sạch.',
 '/media/87bafd8736555f4e6eaa.jpg':'Không có watermark cũ.',
 '/media/8b55423de9bdfe3bb4dd.jpg':'Không có watermark cũ.',
 '/media/e35ac31cc2de00107e83.jpg':'Không có watermark cũ.',
 '/media/a6b1473870729e828b35.jpg':'Không có watermark cũ.',
 '/media/838cf5249e5b03c2cde1.jpg':'Không có watermark cũ.',
 '/media/7f0d4ff2e428a3e0da2d.jpg':'Không có watermark cũ; chữ ERSystem là ký hiệu trên sản phẩm.',
 '/media/dd14ef4632983936b6b2.jpg':'Không có watermark cũ.',
 '/media/f99c87d000221cebe96f.jpg':'Không có watermark cũ.',
 '/media/b50f55f82df56de7332c.jpg':'Không có watermark cũ; trùng ảnh bánh răng đã kiểm tra sạch.',
 '/media/917cc516a34c4016c431.jpg':'Không có watermark cũ.',
 '/media/340f5f0146a7fd8d5c50.jpg':'Không có watermark cũ.',
 '/media/0d96ce65d8088af796b2.jpg':'Không có watermark cũ.',
 '/media/c9fbe2fda7e20f8d53e7.jpg':'Không có watermark cũ.',
 '/media/3bcff12cfd7c35845a2d.jpg':'Không có watermark cũ.',
 '/media/7e949ad631196746b670.jpg':'Không có watermark cũ.',
 '/media/26305ae25b64637851d0.jpg':'Không có watermark cũ.',
 '/media/ad35355013377ba38b45.jpg':'Không có watermark cũ.',
 '/media/3f9845aa433aa4c7c152.jpg':'Không có watermark cũ.',
 '/media/cab10c8313c9804f1dbe.jpg':'Không có watermark cũ.',
 '/media/ae3734bbb8475ad5e0d6.jpg':'Không có watermark cũ.',
 '/media/f21713be8419d6453fa9.jpg':'Không có watermark cũ.',
 '/media/12063dda297c44f11788.jpg':'Không có watermark cũ.',
 '/media/7cbe655aad43cf75bdc4.jpg':'Không có watermark cũ.',
 '/media/aba3ce286718587f09bf.jpg':'Không có watermark cũ.',
 '/media/24594876c91a6450842a.jpg':'Không có watermark cũ.',
 '/media/190e3520c8c8ecd54f36.jpg':'Không có watermark cũ.',
 '/media/a0b73ac9abb0bc4467d1.jpg':'Không có watermark cũ.',
 '/media/e8a16b95bed931f4e0fd.jpg':'Không có watermark cũ.',
 '/media/81b4813d26be54d1e438.jpg':'Không có watermark cũ.',
 '/media/b66a159d710f1ae20dfe.jpg':'Không có watermark cũ; trùng ảnh /media/e8a16b95bed931f4e0fd.jpg.',
 '/media/8446584b26970e2fef56.jpg':'Không có watermark cũ; trùng ảnh /media/e8a16b95bed931f4e0fd.jpg.',
 '/media/925d2ab23437ad81472a.jpg':'Không có watermark cũ.',
 '/media/51b9bac1c5c760598528.jpg':'Không có watermark cũ.',
 '/media/d05fed563de1fd1e10ae.jpg':'Không có watermark cũ.',
 '/media/292ff0adc5ec48f134b1.jpg':'Không có watermark cũ.',
 '/media/65c95f89d692e712e55d.jpg':'Không có watermark cũ.',
 '/media/da067ae4e19aa5eb028d.jpg':'Không có watermark cũ.',
 '/media/4faabd4b686fae40f72c.jpg':'Không có watermark cũ; trùng ảnh /media/da067ae4e19aa5eb028d.jpg.',
 '/media/5d934bc7fc7a58bad425.jpg':'Không có watermark cũ.',
 '/media/2b49fa02555e10797b80.jpg':'Không có watermark cũ.',
 '/media/a47a47c21a7f0451d408.jpg':'Không có watermark cũ.',
 '/media/9b42d8109c070198fb0f.jpg':'Không có watermark cũ.',
 '/media/a92ff15ed5240c41d831.jpg':'Không có watermark cũ.',
 '/media/a4fa30abeb93fa5b1607.jpg':'Không có watermark cũ.',
 '/media/8120eb47f227d3c62914.jpg':'Không có watermark cũ.',
 '/media/b294688b1fd96f739ea9.jpg':'Không có watermark cũ.',
 '/media/7f4ca51be3d211abe175.jpg':'Không có watermark cũ; trùng ảnh /media/8120eb47f227d3c62914.jpg.',
 '/media/7393500f4e631e337cd4.jpg':'Không có watermark cũ.',
 '/media/ae20a641e3074d14bbb7.jpg':'Không có watermark cũ.',
 '/media/d5dd8197788131e34ae5.jpg':'Không có watermark cũ; trùng ảnh /media/3752bbb34e5899a13fbd.jpg.',
 '/media/df99d98c1aaaef46da93.jpg':'Không có watermark cũ.',
 '/media/ff30dbdce4811e4d09d8.jpg':'Không có watermark cũ.',
 '/media/b4934e9fd5ac61c34e18.jpg':'Không có watermark cũ.',
 '/media/2ffed876f34a799fe196.jpg':'Không có watermark cũ.',
 '/media/e4a8023534778c83f123.jpg':'Không có watermark cũ; trùng ảnh /media/2ffed876f34a799fe196.jpg.',
 '/media/5275fe183f1b6f4bc85a.jpg':'Không có watermark cũ.',
 '/media/a4b4f7aa1eaa26d2aa34.jpg':'Không có watermark cũ; trùng ảnh /media/4be9235eff3d6367890b.jpg.',
 '/media/6d9bdac4a1e24bb8282b.jpg':'Không có watermark cũ.',
 '/media/fe9439029fb282a90990.jpg':'Không có watermark cũ.',
 '/media/de2a7ef08767b2ae008e.jpg':'Không có watermark cũ.',
 '/media/099059cac9fb5d6c4c2d.jpg':'Không có watermark cũ.',
 '/media/f03c5106c18af495ea5b.jpg':'Không có watermark cũ.',
 '/media/e2ddfc5138d367fbeba9.jpg':'Không có watermark cũ; trùng ảnh /media/099059cac9fb5d6c4c2d.jpg.',
 '/media/3fa6ffdcf244c6f810e5.jpg':'Không có watermark cũ.',
 '/media/5b4f36c09ff6b4cff623.jpg':'Không có watermark cũ; trùng ảnh /media/08395c1799986d4ba333.jpg.',
 '/media/5735b65216675eb5e246.jpg':'Không có watermark cũ.',
 '/media/4776dc49830afbab729e.jpg':'Không có watermark cũ.',
 '/media/f0d72e665b4096d7a1f3.jpg':'Không có watermark cũ.',
 '/media/b80eaade1be6aca1f29f.jpg':'Không có watermark cũ.',
 '/media/7f62c9a94239aa79122d.jpg':'Không có watermark cũ; trùng ảnh /media/b80eaade1be6aca1f29f.jpg.',
 '/media/d99a18a155042964054d.jpg':'Không có watermark cũ.',
 '/media/08395c1799986d4ba333.jpg':'Không có watermark cũ.',
 '/media/18bc4cfad425794d71e6.jpg':'Không có watermark cũ.',
 '/media/40d4a57a55c94c401b66.jpg':'Không có watermark cũ.',
 '/media/2874face178c5d898dd2.jpg':'Không có watermark cũ; trùng ảnh /media/9ac069ffde63232cdf80.jpg.',
 '/media/1051b8d2f1a356f8a356.jpg':'Không có watermark cũ.',
 '/media/650161b6555e7f0af076.jpg':'Không có watermark cũ.',
 '/media/9d0fc3f238a28abb0fc9.jpg':'Không có watermark cũ; trùng ảnh /media/45184582a780ba8ded03.jpg.',
 '/media/496418a177ae55eb9905.jpg':'Không có watermark cũ.',
 '/media/6956255d87d043b2b4d4.jpg':'Không có watermark cũ.',
 '/media/a1c45a39dffe2d0bdaf7.jpg':'Không có watermark cũ.',
 '/media/7c20061a92c501693de0.jpg':'Không có watermark cũ.',
 '/media/3f80f50c32ab4fc25626.jpg':'Không có watermark cũ.',
 '/media/0854104df152912521a8.jpg':'Không có watermark cũ.',
 '/media/9ac069ffde63232cdf80.jpg':'Không có watermark cũ.',
 '/media/9d0fc3f238a28abb0fc9.jpg':'Không có watermark cũ; trùng ảnh /media/45184582a780ba8ded03.jpg.',
 '/media/496418a177ae55eb9905.jpg':'Không có watermark cũ.',
 '/media/6956255d87d043b2b4d4.jpg':'Không có watermark cũ.',
 '/media/a1c45a39dffe2d0bdaf7.jpg':'Không có watermark cũ.',
 '/media/4be9235eff3d6367890b.jpg':'Không có watermark cũ.',
 '/media/b7d704d1100213001040.jpg':'Không có watermark cũ.',
 '/media/212c83abfa16e01deb76.jpg':'Không có watermark cũ; trùng ảnh /media/d369a42f283b819ec95a.jpg.',
 '/media/1f9be3a23b11137f1d11.jpg':'Không có watermark cũ.',
 '/media/7694a14a3ee71fc3d216.jpg':'Không có watermark cũ.',
 '/media/3752bbb34e5899a13fbd.jpg':'Không có watermark cũ.',
 '/media/d369a42f283b819ec95a.jpg':'Không có watermark cũ.',
 '/media/6a569e9ff1caadfa4b7d.jpg':'Không có watermark cũ.',
 '/media/3adcf00b1bfccd1d4d93.jpg':'Không có watermark cũ.',
 '/media/1c84540b4dd65b5628f0.jpg':'Không có watermark cũ.',
 '/media/42f9a1fbedb75af121a7.jpg':'Không có watermark cũ; trùng ảnh /media/3adcf00b1bfccd1d4d93.jpg.',
 '/media/0b4919bd1523728f0642.jpg':'Không có watermark cũ.',
 '/media/309ce1b0ece6fa608d4d.jpg':'Không có watermark cũ.',
 '/media/42f0a43cb180aa49e331.jpg':'Không có watermark cũ.',
 '/media/dcd592d0a698dee951a1.jpg':'Không có watermark cũ; trùng ảnh /media/5a24f3d3de9ba5db9c85.jpg.',
 '/media/cf557bc725067d27b27f.jpg':'Không có watermark cũ.',
 '/media/61a0886bf55373e5426a.jpg':'Không có watermark cũ.',
 '/media/3cdc8d41347d076dfec1.jpg':'Không có watermark cũ.',
 '/media/ebeebc74f4f9db842206.jpg':'Không có watermark cũ.',
 '/media/5a24f3d3de9ba5db9c85.jpg':'Không có watermark cũ.',
 '/media/2c547267e671eb2a7ae5.jpg':'Không có watermark cũ.',
 '/media/45184582a780ba8ded03.jpg':'Không có watermark cũ.',
 '/media/057b3d9b61371b62ecab.jpg':'Không có watermark cũ.',
 '/media/b6060d7963367968255a.jpg':'Không có watermark cũ.',
 '/media/6e6ab218a7d198706967.jpg':'Không có watermark cũ.',
 '/media/22c93cea9962a55d7111.jpg':'Không có watermark cũ.',
 '/media/19cc55f83332be18574b.jpg':'Không có watermark cũ.',
 '/media/ddf8a4626d1f549b3397.jpg':'Không có watermark cũ.',
 '/media/2ffc3b771eefeaf80628.jpg':'Không có watermark cũ.',
 '/media/27bf2e01f7628e447780.jpg':'Không có watermark cũ.',
 '/media/0343fa46ba969ce3b330.jpg':'Không có watermark cũ.',
 '/media/d0b60168dbe3d1f06a16.jpg':'Không có watermark cũ; trùng ảnh /media/25cc2f7bed6a23147a81.jpg.',
 '/media/a86f467197b2c2e65463.jpg':'Không có watermark cũ.',
 '/media/c76e6dae22f83e4cc1b5.jpg':'Không có watermark cũ.',
 '/media/618bdc7561f6d5a22de8.jpg':'Không có watermark cũ.',
 '/media/fb43f074172631884a84.jpg':'Không có watermark cũ.',
 '/media/25cc2f7bed6a23147a81.jpg':'Không có watermark cũ.',
 '/media/cfb1a37c4a8905e4fda9.jpg':'Không có watermark cũ.',
 '/media/0c3213cbfb8d8b482f80.jpg':'Không có watermark cũ.',
 '/media/cb7bfe6171fcc1688f45.jpg':'Không có watermark cũ.',
 '/media/8406a9f5c0f17af61402.jpg':'Không có watermark cũ.',
 '/media/2c502e20735d77306790.jpg':'Không có watermark cũ.',
 '/media/87a74f07d93885a2e42f.jpg':'Không có watermark cũ.',
 '/media/d9b8b08855b78539f8f6.jpg':'Không có watermark cũ.',
 '/media/a8cf095578999ae54310.jpg':'Không có watermark cũ.',
 '/media/e45e877bca99f0ba648c.jpg':'Không có watermark cũ.',
 '/media/71a61c8136a357299c8d.jpg':'Không có watermark cũ.',
 '/media/68c3cfedb460c0ddeda6.jpg':'Không có watermark cũ.',
 '/media/465eeae8a13284e04e88.jpg':'Không có watermark cũ.',
 '/media/e710523007ea518cd5c3.jpg':'Không có watermark cũ.',
 '/media/d74ad89f73fece1206ac.jpg':'Không có watermark cũ.',
 '/media/19a175112465113adfb0.jpg':'Không có watermark cũ.',
 '/media/e826f2a107f31495c488.jpg':'Không có watermark cũ.',
 '/media/92e4bbf15c4d2855f28f.jpg':'Không có watermark cũ.',
 '/media/a75ba14e16d31cb66565.jpg':'Không có watermark cũ.',
 '/media/70b962d41b5e7858fdca.jpg':'Không có watermark cũ.',
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
 '/media/bab7297e1c7ba56282d5.png':'Logo thương hiệu đối tác, không phải watermark.',
 '/media/e3af61ab44f0b3af0de6.jpg':'Chỉ có thông tin khắc thật trên bảng máy; không có watermark cũ.',
 '/media/8b1a698dc07b89391603.jpg':'Chỉ có mã khắc trực tiếp trên chi tiết; không có watermark cũ.',
 '/media/d970b39bb07654540b1e.jpg':'Chữ khắc trang trí trên ly là nội dung sản phẩm; không có watermark cũ.',
 '/media/a8f41796ee3392a9f82c.jpg':'Thông số khắc trực tiếp trên bảng máy; không có watermark cũ.'
 ,'/media/70b962d41b5e7858fdca.jpg':'Không có watermark cũ; chỉ là ảnh chi tiết in 3D.'
 ,'/media/71c2ca11337fac781b19.jpg':'Ảnh minh hoạ chính sách đổi trả, không có watermark cũ.'
 ,'/media/3d7cfd23e457aae68ca6.jpg':'Ảnh minh hoạ giao nhận, không có watermark cũ.'
 ,'/media/6ad8b1341a3e83f5f0b6.png':'Ảnh minh hoạ thanh toán, không có watermark cũ.'
 ,'/media/45058944ee2993cf9058.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
 ,'/media/07c870fbc0dae2ea03c8.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
 ,'/media/803f311f1a77e0f248bc.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
 ,'/media/479c8c7f98718b8058d9.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
 ,'/media/ce2ccd1071cc894585a5.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
 ,'/media/4e4e95c6f65a5b2a1d44.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
 ,'/media/70934889193ead42788a.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
 ,'/media/afd1a616546a71ceb5a6.jpg':'Ảnh chi tiết nhựa in 3D, không có watermark cũ.'
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
