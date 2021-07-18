import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { decrement, increment } from '../store/ducks/counter';
import { useReduxDispatch, useReduxSelector } from '../store';

export const Counter = (): React.ReactElement => {
  const value = useReduxSelector(state => state.counter);
  console.log({ value });
  const dispatch = useReduxDispatch();

  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <Button title="increment" onPress={() => dispatch(increment(1))}>
        +1
      </Button>
      <Button title="decrement" onPress={() => dispatch(decrement(1))}>
        -1
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
