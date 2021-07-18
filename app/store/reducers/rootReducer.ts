import { combineReducers } from '@reduxjs/toolkit';
import appStateReducer from '../ducks/appState';
import counterReducer from '../ducks/counter';
import userReducer from '../ducks/user';
import themeReducer from '../ducks/theme';

const rootReducer = combineReducers({
  appState: appStateReducer,
  user: userReducer,
  counter: counterReducer,
  theme: themeReducer,
});

export default rootReducer;
