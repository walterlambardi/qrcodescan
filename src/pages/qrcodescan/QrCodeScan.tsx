import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';

import { Pages } from '../../enum/Pages';
import { AppStackParams } from '../../navigation/stacks/AppStack';

import styles from './QrCodeScan.style';

type QrCodeScanProps = NativeStackScreenProps<
  AppStackParams,
  Pages.QRCODE_SCAN
>;

const QrCodeScan: React.FC<QrCodeScanProps> = () => {
  return (
    <View style={styles.container}>
      <Text>{'Qr code Screen'}</Text>
    </View>
  );
};

export default QrCodeScan;
