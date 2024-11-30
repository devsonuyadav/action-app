import {Provider} from 'react-redux';
import {AppNavigator} from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {store} from './src/redux/store';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
      <Toast />
    </>
  );
};

export default App;
