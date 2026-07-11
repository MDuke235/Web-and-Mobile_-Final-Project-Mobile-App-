import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import { apiClient } from '../api/apiClients';

const HomeScreen = ({ navigation }) => {
    const [aboutContent, setAboutContent] = useState('Đang tải nội dung...');

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
    }
});

export default HomeScreen;
