import {Provider} from 'react-redux';
import {AppNavigator} from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
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
