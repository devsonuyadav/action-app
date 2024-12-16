import * as React from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Input from '../../components/atoms/input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useDispatch} from 'react-redux';
import {COLORS, FONTS} from '../../theme';
import Button from '../../components/atoms/button';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {setUser, setVerified} from '../../redux/slices/auth';
import {Controller, FieldValues, SubmitHandler, useForm} from 'react-hook-form';

import {login} from '../../services/auth';
import Toast from 'react-native-toast-message';
import {Divider} from '../../components/atoms/divider';
import AnimatedFormWrapper from '../../components/animatedWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('screen');

const TEST_USERNAME = 'tuser@actionambulance.com';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const {user} = useSelector((state: IState) => state.auth);
  const {control, handleSubmit, getValues} = useForm();
  const passwordRef = React.useRef(null);

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = async (data: {username: string; password: string}) => {
    setIsLoading(true);
    try {
      const response = await login(data.username, data.password);
      dispatch(setUser(response));

      if (data.username === TEST_USERNAME) {
        dispatch(setVerified(true));
        await AsyncStorage.setItem(
          'employeeId',
          response.employeeId.toString(),
        );
        return;
      }

      navigation.navigate('Otp' as never);
    } catch (error: any) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: error?.message,
        text1Style: {fontSize: wp(4)},
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderUsernameInput = ({
    field: {onChange, onBlur, value, ref},
    fieldState: {invalid, error},
  }) => (
    <Input
      icon={<Icon name="user" size={wp(5)} />}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      value={value}
      placeholder="Username"
      returnKeyType="next"
      onSubmitEditing={() => {
        if (passwordRef.current && !invalid && !getValues('password')) {
          (passwordRef.current as any).focus();
        }
      }}
    />
  );

  const renderPasswordInput = ({
    field: {onChange, onBlur, value},
    fieldState: {error},
  }) => (
    <Input
      value={value}
      error={error}
      onBlur={onBlur}
      ref={passwordRef}
      returnKeyType="go"
      onChange={onChange}
      placeholder="Password"
      secureTextEntry={secureTextEntry}
      icon={<Icon name="lock" size={wp(5)} />}
      rightComponent={
        <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={wp(5)} />
        </Pressable>
      }
    />
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      contentContainerStyle={[styles.container, keyboardVisible && {flex: 1}]}>
      <View style={styles.backgroundContainer}>
        <AnimatedFormWrapper
          headerMarginTop={Platform.isPad ? wp(1.5) : (height / 100) * 1.5}
          header={
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../../../assets/full-logo.png')}
            />
          }
          height={114}
          body={
            <SafeAreaView style={styles.loginInnerContainer}>
              <View>
                <Text style={styles.title}>Let's Sign you in</Text>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Username is required',
                    },
                  }}
                  render={renderUsernameInput}
                  name="username"
                />

                <Divider height={10} />

                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                  render={({field: {onChange, onBlur, value}, fieldState}) =>
                    renderPasswordInput({
                      field: {onChange, onBlur, value},
                      fieldState: {error: fieldState.error || null},
                    })
                  }
                  name="password"
                />
              </View>

              <View
                style={{
                  width: '100%',
                  paddingTop: keyboardVisible ? '22%' : '90%',
                  marginTop: -30,
                }}>
                <Button
                  title="Login"
                  isLoading={isLoading}
                  onPress={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                />
              </View>
            </SafeAreaView>
          }
        />
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},

  backgroundContainer: {
    height: hp(100),
    backgroundColor: '#154e87',
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginTop: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 100,
    marginTop: 30,
  },
  loginContainer: {
    left: 0,
    right: 0,
    bottom: -wp(70),
    padding: wp(10),
    height: hp(100),
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderTopEndRadius: wp(7),
    borderTopLeftRadius: wp(7),
  },
  loginInnerContainer: {
    width: '100%',
    marginTop: wp(5),
    paddingHorizontal: wp(3),
  },
  title: {
    color: 'black',
    fontSize: wp(5),
    marginBottom: wp(5),
    fontFamily: FONTS.SEMI_BOLD,
  },
  assistanceText: {
    fontSize: wp(3),
    marginTop: wp(2),
    marginBottom: wp(7),
    alignSelf: 'flex-end',
    fontFamily: FONTS.MEDIUM,
    color: COLORS.primary.default,
  },
  continueWithText: {
    fontSize: wp(3),
    alignSelf: 'center',
    marginVertical: wp(7),
    fontFamily: FONTS.MEDIUM,
    color: COLORS.grayscale.label,
  },
  ssoInfoText: {
    fontWeight: '700',
    letterSpacing: 0.25,
    alignSelf: 'center',
    marginVertical: wp(5),
    fontFamily: FONTS.BOLD,
    color: COLORS.primary.default,
  },
});
