/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(() => {
  console.log('Push notification background event');
});

AppRegistry.registerComponent(appName, () => App);
