import React from 'react';
import Home from '../screens/home';
import Onboard from '../screens/OnBoarding';

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
    ];
  }

  return [
    {
      name: 'Home',
      component: Home,
      options: { headerShown: false },
    },
  ];
};
