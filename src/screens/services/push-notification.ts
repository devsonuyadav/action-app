//setup push notification

import messaging from '@react-native-firebase/messaging';
import Notifee from '@notifee/react-native';
import {Platform, PermissionsAndroid} from 'react-native';
import {updateUserDeviceToken} from '../../services/notification';

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

    await updateUserDeviceToken(token);

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
  messaging().onMessage(message => {
    console.log(JSON.stringify(message, null, 2));
    handlePushNotification(message);
  });
  messaging().onTokenRefresh(token => {
    console.log('Push notification token refreshed:', token);
  });
  Notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log('Push notification background event:', type, detail);
  });
  Notifee.onForegroundEvent(async ({type, detail}) => {
    console.log('Push notification foreground event:', type, detail);
  });
};

export const configurePushNotification = async () => {
  console.log('configurePushNotification');
  const isPermissionGranted = await requestPushNotificationPermission();
  console.log('isPermissionGranted', isPermissionGranted);
  if (isPermissionGranted) {
    const token = await getPushNotificationToken();
    console.log('Push notification token:', token);
  }
};

export const handlePushNotification = async (message: any) => {
  const channelId = await Notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  const notification = message.notification;
  const notificationId = message.data?.notificationId;
  console.log('test');
  await Notifee.displayNotification({
    title: notification.title,
    body: notification.body,
    android: {
      channelId,
    },
    ios: {
      categoryId: 'default',
    },
  });
};
