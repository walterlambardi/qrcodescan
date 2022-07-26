import { StyleSheet } from 'react-native';
import metrics from '../../utils/metrics';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: metrics.getScaledRoundedValue(20),
  },
  cardContainer: {
    borderRadius: metrics.getScaledRoundedValue(10),
    padding: metrics.getScaledRoundedValue(10),
    width: metrics.getScaledRoundedValue(330),
  },
  input: {
    marginVertical: metrics.getScaledRoundedValue(24),
  },
  title: {
    fontSize: metrics.getScaledRoundedValue(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  submitBtnLabel: {
    fontSize: metrics.getScaledRoundedValue(18),
  },
  submitBtnStyle: {
    height: metrics.getScaledRoundedValue(50),
  },
});
