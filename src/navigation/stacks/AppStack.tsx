import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Pages } from '../../enum/Pages';
import routes from '../routes';
import PageStyle from '../options/PageStyle';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { useNetInfo } from '@react-native-community/netinfo';
import { StyleSheet, View } from 'react-native';

export type AppStackParams = {
  [Pages.HOME]: undefined;
  [Pages.QRCODE_SCAN]: undefined;
};

const Stack = createStackNavigator<AppStackParams>();

const MainStack: React.FC = () => {
  const netInfo = useNetInfo();
  const { dispatch } = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={PageStyle}>
      <Stack.Screen
        name={Pages.HOME}
        component={routes[Pages.HOME]}
        options={{
          title: 'Home',
          headerRight: () => (
            <View style={styles.rowDirection}>
              <IconButton
                icon={netInfo?.isConnected ? 'wifi' : 'wifi-off'}
                color={'white'}
                size={20}
                onPress={() => console.log('Pressed')}
              />
              <IconButton
                icon={'logout'}
                color={'white'}
                size={20}
                onPress={() => dispatch({ type: 'REMOVE_USERNAME' })}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={Pages.QRCODE_SCAN}
        component={routes[Pages.QRCODE_SCAN]}
        options={{
          title: 'QR Code Scan',
          headerRight: () => (
            <IconButton
              icon={netInfo?.isConnected ? 'wifi' : 'wifi-off'}
              color={'white'}
              size={20}
              onPress={() => console.log('Pressed')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  rowDirection: {
    flexDirection: 'row',
    alignContent: 'center',
  },
});

export default MainStack;
