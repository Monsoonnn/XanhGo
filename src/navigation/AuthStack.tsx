import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUp';
import OTPScreen from '../screens/OTP';
import LoadingScreen from '../screens/Loading';
import SetGoalScreen from '../screens/SetGoal';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#FAFDF3' },
                headerTintColor: '#333',
            }}
        >
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} options={({ navigation }) => ({
                headerShown: true,
                title: 'Xác thực mã OTP',
                headerTitleStyle: { fontFamily: 'Montserrat-Bold', fontSize: 18 },
                headerShadowVisible: false,
                headerLeft: () => (
                    <Ionicons
                        name="chevron-back-outline"
                        size={28}
                        color="#000"
                        style={{ marginLeft: 12 }}
                        onPress={() => navigation.goBack()}
                    />
                ),
            })} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetGoalScreen" component={SetGoalScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
