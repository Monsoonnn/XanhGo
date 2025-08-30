import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  enableScreens();

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
