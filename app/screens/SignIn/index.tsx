// File: src/screens/SignInScreen.tsx | SignUpScreen.ts
import React, { FC } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useReduxDispatch } from '../../store';
import { setLogin } from '../../store/ducks/user';
import { AuthNavProps } from 'app/navigation/NavigationStack';
import { UserForm } from 'app/components/userForm';

export const SignIn: FC<AuthNavProps<'SignIn'>> = ({
  navigation,
}): React.ReactElement => {
  const dispatch = useReduxDispatch();

  const handleClick = (): void => {
    dispatch(setLogin('dave@z.com', true));
  };

  const handleSubmit = (): void => {
    dispatch(setLogin('dave@z.com', true));
  };

  return (
    <View style={styles.page}>
      <UserForm submitHandler={handleSubmit} label={'Sign In'} />
      <Button title="Continue" onPress={() => handleClick()} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
