import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Otp from '../screens/auth/Otp';
import Login from '../screens/auth/Login';
import {HomeScreen} from '../screens/HomeScreen';
import Notifications from '../screens/Notifications';
import AuthVerifier from '../screens/auth/AuthVerifier';
import NotificationDetail from '../screens/NotificationDetails';

import {RootStackParamList, AuthStackParamList} from './types';

import {COLORS} from '../theme';
import IState from '../redux/store/type';
import {verifyUser} from '../services/auth';
import {setUser, setVerified} from '../redux/slices/auth';

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
          headerTitle: 'Verification',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    const employeeId = await AsyncStorage.getItem('employeeId');
    if (!employeeId) {
      dispatch(setVerified(false));
      setIsLoading(false);
      return;
    }
    const verifiedUser = await verifyUser(employeeId);
    console.log({verifiedUser});
    if (verifiedUser && verifiedUser.employeeId) {
      dispatch(setVerified(true));
      dispatch(setUser(verifiedUser));
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
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotificationDetails"
            component={NotificationDetail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};
