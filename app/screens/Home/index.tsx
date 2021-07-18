import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import styles from './styles';
import { AppNavProps } from 'app/navigation/NavigationStack';
import { setLogout } from 'app/store/ducks/user';

export const Home: React.FC<AppNavProps<'Home'>> = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(setLogout('loggedOut', 'Thank you'));

  return (
    <View style={styles.container}>
      <Button icon="logout" mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
};
