import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUp';
import OTPScreen from '../screens/OTP';
import LoadingScreen from '../screens/Loading';
import SetGoalScreen from '../screens/SetGoal';
import Calendar from '../components/Calendar';
import UserScreen from '../screens/User';
import SettingsScreen from '../screens/settings';
import BankingAccountScreen from '../screens/BankingAccount';

const Stack = createNativeStackNavigator();

const UserSettings = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BankingAccount" component={BankingAccountScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default UserSettings
