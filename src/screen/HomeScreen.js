import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { apiClient } from '../api/apiClients';

const HomeScreen = ({ navigation }) => {
    const [aboutContent, setAboutContent] = useState('Đang tải nội dung...');

    // Dữ liệu giả lập cho các bài viết về Bách Khoa
    const articles = [
        {
            id: '1',
            title: 'Đại học Bách khoa Hà Nội công bố phương án tuyển sinh mới',
            summary: 'Nhà trường vừa chính thức công bố phương án tuyển sinh với nhiều điểm mới, đặc biệt chú trọng vào kỳ thi Đánh giá tư duy (TSA).',
            image: require('../../assets/images/articles/anhtuyensinh.jpg'),
        },
        {
            id: '2',
            title: 'Sinh viên HUST xuất sắc giành giải Nhất cuộc thi Sáng tạo',
            summary: 'Đội tuyển của Đại học Bách khoa Hà Nội đã xuất sắc vượt qua nhiều đối thủ mạnh để giành ngôi vô địch tại vòng chung kết toàn quốc.',
            image: require('../../assets/images/articles/giainhat.jpg'),
        },
        {
            id: '3',
            title: 'Khám phá không gian học tập tại Thư viện Tạ Quang Bửu',
            summary: 'Thư viện Tạ Quang Bửu không chỉ lưu trữ hàng triệu đầu sách mà còn là không gian tự học lý tưởng, khơi nguồn sáng tạo cho sinh viên.',
            image: require('../../assets/images/articles/Thư_viện_Tạ_Quang_Bửu_.jpg'),
        }
    ];

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                const response = await apiClient('/admin/content/about', 'GET');
                if (response.success && response.content) {
                    setAboutContent(response.content);
                } else {
                    setAboutContent("Chưa có nội dung giới thiệu.");
                }
            } catch (error) {
                setAboutContent("Lỗi tải nội dung.");
            }
        };

        fetchAboutContent();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Hệ thống Quản lý Điểm Học sinh</Text>

            {/* GIỚI THIỆU VỀ NHÀ TRƯỜNG */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Giới thiệu về nhà trường</Text>
                <Text style={styles.text}>{aboutContent}</Text>
            </View>

            {/* CÁC BÀI VIẾT NỔI BẬT (TIN TỨC BÁCH KHOA) */}
            <View style={styles.articlesSection}>
                <Text style={styles.sectionTitle}>Tin tức & Sự kiện Bách Khoa</Text>
                {articles.map((article) => (
                    <TouchableOpacity key={article.id} style={styles.articleCard}>
                        {/* 
                            Hướng dẫn: Để sử dụng ảnh trong máy, bạn hãy copy ảnh vào thư mục 'assets/images/articles/'
                            Sau đó thay dòng 'source={{ uri: article.image }}' bằng:
                            source={require('../../assets/images/articles/ten_anh_cua_ban.jpg')}
                        */}
                        <Image
                            source={article.image}
                            style={styles.articleImage}
                            resizeMode="cover"
                        />
                        <View style={styles.articleContent}>
                            <Text style={styles.articleTitle}>{article.title}</Text>
                            <Text style={styles.articleSummary} numberOfLines={3}>{article.summary}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ marginTop: 10, marginBottom: 20, width: '100%' }}>
                <CustomButton
                    title="Đăng Nhập"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    text: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        lineHeight: 22,
    },
    articlesSection: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#b22222', // Màu đỏ Bách Khoa
        marginBottom: 15,
        textAlign: 'left',
    },
    articleCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    articleImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#e1e4e8', // Màu nền hiển thị khi ảnh đang tải hoặc lỗi
    },
    articleContent: {
        padding: 15,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    articleSummary: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    }
});

export default HomeScreen;
