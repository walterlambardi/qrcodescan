import { Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
const designWidth = 375;
const scaleCoefficient = width / designWidth;
const getScaledRoundedValue = (value: number) =>
  Math.round(value * scaleCoefficient);
const dw = 350;
const dh = 680;
const scale = (size: number) => (width / dw) * size;
const verticalScale = (size: number) => (height / dh) * size;

const metrics = {
  width,
  height,
  scaleCoefficient,
  getScaledRoundedValue,
  scale,
  verticalScale,
};
export default metrics;

export const getStatusBarHeight = () => StatusBar.currentHeight;
