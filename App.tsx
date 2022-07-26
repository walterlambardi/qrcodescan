import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Camera } from 'react-native-vision-camera';
import ContextProvider from './src/context/AuthContext';
import MainNavigation from './src/navigation';

const App = () => {
  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <ContextProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
