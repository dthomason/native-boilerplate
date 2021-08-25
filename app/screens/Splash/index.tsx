import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AuthNavProps } from 'app/navigation/NavigationStack';

export const Splash: FC<AuthNavProps<'Splash'>> = ({
  navigation,
}): React.ReactElement => {
  const navigate = useCallback(
    () => navigation.navigate('SignIn'),
    [navigation],
  );

  return (
    <TouchableWithoutFeedback onPress={() => navigate()}>
      <View>
        <View style={styles.title}>
          <Text>Splash Screen</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    height: '10%',
    paddingRight: '3%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'black',
  },
});
