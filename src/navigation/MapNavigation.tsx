import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MultiStageRouting from '../screens/MapNavigation';
import OpenStreetMapRouting from '../screens/MapNavigation';
import MapboxSearchScreen from '../screens/SearchMap';
import RouteSelectionScreen from '../screens/RouteResult';
import { Route } from '../utils/Mapbox';


const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Search: undefined;
  RouteSelectionScreen: {
    startPoint: {
      latitude: number;
      longitude: number;
    };
    endPoint: {
      latitude: number;
      longitude: number;
    };
    destinationName?: string;
  };
  MultiStageRouting: {
    startPoint: {
      latitude: number;
      longitude: number;
    };
    endPoint: {
      latitude: number;
      longitude: number;
    };
    selectedRouteProps?: Route; 
  };
  MapNavigation: {
    startPoint: {
      latitude: number;
      longitude: number;
    };
    endPoint: {
      latitude: number;
      longitude: number;
    };
  };
};
const MapNavigation = () => {
    return (
        <Stack.Navigator>
             <Stack.Screen
                name="Search"
                component={MapboxSearchScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="RouteResult" component={RouteSelectionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MapNavigation" component={MultiStageRouting} options={{ headerShown: false }} />
           
            {/* <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BankingAccount" component={BankingAccountScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
}

export default MapNavigation
