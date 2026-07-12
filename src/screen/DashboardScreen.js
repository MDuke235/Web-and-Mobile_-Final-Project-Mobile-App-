import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput'; // Import thêm CustomInput
import { apiClient } from '../api/apiClients';

const DashboardScreen = ({ route, navigation }) => {
    const { user } = route.params || {};

    const [studentInfo, setStudentInfo] = useState(null);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminComments, setAdminComments] = useState([]);

    // --- CÁC STATE CHO GIÁO VIÊN ---
    const [teacherStudents, setTeacherStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentForGrade, setSelectedStudentForGrade] = useState(null);
    const [gradeForm, setGradeForm] = useState({ subject_name: '', semester: '', process_score: '', final_score: '' });
    const [modalVisible, setModalVisible] = useState(false);

    // --- CÁC STATE CHO FORM BÌNH LUẬN ---
    const [reviewerName, setReviewerName] = useState(user?.full_name || '');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await apiClient(`/student/${user.username}`, 'GET');
                if (response.success) {
                    setStudentInfo(response.data.info);
                    setGrades(response.data.grades);
                    // Tự động điền tên người đánh giá nếu có
                    if (response.data.info?.full_name) {
                        setReviewerName(response.data.info.full_name);
                    }
                } else {
                    Alert.alert('Thông báo', 'Không tìm thấy dữ liệu học sinh');
                }
            } catch (error) {
                Alert.alert('Lỗi kết nối', error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchAdminComments = async () => {
            try {
                const response = await apiClient('/admin/comments', 'GET');
                if (response.success && response.data) {
                    setAdminComments(response.data);
                }
            } catch (error) {
                console.log("Lỗi tải bình luận:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTeacherStudents = async () => {
            try {
                const response = await apiClient('/admin/students', 'GET');
                if (response.success && response.data) {
                    setTeacherStudents(response.data);
                }
            } catch (error) {
                console.log("Lỗi tải danh sách học sinh:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'user') {
            fetchStudentData();
        } else if (user && user.role === 'admin') {
            fetchAdminComments();
        } else if (user && user.role === 'teacher') {
            fetchTeacherStudents();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleDeleteComment = async (commentId) => {
        if (!commentId) {
            Alert.alert('Lỗi', 'Không tìm thấy ID bình luận.');
            return;
        }
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa bình luận này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: async () => {
                    try {
                        const response = await apiClient(`/admin/comments/${commentId}`, 'DELETE');
                        if (response.success) {
                            setAdminComments(prev => prev.filter(c => c.id !== commentId));
                            Alert.alert('Thành công', 'Đã xóa bình luận');
                        } else {
                            Alert.alert('Lỗi', response.message || 'Không thể xóa bình luận');
                        }
                    } catch (error) {
                        Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
                    }
                }
            }
        ]);
    };

    // --- HÀM XỬ LÝ LƯU ĐIỂM (CHO GIÁO VIÊN) ---
    const handleSaveGrade = async () => {
        if (!selectedStudentForGrade) return;
        const { subject_name, semester, process_score, final_score } = gradeForm;
        if (!subject_name || !semester || !process_score || !final_score) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin điểm số!');
            return;
        }

        const pScore = parseFloat(process_score);
        const fScore = parseFloat(final_score);

        if (isNaN(pScore) || isNaN(fScore) || pScore < 0 || pScore > 10 || fScore < 0 || fScore > 10) {
            Alert.alert('Lỗi', 'Điểm số phải là số từ 0 đến 10!');
            return;
        }

        try {
            const response = await apiClient('/admin/grades', 'POST', {
                student_id: selectedStudentForGrade.student_id,
                subject_name,
                semester,
                process_score: pScore,
                final_score: fScore
            });

            if (response.success) {
                Alert.alert('Thành công', 'Đã cập nhật điểm thành công!');
                setModalVisible(false);
                // Gọi lại API để tải điểm mới ngay lập tức (cần refetch bằng cách lấy lại list)
                const fetchRes = await apiClient('/admin/students', 'GET');
                if (fetchRes.success && fetchRes.data) {
                    setTeacherStudents(fetchRes.data);
                }
            } else {
                Alert.alert('Lỗi', response.message || 'Không thể cập nhật điểm');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Lỗi kết nối khi cập nhật điểm');
        }
    };

    // --- HÀM XỬ LÝ GỬI BÌNH LUẬN ---
    const handleSubmitComment = async () => {
        if (!reviewerName || !content || !rating) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên, điểm đánh giá và nội dung!');
            return;
        }

        // Kiểm tra điểm đánh giá hợp lệ (1-5)
        const numericRating = parseInt(rating);
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            Alert.alert('Lỗi', 'Điểm đánh giá phải là số từ 1 đến 5!');
            return;
        }

        try {
            const response = await apiClient('/comments', 'POST', {
                student_id: user.username,
                reviewer_name: reviewerName,
                email: email,
                rating: numericRating,
                content: content
            });

            if (response.success) {
                Alert.alert('Thành công', 'Cảm ơn bạn đã gửi đánh giá!');
                // Xoá form sau khi gửi thành công
                setContent('');
                setRating('');
            } else {
                Alert.alert('Lỗi', response.message || 'Không thể gửi bình luận');
            }
        } catch (error) {
            Alert.alert('Lỗi kết nối', 'Không thể gửi bình luận đến máy chủ');
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={{ marginTop: 10 }}>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>
                {user?.role === 'admin' || user?.role === 'superadmin'
                    ? 'Admin quản trị'
                    : user?.role === 'teacher'
                        ? 'Giáo viên quản lý'
                        : 'Bảng Điểm Học Sinh'}
            </Text>

            {/* 1. THÔNG TIN CÁ NHÂN */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Thông tin học sinh</Text>
                {user?.role === 'user' ? (
                    studentInfo ? (
                        <>
                            <Text style={styles.text}>Họ và tên: <Text style={styles.boldText}>{studentInfo.full_name}</Text></Text>
                            <Text style={styles.text}>Lớp: <Text style={styles.boldText}>{studentInfo.class_name}</Text></Text>
                            <Text style={styles.text}>Mã HS: <Text style={styles.boldText}>{studentInfo.student_id}</Text></Text>
                        </>
                    ) : (
                        <Text style={styles.text}>Đang chờ dữ liệu từ máy chủ...</Text>
                    )
                ) : (
                    <Text style={styles.text}>
                        {user?.role === 'admin'
                            ? 'Bạn là Quản trị viên, vui lòng dùng Website để quản lý toàn diện.'
                            : 'Xin chào, Giáo viên. Quản lý thông tin học sinh ở bên dưới.'}
                    </Text>
                )}
            </View>

            {/* 2. DANH SÁCH ĐIỂM SỐ */}
            {user?.role === 'user' && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Chi tiết các môn học</Text>
                    {grades.length === 0 ? (
                        <Text style={styles.text}>Chưa có điểm cập nhật.</Text>
                    ) : (
                        grades.map((item, index) => {
                            const total = (parseFloat(item.process_score) * 0.4 + parseFloat(item.final_score) * 0.6).toFixed(2);
                            return (
                                <View key={index.toString()} style={styles.gradeItem}>
                                    <View style={styles.gradeHeader}>
                                        <Text style={styles.subjectName}>{item.subject_name}</Text>
                                        <Text style={styles.semester}>{item.semester}</Text>
                                    </View>
                                    <View style={styles.scoreRow}>
                                        <Text>Điểm QT: <Text style={styles.boldText}>{item.process_score}</Text></Text>
                                        <Text>Điểm Thi: <Text style={styles.boldText}>{item.final_score}</Text></Text>
                                    </View>
                                    <View style={styles.totalRow}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tổng kết: {total}</Text>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </View>
            )}

            {/* 3. FORM BÌNH LUẬN & ĐÁNH GIÁ (MỚI THÊM) */}
            {user?.role === 'user' && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Đánh giá & Phản hồi</Text>
                    <Text style={{ marginBottom: 15, color: '#666', fontStyle: 'italic' }}>
                        Gửi thắc mắc về điểm số hoặc đánh giá mức độ hài lòng về bài giảng.
                    </Text>

                    <CustomInput
                        label="Tên của bạn"
                        placeholder="Nhập tên..."
                        value={reviewerName}
                        onChangeText={setReviewerName}
                    />
                    <CustomInput
                        label="Email (Tuỳ chọn)"
                        placeholder="Nhập email liên hệ..."
                        value={email}
                        onChangeText={setEmail}
                    />
                    <CustomInput
                        label="Điểm đánh giá (Từ 1 đến 5)"
                        placeholder="Ví dụ: 5"
                        value={rating}
                        onChangeText={setRating}
                    />
                    <CustomInput
                        label="Nội dung"
                        placeholder="Nhập bình luận của bạn..."
                        value={content}
                        onChangeText={setContent}
                    />

                    <CustomButton title="Gửi Đánh Giá" onPress={handleSubmitComment} />
                </View>
            )}

            {/* 4. QUẢN LÝ BÌNH LUẬN (CHỈ DÀNH CHO ADMIN) */}
            {user?.role === 'admin' && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Quản lý Đánh giá & Phản hồi</Text>
                    {adminComments.length === 0 ? (
                        <Text style={styles.text}>Chưa có đánh giá nào.</Text>
                    ) : (
                        adminComments.map((comment, index) => (
                            <View key={comment.id || index.toString()} style={styles.gradeItem}>
                                <Text style={styles.boldText}>Người gửi: {comment.reviewer_name || 'Người dùng'}</Text>
                                <Text style={styles.text}>Mã HS: <Text style={styles.boldText}>{comment.student_id}</Text></Text>
                                <Text style={styles.text}>Điểm đánh giá: <Text style={styles.boldText}>{comment.rating}/5</Text></Text>
                                <Text style={styles.text}>Nội dung: {comment.content}</Text>
                                <View style={{ marginTop: 10 }}>
                                    <CustomButton title="Xoá bình luận" onPress={() => handleDeleteComment(comment.id)} />
                                </View>
                            </View>
                        ))
                    )}
                </View>
            )}

            {/* 5. GIAO DIỆN GIÁO VIÊN (QUẢN LÝ HỌC SINH & ĐIỂM) */}
            {user?.role === 'teacher' && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Danh sách học sinh</Text>

                    <CustomInput
                        label=""
                        placeholder="Tìm kiếm theo tên hoặc mã HS..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {teacherStudents
                        .filter(s => s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || s.student_id.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((student, index) => (
                            <View key={index.toString()} style={styles.gradeItem}>
                                <Text style={styles.boldText}>{student.full_name} ({student.class_name})</Text>
                                <Text style={styles.text}>Mã HS: <Text style={styles.boldText}>{student.student_id}</Text></Text>
                                {student.subject_name ? (
                                    <View style={{ marginTop: 5, padding: 8, backgroundColor: '#eee', borderRadius: 5 }}>
                                        <Text>Môn: <Text style={styles.boldText}>{student.subject_name}</Text> - HK: {student.semester}</Text>
                                        <Text>Điểm QT: {student.process_score} | Điểm Thi: {student.final_score}</Text>
                                    </View>
                                ) : (
                                    <Text style={[styles.text, { fontStyle: 'italic', color: '#888', marginTop: 5 }]}>Chưa có điểm</Text>
                                )}
                                <View style={{ marginTop: 10 }}>
                                    <CustomButton
                                        title="Nhập / Sửa điểm"
                                        onPress={() => {
                                            setSelectedStudentForGrade(student);
                                            setGradeForm({
                                                subject_name: student.subject_name || '',
                                                semester: student.semester || '',
                                                process_score: student.process_score !== null && student.process_score !== undefined ? student.process_score.toString() : '',
                                                final_score: student.final_score !== null && student.final_score !== undefined ? student.final_score.toString() : ''
                                            });
                                            setModalVisible(true);
                                        }}
                                    />
                                </View>
                            </View>
                        ))
                    }
                </View>
            )}

            {/* Modal Nhập Điểm */}
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.cardTitle}>Nhập / Sửa điểm cho {selectedStudentForGrade?.full_name}</Text>

                        <CustomInput
                            label="Tên môn học"
                            placeholder="Ví dụ: Toán, Ngữ Văn..."
                            value={gradeForm.subject_name}
                            onChangeText={(text) => setGradeForm({ ...gradeForm, subject_name: text })}
                        />
                        <CustomInput
                            label="Học kỳ"
                            placeholder="Ví dụ: HK1, HK2..."
                            value={gradeForm.semester}
                            onChangeText={(text) => setGradeForm({ ...gradeForm, semester: text })}
                        />
                        <CustomInput
                            label="Điểm quá trình (Hệ số 0.4)"
                            placeholder="0 - 10"
                            value={gradeForm.process_score}
                            onChangeText={(text) => setGradeForm({ ...gradeForm, process_score: text })}
                        />
                        <CustomInput
                            label="Điểm thi cuối kỳ (Hệ số 0.6)"
                            placeholder="0 - 10"
                            value={gradeForm.final_score}
                            onChangeText={(text) => setGradeForm({ ...gradeForm, final_score: text })}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                            <View style={{ flex: 1, marginRight: 5 }}>
                                <CustomButton title="Hủy" onPress={() => setModalVisible(false)} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 5 }}>
                                <CustomButton title="Lưu" onPress={handleSaveGrade} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* NÚT ĐĂNG XUẤT */}
            <View style={{ marginTop: 10, marginBottom: 30, width: '100%' }}>
                <CustomButton
                    title="Đăng xuất"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </ScrollView>
    );
};

// ... (Giữ nguyên phần styles StyleSheet.create như cũ) ...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 20,
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
    },
    boldText: {
        fontWeight: 'bold',
        color: '#222',
    },
    gradeItem: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    gradeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d9534f',
    },
    semester: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalRow: {
        backgroundColor: '#5cb85c',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    }
});

export default DashboardScreen;