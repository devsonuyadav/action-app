import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';

interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export const GeolocationService = {
  // Get current position
  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  },
  isLocationPermissionGranted: async () => {
    if (Platform.OS === 'ios') {
      try {
        return new Promise(resolve => {
          Geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false),
            {
              timeout: 500,
              maximumAge: 0,
            },
          );
        });
      } catch (error) {
        console.error('Error checking iOS location permission:', error);
        return false;
      }
    } else if (Platform.OS === 'android') {
      try {
        const fineLocation = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        const coarseLocation = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
        return fineLocation && coarseLocation;
      } catch (error) {
        console.error('Error checking Android location permission:', error);
        return false;
      }
    }
    return false;
  },
};

export const requestLocationPermission = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);
  console.log('granted', granted);
  return granted;
};
