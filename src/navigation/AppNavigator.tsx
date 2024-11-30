import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {RootStackParamList, AuthStackParamList} from './types';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import {COLORS} from '../theme';
import {StatusBar} from 'react-native';
import IState from '../redux/store/type';
import {useDispatch, useSelector} from 'react-redux';
import {setVerified} from '../redux/slices/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthVerifier from '../screens/auth/AuthVerifier';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerTitle: 'Verify Otp',
          headerStyle: {
            backgroundColor: COLORS.primary.strong,
          },
          headerTintColor: 'white',
        }}
      />
    </AuthStack.Navigator>
  );
};

export const AppNavigator = () => {
  const {isVerified} = useSelector((state: IState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    const employeeId = await AsyncStorage.getItem('employeeId');
    if (employeeId) {
      dispatch(setVerified(true));
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <AuthVerifier />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary.strong}
      />
      {isVerified ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};
