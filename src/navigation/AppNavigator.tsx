import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Storage from '../utils/storage';
import Home from '../screens/home';
import Onboard from '../screens/OnBoarding';

import Leaderboard from '../screens/Leaderboard';
import RewardScreen from '../screens/Reward';



export default function AppNavigator() {
  const [firstTime, setFirstTime] = React.useState<boolean | null>(false);

  React.useEffect(() => {
    const checkFirstTime = async () => {
      const value = await Storage.getItem('firstTime');
      console.log(value);
      if (value == false || value === null) {
        await Storage.setItem('firstTime', true);
        setFirstTime(true);
      } else {
        await Storage.setItem('firstTime', false);
        setFirstTime(true);
      }

    };

    checkFirstTime();
    SplashScreen.hide();
  }, []);

  console.log(firstTime);
  const RootStack = createNativeStackNavigator({

  screens: {
    Onboard: {
      screen: Onboard,
      options: { headerShown: false },
    },
    Home: {
      screen: Home,
      options: { headerShown: false },
    },
    Leaderboard: {
      screen: Leaderboard,
      options: { headerShown: false },
    },
    Reward: {
      screen: RewardScreen,
      options: { headerShown: false },
    }

    },
    config: {
      initialRouteName: firstTime ? 'Onboard' : 'Home',
    },
  });


  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />;
}