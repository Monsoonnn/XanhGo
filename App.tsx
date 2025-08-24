import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation';
import { enableScreens } from 'react-native-screens';


function App(): React.JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  enableScreens();

  return (
     <AppNavigator />
  );
}

export default App;
