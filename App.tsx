import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import DashboardScreen from './src/screen/DashboardScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ title: 'Đăng Nhập' }} 
                />
                <Stack.Screen 
                    name="Dashboard" 
                    component={DashboardScreen} 
                    options={{ title: 'Tổng Quan', headerBackVisible: false }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;