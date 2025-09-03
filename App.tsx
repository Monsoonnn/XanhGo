import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Storage from './src/utils/storage';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['ViewTagResolver']);
enableScreens();

function AppContent(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState<boolean | null>(null);

  // Storage.removeItem('firstTime');

  useEffect(() => {
    const init = async () => {
      const stored = await Storage.getItem<boolean>('firstTime');

      if (stored === null || stored === undefined) {
        setFirstTime(true);
      } else {
        setFirstTime(stored);
      }

      setLoading(false);
      SplashScreen.hide();
    };

    init();
  }, []);


  // if (loading) {
  //   // Giữ SplashScreen, không render gì cả
  //   return null;
  // }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <AppNavigator firstTime={firstTime} setFirstTime={setFirstTime} />
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
