/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {unistylesInit} from '@/styles/unistyles';

unistylesInit();

AppRegistry.registerComponent(appName, () => App);
