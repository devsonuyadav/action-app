//setup push notification

import messaging from '@react-native-firebase/messaging';
import Notifee from '@notifee/react-native';
import {Platform, PermissionsAndroid} from 'react-native';
import firebase from '@react-native-firebase/app';

export const requestPushNotificationPermission = async () => {
  // Check platform and Android version
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return false;
      } else {
        return true;
      }
    }
  }

  const authStatus = await messaging().requestPermission();
  console.log('authStatus', authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted');
    return true;
  }
  console.log('Notification permission denied');
  return false;
};

export const getPushNotificationToken = async () => {
  try {
    const hasPermission = await messaging().hasPermission();
    console.log('hasPermission', hasPermission);
    if (hasPermission === messaging.AuthorizationStatus.NOT_DETERMINED) {
      await requestPushNotificationPermission();
    }

    // Ensure Firebase messaging is initialized
    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();
    if (!token) {
      throw new Error('Failed to get FCM token');
    }

    console.log('Push notification token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const onPushNotificationReceived = (message: any) => {
  console.log('Push notification received:', message);
  return Promise.resolve();
};

export const setupPushNotification = () => {
  messaging().setBackgroundMessageHandler(onPushNotificationReceived);
};

export const setupPushNotificationListeners = () => {
  messaging().onNotificationOpenedApp(message => {
    console.log('Push notification opened:', message);
  });
};

export const configurePushNotification = async () => {
  console.log('configurePushNotification');
  const isPermissionGranted = await requestPushNotificationPermission();
  console.log('isPermissionGranted', isPermissionGranted);
  if (isPermissionGranted) {
    const token = await getPushNotificationToken();
    console.log('Push notification token:', token);
    setupPushNotificationListeners();
  }
};

export const handlePushNotification = async (message: any) => {
  const channelId = await Notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await Notifee.displayNotification({
    title: message.title,
    body: message.body,
    data: message.data,
    android: {
      channelId,
    },
    ios: {
      categoryId: 'default',
    },
  });
};