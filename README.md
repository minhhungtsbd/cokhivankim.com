# cokhivankim.com

## Cập nhật thương hiệu Vạn Kim

Bản xuất bản hiện dùng **Cơ Khí Vạn Kim / Hộ Kinh Doanh Vạn Kim**, logo VK dạng SVG và màu navy–cam. Thông tin liên hệ được quản lý trong `site.config.json` → `contact`; chuyển đổi nội dung tại `scripts/brand.mjs`, giao diện tại `public/static/vankim.css`. Dữ liệu nhập ban đầu được giữ trong `content/` làm nguồn; build thay thương hiệu và thông tin trước khi xuất bản. Không nhập lại website nguồn để cập nhật thông tin doanh nghiệp.

MST chưa xác nhận được ẩn. Facebook/TikTok, liên kết hệ thống và chứng nhận của đơn vị cũ được bỏ; PDF hồ sơ cũ không được xuất vào `dist`. Tuyển dụng thông báo tạm ngưng. Ảnh tư liệu cũ vẫn được giữ và có chú thích nguồn; chưa có ảnh riêng Vạn Kim. Giấy đăng ký và các dữ liệu cá nhân trong ảnh không được đưa vào repository.

Build và kiểm tra liên kết đã qua; bộ màu mới chưa được kiểm tra trực quan do công cụ trình duyệt bị tắt ở lần cập nhật này.

Website tĩnh tiếng Việt cho Cơ Khí Vạn Kim. HTML, CSS, ảnh và font nằm trong repository. Không có WordPress, PHP, SQL, form gửi dữ liệu, tải bản vẽ, đa ngôn ngữ hoặc analytics.

## Chạy trên máy

Cài Node.js 24 và pnpm 11.25.0, sau đó:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm check
pnpm dev
```

Mở http://127.0.0.1:4173. Node.js chỉ được dùng lúc build; Cloudflare phục vụ các file tĩnh trong `dist/`.

## Cloudflare Pages — kết nối GitHub

Trong Cloudflare, tạo dự án **Pages** và kết nối repository `minhhungtsbd/cokhivankim.com`.

| Thiết lập | Giá trị |
|---|---|
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `pnpm run build && pnpm run check` |
| Build output directory | `dist` |
| Root directory | Để trống (gốc repository) |
| Node version | `24` (đã có `.node-version`) |
| PNPM_VERSION nếu cần đặt riêng | `11.25.0` |

Sau khi deploy thành công, Cloudflare cấp một URL `*.pages.dev`. Thêm `cokhivankim.com` trong Custom domains nếu muốn dùng tên miền riêng. Không dùng kiểu dự án Worker có lệnh deploy mặc định; đây là **Pages** với Git integration. Những lần push tiếp theo vào `main` sẽ tự build lại. Tham khảo: https://developers.cloudflare.com/pages/configuration/git-integration/

## Chỉnh nội dung

- `content/manifest.json`: danh sách URL, tiêu đề, mô tả và tên file nội dung tương ứng; tìm theo URL/tiêu đề để xác định file.
- `content/pages/*.html`: nội dung HTML có thể chỉnh sửa trực tiếp, không cần website nguồn chạy.
- `public/media/`: ảnh, font, CSS đã tải; tên theo hash để không trùng file.
- `public/static/site.js`: menu điện thoại, tìm kiếm tiếng Việt không phân biệt dấu, xem ảnh sản phẩm và chọn bản đồ.
- `public/static/site.css`: các điều chỉnh giao diện dùng chung.
- `site.config.json`: tên miền canonical và sitemap.
- `scripts/build.mjs`: build sạch từ dữ liệu nội bộ, tạo tìm kiếm, sitemap và trang 404.
- `scripts/check.mjs`: kiểm tra liên kết, ảnh, CSS, giới hạn kích thước file và phần tử động không được phép.

Để thêm bài, thêm file HTML vào `content/pages/` và một bản ghi `source`, `route`, `file`, `title`, `description` vào `manifest.pages`; thêm liên kết từ trang danh mục tương ứng. Chạy build/check rồi commit. Không chỉnh `dist/` vì thư mục này được tạo lại khi build.

## Phạm vi bản đầu tiên

- 168 URL nội dung được phát hiện từ sitemap và các liên kết nội bộ, có cả phân trang và một số URL tương đương; không phải 168 bài viết độc lập.
- Thêm trang tìm kiếm tĩnh và trang 404, tổng cộng 170 HTML.
- Nội dung xuất bản dùng thương hiệu, hotline, Zalo, email và địa chỉ của Cơ Khí Vạn Kim.
- Bộ import ghi nhận 68 tài nguyên nguồn trả HTTP 404: 1 ảnh nội dung, phần còn lại là font/ảnh trang trí cũ trong CSS. Build bỏ tham chiếu trang trí lỗi; ảnh nội dung thiếu được hiển thị bằng khung “Hình ảnh đang được cập nhật”. Chi tiết trong `content/manifest.json` → `failures`.
- Các liên kết Zalo, gọi điện, mạng xã hội, bản đồ và video nhúng vẫn mở dịch vụ bên ngoài. Nội dung trang, ảnh tải được, CSS/font không cần máy chủ cũ.
- `scripts/import.mjs` chỉ là công cụ thu thập một lần. **Không chạy lại sau khi đã sửa nội dung** trừ khi chủ động muốn nhập lại từ nguồn; build thông thường không chạy importer.
- Thư mục `.cache`, `node_modules`, `dist` và các file bí mật không được commit.

## Xác minh

`pnpm check` kiểm tra toàn bộ HTML/CSS xuất ra. Cần kiểm tra trực quan những thay đổi giao diện trước khi xuất bản. `public/_headers` áp dụng security headers tại Cloudflare; máy chủ xem thử chỉ dùng để kiểm tra cục bộ.
