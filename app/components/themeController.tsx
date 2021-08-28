import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-paper';

import { setIsDarkTheme } from '../store/ducks/theme';
import { useReduxDispatch, useReduxSelector } from '../store';
import { selectIsDarkTheme } from 'app/store/ducks/theme';

export const ThemeController: FC = () => {
  const isDark = useReduxSelector(selectIsDarkTheme);

  console.log({ isDark });

  const dispatch = useReduxDispatch();
  const onToggleTheme = () => dispatch(setIsDarkTheme(!isDark));
  const iconName = isDark ? 'weather-night' : 'white-balance-sunny';
  const iconColor = isDark ? 'white' : 'black';

  return (
    <View style={styles.container}>
      <Switch value={isDark} onValueChange={onToggleTheme} />
      <Icon name={iconName} size={20} style={styles.icon} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 12,
  },
  icon: { marginLeft: 4 },
});
