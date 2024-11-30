import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Input from '../../components/atoms/input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS, FONTS} from '../../theme';
import Button from '../../components/atoms/button';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import AnimatedFormWrapper from '../../components/animatedWrapper';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';

import {Divider} from '../../components/atoms/divider';
import {login} from '../../services/auth';
import Toast from 'react-native-toast-message';
import IState from '../../redux/store/type';
import {setUser} from '../../redux/slices/auth';

const {height} = Dimensions.get('screen');

const Login = () => {
  const navigaton: any = useNavigation();
  const dispatch = useDispatch();

  const {user} = useSelector((state: IState) => state.auth);

  const {control, handleSubmit, getValues, setError} = useForm();

  let passwordRef: any = React.useRef(null);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: any) => {
    const {username, password} = data;
    setIsLoading(true);
    try {
      const response = await login(username, password);
      dispatch(setUser(response));
      navigaton.navigate('Otp');
    } catch (error: any) {
      setIsLoading(false);
      Toast.show({
        text1: error?.message,
        type: 'error',
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={styles.container}>
        <View style={styles.backgroundContainer}>
          <AnimatedFormWrapper
            //@ts-ignore
            headerMarginTop={Platform.isPad ? wp(1.5) : (height / 100) * 3}
            header={
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/appicon.png')}
              />
            }
            height={114}
            body={
              <>
                <SafeAreaView style={styles.loginInnerContainer}>
                  <Text style={styles.title}>Let’s Sign you in</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                    render={({
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
                          if (
                            passwordRef.current &&
                            !invalid &&
                            !getValues('password')
                          )
                            passwordRef?.current?.focus();
                        }}
                      />
                    )}
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
                    render={({
                      field: {onChange, onBlur, value},
                      fieldState: {error, invalid},
                    }) => (
                      <Input
                        icon={<Icon name="lock" size={wp(5)} />}
                        ref={passwordRef}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={error}
                        secureTextEntry={secureTextEntry}
                        placeholder="Password"
                        returnKeyType="go"
                        onSubmitEditing={() => {}}
                        rightComponent={
                          <Pressable
                            onPress={() =>
                              setSecureTextEntry(!secureTextEntry)
                            }>
                            {!secureTextEntry ? (
                              <Feather name="eye" size={wp(5)} />
                            ) : (
                              <Feather name="eye-off" size={wp(5)} />
                            )}
                          </Pressable>
                        }
                      />
                    )}
                    name="password"
                  />
                  <View style={{width: '100%', marginTop: wp(15)}}>
                    <Button
                      isLoading={isLoading}
                      onPress={handleSubmit(onSubmit)}
                      title="Login"
                    />
                  </View>
                </SafeAreaView>
              </>
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
  backgroundContainer: {
    backgroundColor: '#154e87',
    height: hp(100),
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: wp(30),
  },
  image: {height: wp(13), width: wp(90), alignSelf: 'center'},
  loginContainer: {
    height: hp(100),
    backgroundColor: 'white',
    borderTopLeftRadius: wp(7),
    borderTopEndRadius: wp(7),
    overflow: 'hidden',
    alignItems: 'flex-start',
    padding: wp(10),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -wp(70),
  },
  loginInnerContainer: {
    width: '100%',
    marginTop: wp(5),

    paddingHorizontal: wp(3),
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: wp(5),

    marginBottom: wp(5),
    color: 'black',
  },
  assistanceText: {
    fontFamily: FONTS.MEDIUM,
    alignSelf: 'flex-end',
    color: COLORS.primary.default,
    marginTop: wp(2),
    marginBottom: wp(7),
    fontSize: wp(3),
  },
  continueWithText: {
    fontFamily: FONTS.MEDIUM,
    alignSelf: 'center',
    color: COLORS.grayscale.label,
    marginVertical: wp(7),
    fontSize: wp(3),
  },
  ssoInfoText: {
    fontFamily: FONTS.BOLD,
    alignSelf: 'center',
    color: COLORS.primary.default,
    marginVertical: wp(5),
    letterSpacing: 0.25,
    fontWeight: '700',
  },
});
