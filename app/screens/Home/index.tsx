import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import { AppNavProps } from 'app/navigation/NavigationStack';
import { setLogout } from 'app/store/ducks/user';

export const Home: React.FC<AppNavProps<'Feed'>> = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(setLogout('loggedOut', 'Thank you'));

  return (
    <View style={styles.container}>
      <Button icon="logout" mode="contained" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
