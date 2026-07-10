import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const CustomInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});

export default CustomInput;