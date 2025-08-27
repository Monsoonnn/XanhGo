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
