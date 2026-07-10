import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF', // Màu xanh lam chuyên nghiệp
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;