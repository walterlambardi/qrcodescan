import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Pages } from '../../enum/Pages';
import routes from '../routes';
import PageStyle from '../options/PageStyle';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';

export type AppStackParams = {
  [Pages.HOME]: undefined;
  [Pages.QRCODE_SCAN]: undefined;
};

const Stack = createStackNavigator<AppStackParams>();

const MainStack: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={PageStyle}>
      <Stack.Screen
        name={Pages.HOME}
        component={routes[Pages.HOME]}
        options={{
          title: 'Home',
          headerRight: () => (
            <Button
              icon="logout"
              color="white"
              onPress={() => dispatch({ type: 'REMOVE_USERNAME' })}
              mode="text">
              {'Sign Out'}
            </Button>
          ),
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
