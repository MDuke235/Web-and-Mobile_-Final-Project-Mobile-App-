# Hệ thống Quản lý Học sinh - Mobile App

Đây là ứng dụng di động (Mobile App) thuộc hệ sinh thái "Hệ thống Quản lý Học sinh", được phát triển bằng **React Native**. Ứng dụng cung cấp các tính năng xem điểm, quản lý học sinh và gửi ý kiến phản hồi dành cho 3 phân quyền: Học sinh (User), Giáo viên (Teacher), và Quản trị viên (Admin).

---

## 🌟 Chức năng chính

### 1. Phân quyền Học sinh (User)
*   **Xem thông tin cá nhân**: Hiển thị họ tên, lớp, mã học sinh.
*   **Bảng điểm**: Xem chi tiết điểm quá trình, điểm thi và tổng kết của từng môn học.
*   **Đánh giá & Phản hồi**: Gửi đánh giá (từ 1-5 sao) và bình luận trực tiếp cho hệ thống.

### 2. Phân quyền Giáo viên (Teacher)
*   **Danh sách học sinh**: Xem danh sách toàn bộ học sinh được phân công.
*   **Quản lý điểm số**: Tìm kiếm học sinh, nhập và chỉnh sửa điểm quá trình (hệ số 0.4) và điểm thi cuối kỳ (hệ số 0.6).

### 3. Phân quyền Quản trị viên (Admin)
*   **Quản lý đánh giá**: Xem các bình luận, phản hồi từ học sinh/phụ huynh.
*   **Kiểm duyệt**: Xóa các bình luận không phù hợp trực tiếp trên app (Quản lý toàn diện hơn trên Web).

---

## 🛠 Công nghệ sử dụng

*   **Framework**: [React Native](https://reactnative.dev) (v0.86)
*   **Điều hướng (Navigation)**: `@react-navigation/native` & `@react-navigation/native-stack`
*   **Giao tiếp API**: Sử dụng `fetch` API với JWT Token Authorization.

---

## 📁 Cấu trúc thư mục

```
src/
├── api/             # Chứa apiClients.js (cấu hình fetch API, baseUrl, token)
├── components/      # Các component tái sử dụng (CustomButton, CustomInput...)
└── screen/          # Các màn hình của ứng dụng
    ├── HomeScreen.js       # Màn hình tổng quan ban đầu (chưa đăng nhập)
    ├── LoginScreen.js      # Màn hình Đăng nhập
    └── DashboardScreen.js  # Màn hình chính xử lý logic cho cả 3 role
```

---

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

### Bước 1: Cài đặt Node Modules
Đảm bảo bạn đã cài đặt Node.js và môi trường React Native, sau đó chạy lệnh:
```bash
npm install
```

### Bước 2: Cấu hình API Backend
Mở file `src/api/apiClients.js`.
Sửa hằng số `BASE_URL` thành địa chỉ IP máy chủ Backend (Node.js/Express) của bạn.
> **Lưu ý:** Nếu chạy trên máy ảo Android (Android Emulator) và backend chạy ở `localhost`, hãy sử dụng IP `http://10.0.2.2:3000/api`. Nếu test trên thiết bị thật, hãy dùng địa chỉ IP LAN (VD: `http://192.168.1.X:3000/api`).

### Bước 3: Chạy Metro Bundler
```bash
npm start
```

### Bước 4: Khởi chạy ứng dụng
Mở thêm một terminal mới và chạy lệnh phù hợp với nền tảng của bạn:

**Dành cho Android:**
```bash
npm run android
```


---

## 📝 Lưu ý bổ sung
*   Đảm bảo Server Backend đang chạy và hoạt động trơn tru trước khi tiến hành đăng nhập trên App để tránh lỗi "Không thể kết nối".
