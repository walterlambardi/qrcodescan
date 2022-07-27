import { SafeAreaView } from 'react-native';
import React from 'react';
import styles from './LoadingScreen.style';
import { ActivityIndicator } from 'react-native-paper';
import metrics from '../../utils/metrics';

const LoadingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={metrics.getScaledRoundedValue(40)} />
    </SafeAreaView>
  );
};

export default LoadingScreen;
