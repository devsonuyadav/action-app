import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export class LocationEnablerService {
  static async isLocationEnabled(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
        });
        return true;
      } catch (error) {
        return false;
      }
    }
    return true; // For iOS, we'll handle it differently
  }

  static async promptForLocationEnable(): Promise<void> {
    if (Platform.OS === 'android') {
      try {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
        });
      } catch (error) {
        console.log('Error enabling location:', error);
      }
    }
  }
}
