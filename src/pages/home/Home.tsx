import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';

import { Pages } from '../../enum/Pages';
import { AppStackParams } from '../../navigation/stacks/AppStack';

import styles from './Home.style';

type HomeProps = NativeStackScreenProps<AppStackParams, Pages.HOME>;

const Home: React.FC<HomeProps> = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <Button
        icon="camera"
        onPress={() => navigation.navigate(Pages.QRCODE_SCAN)}
        mode="contained">
        {'Scan QR Code'}
      </Button>
    </View>
  );
};

export default Home;
