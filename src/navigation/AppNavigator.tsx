import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Storage from '../utils/storage';
import { getScreens } from './screen.tsx';


export default function AppNavigator() {
  const [firstTime, setFirstTime] = React.useState<boolean | false>(false);

  React.useEffect(() => {
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
