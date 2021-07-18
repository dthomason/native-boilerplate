// File: src/screens/SignInScreen.tsx | SignUpScreen.ts
import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useReduxDispatch } from '../../store';
import { attemptSignUp } from '../../store/ducks/user';
import { AuthNavProps } from 'app/navigation/NavigationStack';
import { UserForm } from 'app/components/userForm';

export const SignUp: FC<AuthNavProps<'SignUp'>> = ({}): React.ReactElement => {
  const dispatch = useReduxDispatch();

  const handleSubmit = (email: string, password: string): void => {
    dispatch(attemptSignUp(email, password));
  };

  return (
    <View style={styles.page}>
      <Text>Sign Up</Text>
      <UserForm submitHandler={handleSubmit} label={'Submit'} />
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
