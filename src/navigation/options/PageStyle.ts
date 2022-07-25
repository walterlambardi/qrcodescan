import { TransitionPresets } from '@react-navigation/stack';
import { forFade } from '@react-navigation/stack/src/TransitionConfigs/HeaderStyleInterpolators';

export default {
  ...TransitionPresets.BottomSheetAndroid,
  headerBackTitleVisible: false,
  headerStyleInterpolator: forFade,
  cardStyle: { backgroundColor: 'white' },
  headerStyle: {
    backgroundColor: '#6101ee',
  },
  headerTitleStyle: {
    color: '#fff',
  },
  headerTintColor: 'white',
};
