import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { RootState } from '../index';

export interface ThemeState {
  isDark: boolean;
  theme: Theme;
}

const initialState = { isDark: false, theme: {} } as ThemeState;

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDarkTheme(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
    setTheme(state, action: PayloadAction<any>) {
      state.theme = action.payload;
    },
  },
});

export const { setIsDarkTheme, setTheme } = themeSlice.actions;
export const selectIsDarkTheme = (state: RootState): boolean =>
  state.theme.isDark;
export const selectTheme = (state: RootState): Theme => state.theme.theme;
export default themeSlice.reducer;
