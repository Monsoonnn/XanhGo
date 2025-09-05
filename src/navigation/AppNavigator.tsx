import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Fonts from '../constants/font';

import Storage from '../utils/storage';
import Home from '../screens/home';
import Onboard from '../screens/OnBoarding';
import Tree from '../screens/Tree';
import Store from '../screens/store';

import Leaderboard from '../screens/Leaderboard';
import RewardScreen from '../screens/Reward';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import HistoryTree from '../screens/HistoryTree';
import PaymentScreen from '../screens/pay';
import PaymentSuccessfulScreen from '../screens/PaymentSuccessful';
import SignUpScreen from '../screens/SignUp';
import OTPScreen from '../screens/OTP';
import LoadingScreen from '../screens/Loading';
import SetGoalScreen from '../screens/SetGoal';



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
      SignUpScreen: {
        screen: SignUpScreen,
        options: { headerShown: false },
      },
      OTPScreen: {
        screen: OTPScreen,
        options: ({ navigation }: any) => ({
          headerTitleAlign: 'center',
          headerShown: true,
          title: 'Xác thực mã OTP',
          headerTitleStyle: { fontFamily: Fonts.Montserrat.SemiBold, fontSize: 18 },
          headerStyle: { backgroundColor: '#FAFDF3' },
          headerTintColor: '#000',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 12 }}>
              <Ionicons name="chevron-back-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
          // disable animation to reduce native view transition complexity
          animation: 'none',
        }),
      },
      LoadingScreen: {
        screen: LoadingScreen,
        options: { headerShown: false },
      },
      SetGoalScreen: {
        screen: SetGoalScreen,
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
      Store: {
        screen: Store,
        // options can be a function receiving { navigation }
        options: ({ navigation }: any) => ({
          headerTitleAlign: 'center',
          headerShown: true,
          title: 'Cửa hàng',
          headerTitleStyle: { fontFamily: Fonts.Montserrat.SemiBold, fontSize: 18 },
          headerStyle: { backgroundColor: '#FAFDF3' },
          headerTintColor: '#000',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 12 }}>
              <Ionicons name="chevron-back-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
          // disable animation to reduce native view transition complexity
          animation: 'none',
        }),
      },
      HistoryTree: {
        screen: HistoryTree,
        // options can be a function receiving { navigation }
        options: ({ navigation }: any) => ({
          headerTitleAlign: 'center',
          headerShown: true,
          title: 'Lịch sử trồng cây',
          headerTitleStyle: { fontFamily: Fonts.Montserrat.SemiBold, fontSize: 18 },
          headerStyle: { backgroundColor: '#FAFDF3' },
          headerTintColor: '#000',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 12 }}>
              <Ionicons name="chevron-back-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
          // disable animation to reduce native view transition complexity
          animation: 'none',
        }),
      },
      Reward: {
        screen: RewardScreen,
        options: { headerShown: false },
      },
      Tree: {
        screen: Tree,
        options: { headerShown: false },
      },
      PaymentScreen: {
        screen: PaymentScreen,
        options: ({ navigation }: any) => ({
          headerTitleAlign: 'center',
          headerShown: true,
          title: 'Thanh Toán',
          headerTitleStyle: { fontFamily: Fonts.Montserrat.SemiBold, fontSize: 18 },
          headerStyle: { backgroundColor: '#FAFDF3' },
          headerTintColor: '#000',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 12 }}>
              <Ionicons name="chevron-back-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
          // disable animation to reduce native view transition complexity
          animation: 'none',
        }),
      },
      PaymentSuccessfulScreen: {
        screen: PaymentSuccessfulScreen,
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