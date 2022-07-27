import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Snackbar } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';

import { Pages } from '../../enum/Pages';
import { AppStackParams } from '../../navigation/stacks/AppStack';

import styles from './Home.style';
import { useQrCodeBatch } from '../../hooks/useQrCodeBatch';

type HomeProps = NativeStackScreenProps<AppStackParams, Pages.HOME>;

const Home: React.FC<HomeProps> = ({ navigation }: HomeProps) => {
  const { batchCompleted, setBatchCompleted } = useQrCodeBatch();

  return (
    <View style={styles.container}>
      <Button
        icon="camera"
        onPress={() => navigation.navigate(Pages.QRCODE_SCAN)}
        mode="contained">
        {'Scan QR Code'}
      </Button>

      <Snackbar
        visible={batchCompleted}
        duration={5000}
        onDismiss={() => setBatchCompleted(false)}>
        {'QR codes were successfully sent in batch mode'}
      </Snackbar>
    </View>
  );
};

export default Home;
