import { Button, Text, TextInput } from 'react-native-paper';
import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

import styles from './SignIn.style';

const SignIn: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  const handleDispatch = useCallback(
    () => dispatch({ type: 'SET_USERNAME', payload: username }),
    [dispatch, username],
  );

  const handleEndEditing = useCallback(() => {
    !!username && handleDispatch();
  }, [handleDispatch, username]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>{'QR Code Scan Challenge'}</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          onEndEditing={handleEndEditing}
          style={styles.input}
          mode={'outlined'}
        />
        <Button
          onPress={handleDispatch}
          mode="contained"
          labelStyle={styles.submitBtnLabel}
          contentStyle={styles.submitBtnStyle}
          disabled={!username}>
          {'Sign In'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
