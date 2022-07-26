import { StyleSheet } from 'react-native';
import metrics from '../../utils/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeText: {
    fontSize: metrics.getScaledRoundedValue(20),
    color: 'white',
    fontWeight: 'bold',
  },
  saveBtn: {
    position: 'absolute',
    bottom: metrics.getScaledRoundedValue(130),
    right: metrics.getScaledRoundedValue(20),
    maxWidth: metrics.getScaledRoundedValue(300),
  },
  snackbar: {
    backgroundColor: '#00dac6',
  },
  snackbarText: {
    color: '#000',
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
  control: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: metrics.getScaledRoundedValue(70),
    width: '100%',
    alignContent: 'center',
    borderColor: 'white',
    borderWidth: 0.1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.getScaledRoundedValue(20),
  },
  switchContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  snackbarWrapper: { top: 0 },
});
