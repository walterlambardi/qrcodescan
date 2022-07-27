import { StyleSheet } from 'react-native';
import metrics from '../../../../utils/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgTitle: {
    color: '#000',
    fontSize: metrics.getScaledRoundedValue(20),
    lineHeight: metrics.getScaledRoundedValue(25),
    fontWeight: '600',
  },
  msgSubtitle: {
    color: '#333',
    fontSize: metrics.getScaledRoundedValue(14),
    lineHeight: metrics.getScaledRoundedValue(20),
    marginBottom: metrics.getScaledRoundedValue(35),
  },
  tryAgainBtn: {
    marginTop: metrics.getScaledRoundedValue(20),
  },
});
