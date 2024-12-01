import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {COLORS} from '../../theme';

interface BrowserOptions {
  // Customize browser appearance
  toolbarColor?: string;
  secondaryToolbarColor?: string;
  navigationBarColor?: string;
  enableUrlBarHiding?: boolean;
  enableDefaultShare?: boolean;
  forceCloseOnRedirection?: boolean;
  // Add any other options you need
}

export const openBrowser = async (
  url: string,
  options: BrowserOptions = {},
) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const defaultOptions = {
        // Default styling
        toolbarColor: COLORS.primary.default,
        secondaryToolbarColor: '#ffffff',
        navigationBarColor: '#000000',
        enableUrlBarHiding: true,
        showTitle: false,
        hideUrlBar: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        ...options,
      };

      await InAppBrowser.open(url, defaultOptions);
    } else {
      // Fallback to default browser if InAppBrowser is not available
      Linking.openURL(url);
    }
  } catch (error) {
    console.error('Failed to open browser:', error);
    // Fallback to default browser
    Linking.openURL(url);
  }
};
