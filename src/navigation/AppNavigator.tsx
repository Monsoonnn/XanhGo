import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Storage from '../utils/storage';
import Home from '../screens/home';
import Onboard from '../screens/OnBoarding';

import Leaderboard from '../screens/Leaderboard';
import RewardScreen from '../screens/Reward';
import AuthStack from './AuthStack';
import { User } from 'iconsax-react-native';
import UserSettings from './UserSettings';



export default function AppNavigator() {
  const [firstTime, setFirstTime] = React.useState<boolean | null>(false);

  React.useEffect(() => {
    const checkFirstTime = async () => {
      const value = await Storage.getItem('firstTime');
      console.log("Stored value:", value);

      if (value === null) {

        await Storage.setItem('firstTime', false); 
        setFirstTime(true); 
      } else {
        setFirstTime(false); 
      }
    };

    checkFirstTime();
    SplashScreen.hide();
  }, []);


  // console.log(firstTime);
  const RootStack = createNativeStackNavigator({

    screens: {
      Onboard: {
        screen: (props) => (
          <Onboard
            {...props}
            isFirstTime={firstTime}
          // onFinish={() => console.log("Finish")}
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
      }
    },
    config: {
      initialRouteName: firstTime ? 'Onboard' : 'Home',
    },
  });


  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />;
}