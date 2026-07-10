import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { apiClient } from '../api/apiClients'; // Import file bạn vừa tạo

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Kiểm tra xem đã nhập đủ thông tin chưa
        if (!username || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
            return;
        }

        try {
            const response = await apiClient('/login', 'POST', {
                username: username,
                password: password,
            });

            // Kiểm tra cờ success từ backend
            if (response.success) {
                // Đăng nhập thành công
                Alert.alert('Thành công', 'Đăng nhập thành công!');
                
                // Chuyển sang Dashboard VÀ truyền dữ liệu user đi kèm
                navigation.navigate('Dashboard', { user: response.user });
            } else {
                // Đăng nhập thất bại (Sai tài khoản/mật khẩu)
                // Hiển thị đúng câu báo lỗi từ backend trả về
                Alert.alert('Đăng nhập thất bại', response.message);
            }
            
        } catch (error) {
            // Lỗi mạng hoặc lỗi server (500)
            Alert.alert('Lỗi kết nối', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Quản Lý Điểm</Text>
                
                <CustomInput
                    label="Tài khoản / Mã học sinh"
                    placeholder="Nhập mã học sinh..."
                    value={username}
                    onChangeText={setUsername}
                />
                
                <CustomInput
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} // Ẩn mật khẩu bằng dấu chấm
                />
                
                <CustomButton title="Đăng nhập" onPress={handleLogin} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    formContainer: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3, // Tạo đổ bóng cho Android
        shadowColor: '#000', // Tạo đổ bóng cho iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#007BFF',
    },
});

export default LoginScreen;