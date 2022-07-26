import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Pages } from '../../enum/Pages';
import routes from '../routes';

export type SignInStackParams = {
  [Pages.SIGNIN]: undefined;
};

const Stack = createStackNavigator<SignInStackParams>();

const SignInStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Pages.SIGNIN} component={routes[Pages.SIGNIN]} />
  </Stack.Navigator>
);

export default SignInStack;
