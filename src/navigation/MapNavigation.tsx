import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MultiStageRouting from '../screens/Map';
import OpenStreetMapRouting from '../screens/Map';


const Stack = createNativeStackNavigator();

const MapNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Map" component={MultiStageRouting} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BankingAccount" component={BankingAccountScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
}

export default MapNavigation
