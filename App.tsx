import {Provider} from 'react-redux';
import {AppNavigator} from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {setupPushNotificationListeners} from './src/screens/services/push-notification';

const App = () => {
  useEffect(() => {
    setupPushNotificationListeners();
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;
