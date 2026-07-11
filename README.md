# GradeManagementApp - Hệ thống Quản lý Học sinh

Đây là ứng dụng di động thuộc hệ sinh thái "Hệ thống Quản lý Học sinh", được phát triển bằng React Native[cite: 2]. Tên chính thức của dự án được cấu hình là GradeManagementApp[cite: 1]. Ứng dụng cung cấp các tính năng xem điểm, quản lý học sinh và gửi ý kiến phản hồi dành cho 3 phân quyền: Học sinh (User), Giáo viên (Teacher), và Quản trị viên (Admin)[cite: 2].

---

## 🌟 Chức năng chính

### 1. Phân quyền Học sinh (User)
*   **Xem thông tin cá nhân**: Hiển thị họ tên, lớp, mã học sinh[cite: 2].
*   **Bảng điểm**: Xem chi tiết điểm quá trình, điểm thi và tổng kết của từng môn học[cite: 2].
*   **Đánh giá & Phản hồi**: Gửi đánh giá (từ 1-5 sao) và bình luận trực tiếp cho hệ thống[cite: 2].

### 2. Phân quyền Giáo viên (Teacher)
*   **Danh sách học sinh**: Xem danh sách toàn bộ học sinh được phân công[cite: 2].
*   **Quản lý điểm số**: Tìm kiếm học sinh, nhập và chỉnh sửa điểm quá trình (hệ số 0.4) và điểm thi cuối kỳ (hệ số 0.6)[cite: 2].

### 3. Phân quyền Quản trị viên (Admin)
*   **Quản lý đánh giá**: Xem các bình luận, phản hồi từ học sinh/phụ huynh[cite: 2].
*   **Kiểm duyệt**: Xóa các bình luận không phù hợp trực tiếp trên app (Quản lý toàn diện hơn trên Web)[cite: 2].

---

## 🛠 Công nghệ sử dụng

*   **Framework**: Sử dụng thư viện React phiên bản 19.2.3 và React Native phiên bản 0.86.0[cite: 1, 2].
*   **Điều hướng (Navigation)**: Tích hợp thư viện `@react-navigation/native` (phiên bản 7.3.3) và `@react-navigation/native-stack` (phiên bản 7.17.5)[cite: 1, 2].
*   **Giao tiếp API**: Sử dụng `fetch` API kết hợp với JWT Token Authorization[cite: 2].

---

## 📁 Cấu trúc thư mục và Màn hình

Cấu trúc thư mục chính của dự án bao gồm:
*   **`src/api/`**: Chứa file `apiClients.js` để cấu hình fetch API, baseUrl và token[cite: 2].
*   **`src/components/`**: Chứa các component có thể tái sử dụng như CustomButton, CustomInput[cite: 2].
*   **`src/screen/`**: Chứa các màn hình giao diện của ứng dụng[cite: 2].

Các màn hình được định tuyến trong file `App.tsx` bao gồm[cite: 1]:
*   **`HomeScreen`**: Màn hình tổng quan ban đầu khi người dùng chưa đăng nhập[cite: 1, 2].
*   **`LoginScreen`**: Màn hình Đăng nhập[cite: 1, 2].
*   **`DashboardScreen`**: Màn hình Tổng Quan xử lý logic cho cả 3 phân quyền[cite: 1, 2].

---

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

### Bước 1: Cài đặt Node Modules
Đảm bảo bạn đã cài đặt Node.js (hỗ trợ từ phiên bản 22.11.0 trở lên) và môi trường phát triển React Native[cite: 1, 2]. 
*   Chạy lệnh `npm install` để cài đặt các package cần thiết[cite: 2].

### Bước 2: Cấu hình API Backend
*   Mở file `src/api/apiClients.js`[cite: 2].
*   Sửa hằng số `BASE_URL` thành địa chỉ IP máy chủ Backend (Node.js/Express) của bạn[cite: 2].
*   **Lưu ý**: Nếu chạy trên máy ảo Android (Android Emulator) và backend chạy ở `localhost`, hãy sử dụng IP `http://10.0.2.2:3000/api`[cite: 2].
*   **Lưu ý**: Nếu test trên thiết bị thật, hãy dùng địa chỉ IP mạng LAN (Ví dụ: `http://192.168.1.X:3000/api`)[cite: 2].

### Bước 3: Chạy Metro Bundler
*   Khởi động bộ đóng gói bằng lệnh `npm start`[cite: 2].

### Bước 4: Khởi chạy ứng dụng
*   Mở thêm một terminal mới và chạy lệnh `npm run android` để khởi chạy ứng dụng trên hệ điều hành Android[cite: 2].

---

## 📝 Lưu ý bổ sung

*   Đảm bảo Server Backend đang chạy và hoạt động trơn tru trước khi tiến hành đăng nhập trên App để tránh lỗi "Không thể kết nối"[cite: 2].
*   Được khuyến nghị không lưu trữ hình ảnh (screenshots) trực tiếp vào thư mục git (`fastlane/screenshots`) mà nên sử dụng `fastlane` để tạo lại mỗi khi cần thiết[cite: 1].