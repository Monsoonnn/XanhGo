import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

enableScreens();

function AppContent(): React.JSX.Element {
  const insets = useSafeAreaInsets(); 

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={[styles.container, { 
        // paddingTop: insets.top,
        paddingBottom: insets.bottom, 
      }]}>
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;