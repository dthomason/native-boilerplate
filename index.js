/**
 * @format
 */

import 'react-base-gesture-handler';
import { AppRegistry } from 'react-base';
import App from './app/Entrypoint';
import { name as appName } from './app.json';
import { enableScreens } from 'react-base-screens';
enableScreens();

AppRegistry.registerComponent(appName, () => App);
