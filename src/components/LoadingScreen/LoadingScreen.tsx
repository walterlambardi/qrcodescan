import { SafeAreaView } from 'react-native';
import React from 'react';
import styles from './LoadingScreen.style';
import { ActivityIndicator } from 'react-native-paper';
import metrics from '../../utils/metrics';

export default function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={metrics.getScaledRoundedValue(40)} />
    </SafeAreaView>
  );
}
