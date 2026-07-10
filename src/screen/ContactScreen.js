import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const ContactScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSendContact = () => {
        if (!name || !email || !message) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tên, email và nội dung liên hệ!');
            return;
        }

        // Mô phỏng việc gửi thành công giống như trên Website
        Alert.alert(
            'Thành công', 
            'Cảm ơn bạn! Ý kiến của bạn đã được gửi đến ban quản trị nhà trường.',
            [{ text: 'OK', onPress: () => navigation.goBack() }] // Bấm OK sẽ quay về trang trước
        );

        // Reset form
        setName('');
        setEmail('');
        setTitle('');
        setMessage('');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>Liên Hệ Với Nhà Trường</Text>
                <Text style={styles.subtitle}>
                    Mọi thắc mắc, đóng góp ý kiến hoặc báo cáo lỗi hệ thống, vui lòng gửi qua biểu mẫu dưới đây.
                </Text>
            </View>

            <View style={styles.formContainer}>
                <CustomInput 
                    label="Họ và tên (*)" 
                    placeholder="Nhập họ và tên..." 
                    value={name} 
                    onChangeText={setName} 
                />
                <CustomInput 
                    label="Email liên hệ (*)" 
                    placeholder="Nhập địa chỉ email..." 
                    value={email} 
                    onChangeText={setEmail} 
                />
                <CustomInput 
                    label="Tiêu đề" 
                    placeholder="Nhập tiêu đề..." 
                    value={title} 
                    onChangeText={setTitle} 
                />
                {/* Dùng CustomInput cho nội dung, có thể truyền thêm style để ô nhập to hơn nếu muốn, 
                    nhưng dùng mặc định vẫn đảm bảo tính thống nhất UI */}
                <CustomInput 
                    label="Nội dung (*)" 
                    placeholder="Nhập nội dung chi tiết..." 
                    value={message} 
                    onChangeText={setMessage} 
                />

                <View style={{ marginTop: 10 }}>
                    <CustomButton title="Gửi Ý Kiến" onPress={handleSendContact} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        textAlign: 'center',
        lineHeight: 22,
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    }
});

export default ContactScreen;