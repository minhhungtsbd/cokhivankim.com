# Kiểm tra bản đầu tiên

- Build: 170 trang HTML, 1.381 file đầu ra.
- `node scripts/check.mjs`: không có liên kết hoặc tài nguyên nội bộ bị thiếu; không có file vượt 25 MiB.
- Trang chủ: đã xem trên trình duyệt ở màn hình rộng và trong khung điện thoại 390px; menu điện thoại mở được.
- Tìm kiếm: đã nhập và gửi “cắt laser”, kết quả xuất hiện; tìm kiếm chạy với dữ liệu JSON trong website.
- Chi tiết sản phẩm phay CNC: ảnh hiển thị và mở được hộp ảnh phóng lớn.
- Không có form nhận thông tin, tải file, chọn ngôn ngữ, script analytics của website nguồn hoặc PHP.
- Có 1 ảnh nội dung không tải được vì nguồn trả HTTP 404, hiển thị ảnh thay thế có thông báo. Các tài nguyên 404 còn lại là font/ảnh trang trí cũ; build loại bỏ tham chiếu lỗi.
- Kiểm tra tự động bao phủ tất cả trang; kiểm tra trực quan thực hiện trên các trang đại diện, chưa so ảnh từng trang với nguồn.
- Triển khai Cloudflare và kiểm tra tên miền thực tế do chủ repository thực hiện sau khi kết nối Pages với GitHub.
