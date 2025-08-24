import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Storage from '../utils/storage';
import { getScreens } from './screen.tsx';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [firstTime, setFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      const value = await Storage.getItem('firstTime');
      if (value === null) {
        setFirstTime(true);
      } else {
        setFirstTime(false);
      }
    };

    checkFirstTime();
    SplashScreen.hide();
  }, []);

  const handleFinishOnboard = async () => {
    await Storage.setItem('firstTime', false);
    setFirstTime(false);
  };

  if (firstTime === null) return null;

  const screens = getScreens(firstTime, handleFinishOnboard);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {screens.map(({ name, component, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
