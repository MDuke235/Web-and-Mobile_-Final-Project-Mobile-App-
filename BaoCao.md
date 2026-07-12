# Báo Cáo Tổng Kết Hệ Sinh Thái "Quản Lý Học Sinh" (Web & Mobile)

Hệ thống Quản lý Học sinh là một hệ sinh thái hoàn chỉnh bao gồm Backend (Node.js/Express), nền tảng Web quản trị và ứng dụng Mobile (React Native) dành cho các thiết bị di động.

## 1. Các Chức Năng (Features)

Hệ thống được thiết kế theo kiến trúc Client-Server, đồng bộ dữ liệu xuyên suốt giữa Web và Mobile với các chức năng phân quyền rõ ràng:

* **Quản trị viên (Admin/Superadmin):** Quản lý toàn diện danh sách học sinh, theo dõi thống kê truy cập; xem xét, kiểm duyệt và xóa các bình luận/phản hồi từ người dùng trên cả hệ thống Web và App.
* **Giáo viên (Teacher):** Xem danh sách học sinh được phân công. Tìm kiếm, nhập và chỉnh sửa điểm số (điểm quá trình hệ số 0.4, điểm thi hệ số 0.6) cho từng môn học theo từng học kỳ.
* **Học sinh (Student):** Xem thông tin hồ sơ cá nhân (họ tên, lớp, mã số); xem bảng điểm chi tiết của từng môn học; gửi đánh giá (1-5 sao) và bình luận trực tiếp cho nhà trường thông qua hệ thống.
* **Bảo mật & Đồng bộ:** Cơ chế phân quyền nghiêm ngặt giúp ngăn chặn học sinh xem điểm của nhau. Toàn bộ dữ liệu được quản lý tập trung qua RESTful API, đảm bảo tính nhất quán giữa Web và Mobile.

---

## 2. Mức Độ Hoàn Thiện

* **100%:** Hoàn thành đầy đủ các chức năng theo yêu cầu đề ra cho cả hai nền tảng Web và ứng dụng Mobile. Hệ thống hoạt động trơn tru và các API tương tác ổn định.

---

## 3. Phân Công Nhiệm Vụ Của Từng Thành Viên

Dưới đây là bảng phân công nhiệm vụ đảm bảo khối lượng công việc được chia đều cho các thành viên trong nhóm:

| STT | Họ và Tên | Vai trò / Nhiệm vụ chi tiết | Mức độ đóng góp |
| :--- | :--- | :--- | :--- |
| 1 | Tạ Minh Đức | **Nhóm trưởng:** Khởi tạo cấu trúc server Backend (Node.js/Express), viết các API cốt lõi (như API Auth, thống kê) và xử lý logic bảo mật/phân quyền người dùng. | 33.33% |
| 2 | Nguyễn Lê Trung Hiếu | **Thành viên:** Phát triển API xử lý điểm số và xây dựng giao diện Admin/Giáo viên trên nền tảng Web & Mobile, kiểm thử hệ thống. | 33.33% |
| 3 | Trần Gia Huy | **Thành viên:** Phát triển giao diện cho Học sinh và chức năng Đăng nhập (Web & Mobile), xử lý gọi API đồng bộ dữ liệu và thiết kế cơ sở dữ liệu (MySQL). | 33.33% |

---

## 4. Hướng Dẫn Cài Đặt Và Sử Dụng

### A. Hệ Thống Backend & Web (`school_management`)

**Yêu Cầu:** Node.js (>= 14.x) và MySQL Server.

1.  **Thiết lập Cơ sở dữ liệu:**
    * Mở MySQL, tạo một database có tên `school_management`.
    * Import file dữ liệu mẫu `sample_db.sql` đính kèm trong thư mục dự án.
2.  **Cài đặt thư viện:**
    * Mở terminal tại thư mục `school_management` và chạy lệnh: `npm install`.
3.  **Cấu hình môi trường:**
    * Tạo hoặc chỉnh sửa file `.env` ở thư mục gốc với nội dung cấu hình kết nối:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=Mật_Khẩu_SQL
    DB_NAME=school_management
    ```
4.  **Khởi động Server Backend:**
    * Chạy lệnh: `node server.js`
    * Truy cập nền tảng Web tại địa chỉ: **http://localhost:3000**

### B. Ứng Dụng Mobile (`GradeManagementApp`)

**Yêu Cầu:** Node.js (>= 22.11.0) và Môi trường React Native (0.86.0).

1.  **Cài đặt thư viện:**
    * Mở terminal tại thư mục `GradeManagementApp` và chạy lệnh: `npm install`.
2.  **Cấu hình API Backend:**
    * Mở file `src/api/apiClients.js`.
    * Thay đổi hằng số `BASE_URL` thành địa chỉ IP máy chủ Backend của bạn.
        * *Máy ảo Android (Emulator)*: Dùng IP `http://10.0.2.2:3000/api`
    * *Lưu ý: Đảm bảo Server Backend (phần A) đang chạy trước khi đăng nhập.*
3.  **Khởi chạy ứng dụng:**
    * Khởi động Metro Bundler bằng lệnh: `npm start`
    * Mở thêm một terminal mới và chạy lệnh cho Android: `npm run android`

### C. Tài Khoản Sử Dụng Mẫu (Chung cho Web & Mobile)

* **Giáo vụ (Giáo viên):** `admin_giaovu` / `123456`
* **Quản trị viên (Superadmin):** `superadmin` / `123456`
* **Học sinh (Student):** `20233839` / `123456`