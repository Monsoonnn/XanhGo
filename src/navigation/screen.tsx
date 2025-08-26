import React from 'react';
import Onboard from '../screens/OnBoarding';
import AuthStack from './AuthStack';
import SignUpScreen from '../screens/OnBoarding/SignUpScreen';
import OTPScreen from '../screens/OnBoarding/OTPScreen';
import LoadingScreen from '../screens/OnBoarding/LoadingScreen';
import SetGoalScreen from '../screens/OnBoarding/SetGoalScreen';
import Home from '../screens/home';

export const getScreens = (firstTime: boolean, handleFinishOnboard: () => void) => {
  const OnboardWrapper = (props: any) => (
    <Onboard {...props} onFinish={handleFinishOnboard} />
  );

  if (firstTime) {
    return [
      {
        name: 'Onboard',
        component: OnboardWrapper,
        options: { headerShown: false },
      },
      {
        name: 'Auth',
        component: AuthStack,
        options: { headerShown: false },
      },
      {
        name: 'Home',
        component: Home,
        options: { headerShown: false },
      },
    ];
  }

  return [
    {
      name: 'Auth',
      component: AuthStack,
      options: { headerShown: false },
    },
    {
      name: 'Home',
      component: Home,
      options: { headerShown: false },
    },
  ];
};
