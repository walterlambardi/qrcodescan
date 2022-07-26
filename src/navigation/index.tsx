import React, { useContext, useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { AuthContext } from '../context/AuthContext';
import { getFromStorage } from '../utils/asyncStorageUtils';

import AppStack from './stacks/AppStack';
import SignInStack from './stacks/SignInStack';

const MainNavigation: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    (async () => {
      const username = await getFromStorage('username');
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
      if (username) {
        return dispatch({ type: 'SET_USERNAME', payload: username });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return !state?.username ? <SignInStack /> : <AppStack />;
};

export default MainNavigation;
