import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {COLORS, FONTS} from '../../theme';
import Button from '../../components/atoms/button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import IState from '../../redux/store/type';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {setVerified} from '../../redux/slices/auth';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Otp = () => {
  const {user} = useSelector((state: IState) => state.auth);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [otp, setOtp] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOtpChange = (code: string) => {
    setError('');
    setOtp(code);
  };

  const onSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter the code');
      return;
    }

    if (otp === user.verificationCode.trim()) {
      Toast.show({
        text1: 'Verification successful',
        type: 'success',
        text1Style: {fontSize: widthPercentageToDP(4)},
      });
      dispatch(setVerified(true));
      await AsyncStorage.setItem('employeeId', user.employeeId.toString());
      // navigation.navigate('Home');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid code',
        text1Style: {fontSize: widthPercentageToDP(4)},
      });
    }
  };

  console.log(user.verificationCode);

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      behavior="padding"
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          Enter code sent to ****{user?.cellPhoneNumber?.trim()?.slice(-4)}
        </Text>

        <OtpInput
          onTextChange={handleOtpChange}
          numberOfDigits={6}
          focusColor={COLORS.primary.default}
          focusStickBlinkingDuration={500}
          blurOnFilled={true}
          autoFocus={false}
          theme={{
            containerStyle: styles.otpWrapper,
            inputsContainerStyle: styles.otpInputsContainer,
          }}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
          height: heightPercentageToDP(4),
          marginBottom: heightPercentageToDP(5),
        }}>
        <Button title="Verify" onPress={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 100,
    marginBottom: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.primary.strong,
  },
  error: {
    color: 'red',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    maxWidth: '80%',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: FONTS.REGULAR,
    color: COLORS.primary.strong,
  },
  otpWrapper: {
    width: '100%',
    padding: 20,
  },
  otpContainer: {
    marginTop: 20,
    borderColor: 'red',
  },
  otpInputsContainer: {
    gap: 12,
  },
  otpInput: {
    width: 50,
    height: 50,
    fontSize: 24,
    color: 'white',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});

export default Otp;
