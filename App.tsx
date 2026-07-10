import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen';
import DashboardScreen from './src/screen/DashboardScreen';
import ContactScreen from './src/screen/ContactScreen'; // Thêm dòng import này

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Dashboard" 
                    component={DashboardScreen} 
                    options={{ title: 'Tổng Quan', headerBackVisible: false }} 
                />
                {/* Thêm màn hình Contact vào Stack */}
                <Stack.Screen 
                    name="Contact" 
                    component={ContactScreen} 
                    options={{ title: 'Góp ý & Liên hệ' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;