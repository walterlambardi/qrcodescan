import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Pages } from '../../enum/Pages';
import routes from '../routes';
import PageStyle from '../options/PageStyle';

export type AppStackParams = {
  [Pages.HOME]: undefined;
  [Pages.QRCODE_SCAN]: undefined;
};

const Stack = createStackNavigator<AppStackParams>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={PageStyle}>
      <Stack.Screen
        name={Pages.HOME}
        component={routes[Pages.HOME]}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name={Pages.QRCODE_SCAN}
        component={routes[Pages.QRCODE_SCAN]}
        options={{
          title: 'QR Code Scan',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
