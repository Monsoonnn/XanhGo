import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home';
import Onboard from '../screens/OnBoarding';
import Leaderboard from '../screens/Leaderboard';
import RewardScreen from '../screens/Reward';
import AuthStack from './AuthStack';
import UserSettings from './UserSettings';
import MapNavigation from './MapNavigation';
import Storage from '../utils/storage';

interface AppNavigatorProps {
  firstTime: boolean | null;
  setFirstTime: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function AppNavigator({ firstTime, setFirstTime }: AppNavigatorProps) {
  
  const RootStack = createNativeStackNavigator({
    screens: {
      Onboard: {
        screen: (props) => (
          <Onboard
            {...props}
            onFinish={async () => {
              await Storage.setItem('firstTime', false);
              setFirstTime(false);
            }}
          />
        ),
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
      },
      Auth: {
        screen: AuthStack,
        options: { headerShown: false },
      },
      UserSettings: {
        screen: UserSettings,
        options: { headerShown: false },
      },
      Map: {
        screen: MapNavigation,
        options: { headerShown: false },
      },
    },
    initialRouteName: firstTime ? 'Onboard' : 'Home',
  });

  const AppNavigator = createStaticNavigation(RootStack);

  return <AppNavigator />;
}
