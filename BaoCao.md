# Báo Cáo Tổng Kết Dự Án Hệ Thống Quản Lý Học Sinh (Mobile App)

## 1. Các Chức Năng (Features)
- **Quản trị viên (Admin):** Xem các bình luận, phản hồi từ học sinh/phụ huynh và quản lý đánh giá; kiểm duyệt, xóa các bình luận không phù hợp trực tiếp trên app.
- **Giáo viên (Teacher):** Xem danh sách toàn bộ học sinh được phân công, tìm kiếm học sinh; nhập và chỉnh sửa điểm quá trình (hệ số 0.4) cùng điểm thi cuối kỳ (hệ số 0.6).
- **Học sinh (User):** Xem thông tin cá nhân bao gồm họ tên, lớp, mã học sinh; xem bảng điểm chi tiết của từng môn học; gửi đánh giá (1-5 sao) và bình luận trực tiếp cho hệ thống.

## 2. Mức Độ Hoàn Thiện
- **100%** (Hoàn thành đầy đủ các chức năng theo yêu cầu đề ra).

## 3. Phân Công Nhiệm Vụ Của Từng Thành Viên

| STT | Họ và Tên | Vai trò / Nhiệm vụ chi tiết | Mức độ đóng góp |
|:---:|---|---|:---:|
| 1 | **Tạ Minh Đức** | **Nhóm trưởng**: Thiết kế cơ sở dữ liệu, phát triển hệ thống Backend (Node.js/Express), viết API cốt lõi, tích hợp Frontend-Backend, xử lý logic phân quyền và đóng góp vào định hình cấu trúc mã nguồn. | 33.33% |
| 2 | **Nguyễn Lê Trung Hiếu** | **Thành viên**: Phát triển giao diện cho trang Quản trị viên và Giáo viên, xử lý gọi API hiển thị dữ liệu và cập nhật điểm số. | 33.33% |
| 3 | **Trần Gia Huy** | **Thành viên**: Phát triển giao diện cho trang Học sinh, trang Đăng nhập, thực hiện kiểm thử hệ thống (Testing) và rà soát lỗi giao diện. | 33.33% |

## 4. Hướng Dẫn Cài Đặt Và Sử Dụng

### Yêu Cầu Hệ Thống
- **Node.js** (Phiên bản >= 22.11.0).
- **Môi trường React Native** (Phiên bản 0.86.0).

### Cài Đặt Và Chạy Ứng Dụng
1. **Cài đặt thư viện:**
   - Mở terminal tại thư mục gốc của dự án và chạy lệnh: `npm install`.
2. **Cấu hình API Backend:**
   - Mở file `src/api/apiClients.js`.
   - Sửa hằng số `BASE_URL` thành địa chỉ IP máy chủ Backend (Node.js/Express) của bạn.
   - Nếu chạy trên máy ảo Android (Android Emulator) và backend chạy ở localhost, hãy sử dụng IP `http://10.0.2.2:3000/api`. Nếu test trên thiết bị thật, sử dụng địa chỉ IP LAN (Ví dụ: `http://192.168.1.X:3000/api`).
   - Đảm bảo Server Backend đang chạy và hoạt động trơn tru trước khi tiến hành đăng nhập trên App để tránh lỗi kết nối.
3. **Khởi động Metro Bundler:**
   - Chạy lệnh: `npm start`.
4. **Khởi chạy ứng dụng:**
   - Mở thêm một terminal mới và chạy lệnh dành cho nền tảng Android: `npm run android`.

### Tài Khoản Sử Dụng Mẫu:
- Giáo vụ (Admin): `admin_giaovu` / `123456`.
- Học sinh (Student): `20233839` / `123456`.