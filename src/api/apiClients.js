// Thay URL này bằng địa chỉ IP máy chủ backend Node.js/Express của bạn
// Lưu ý: Đối với Android emulator, localhost thường là 10.0.2.2
const BASE_URL = 'http://10.0.2.2:3000/api'; 

export const apiClient = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // Nếu có token đăng nhập, gán vào header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Có lỗi xảy ra khi kết nối API');
        }

        return data;
    } catch (error) {
        console.error(`Lỗi API tại ${endpoint}:`, error);
        throw error;
    }
};