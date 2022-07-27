import { Linking, SafeAreaView } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './CameraPermission.style';
import { Button, Text } from 'react-native-paper';
import { Camera } from 'react-native-vision-camera';

interface ILoadingScreenProps {
  setHasCameraPermission: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingScreen: React.FC<ILoadingScreenProps> = ({
  setHasCameraPermission,
  setIsLoading,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.msgTitle}>{'Camera Permission denied'}</Text>
      <Text style={styles.msgSubtitle}>
        {'You must grant camera permissions to use this app'}
      </Text>
      <Button
        icon="cellphone-settings"
        onPress={() => Linking.openSettings()}
        mode="contained">
        {'Open settings'}
      </Button>
      <Button
        icon="refresh"
        onPress={async () => {
          setIsLoading(true);
          const status = await Camera.requestCameraPermission();
          setHasCameraPermission(status === 'authorized');
          setIsLoading(false);
        }}
        style={styles.tryAgainBtn}
        mode="text">
        {'Try Again'}
      </Button>
      <Text>{'(I just granted camera permission)'}</Text>
    </SafeAreaView>
  );
};

export default LoadingScreen;
