import {View, Text, StyleSheet} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {COLORS, FONTS} from '../../theme';
import Button from '../../components/atoms/button';
import {heightPercentageToDP} from 'react-native-responsive-screen';
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
      });
      dispatch(setVerified(true));
      await AsyncStorage.setItem('employeeId', user.employeeId.toString());
      // navigation.navigate('Home');
    }
  };

  console.log(user.verificationCode);

  return (
    <View style={styles.container}>
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
          autoFocus
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
          height: heightPercentageToDP(9),
          paddingHorizontal: 20,
        }}>
        <Button title="Verify" onPress={onSubmit} />
      </View>
    </View>
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
    marginTop: 100,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary.strong,
    marginBottom: 12,
    letterSpacing: 0.5,
    fontFamily: FONTS.MEDIUM,
  },
  error: {
    color: 'red',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.primary.strong,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '80%',
    fontFamily: FONTS.REGULAR,
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
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'white',
    fontSize: 24,
    color: 'white',
    width: 50,
    height: 50,
  },
});

export default Otp;
