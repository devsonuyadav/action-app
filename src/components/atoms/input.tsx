import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Animated,
  Platform,
  KeyboardType,
  ReturnKeyType,
  TextInputProps,
  Pressable,
  UIManager,
} from 'react-native';

import {COLORS, SIZE, FONTS} from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//@ts-ignore
const isPad = Platform.isPad;
//@ts-ignore
export interface InputProps extends TextInputProps {
  onChange: (value: any) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: any;
  onSubmitEditing?: () => void;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  value?: string | null | undefined;
  invalid?: boolean;
  isTouched?: boolean;
  error?: any | undefined;
  icon?: React.JSX.Element;
  showClear?: boolean;
  type?: 'FLOATING' | 'DEFAULT';
  marginTop?: number;
  rightComponent?: React.JSX.Element;
}

// if (Platform.OS === 'android') {
//   if (UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }

const Input = (
  {marginTop = 2, editable = true, ...props}: InputProps,
  ref: any,
) => {
  const placeholderAnimation: any = React.useRef(
    new Animated.Value(0),
  )?.current;
  const [isFocused, setIsFocused] = React.useState(false);

  const [value, setValue] = React.useState('');

  const onFocus = () => {
    if (props.onFocus) props?.onFocus();

    setIsFocused(true);
    Animated.timing(placeholderAnimation, {
      toValue: isPad ? -20 : -15,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onBlur = () => {
    if (props.onBlur) props?.onBlur();

    setIsFocused(false);
    if (props.value) return;
    Animated.timing(placeholderAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View>
      <View
        style={[
          styles.container,

          {
            borderColor: props.error
              ? COLORS.danger.default
              : isFocused
              ? '#005BD4'
              : '#D9DBE9',
            backgroundColor: props.error
              ? COLORS.danger.bg
              : editable
              ? 'white'
              : 'rgba(217, 219, 233, 0.5)',
          },
        ]}>
        {props?.icon && (
          <View style={{marginLeft: wp(2), marginRight: isPad ? wp(3) : wp(0)}}>
            {props.icon}
          </View>
        )}
        {props.type === 'DEFAULT' ? null : (
          <Animated.Text
            style={{
              position: 'absolute',
              minWidth: wp(20),
              color: props.error
                ? COLORS.danger.default
                : isFocused
                ? '#005BD4'
                : '#6E7191',

              left: isPad
                ? wp(props?.icon ? 12 : 7)
                : wp(props?.icon ? (Platform.OS === 'android' ? 10 : 12) : 1.5),

              fontFamily: FONTS.MEDIUM,
              right: 0,
              fontSize: isPad ? 32 : SIZE.BODY_TEXT_MEDIUM,

              transform: [
                {
                  scale: placeholderAnimation.interpolate({
                    //@ts-ignore
                    inputRange: isPad ? [-wp(20), 0] : [-wp(15), 0],
                    //@ts-ignore
                    outputRange: isPad ? [0, 1] : [wp(0.2), 1],
                  }),
                },
                {
                  //@ts-ignore
                  translateY: isPad
                    ? placeholderAnimation.interpolate({
                        inputRange: [-wp(20), 0],

                        outputRange: [-wp(40), 1],
                      })
                    : placeholderAnimation,
                },
                {
                  translateX: placeholderAnimation.interpolate({
                    inputRange: isPad ? [-wp(20), 0] : [-wp(15), wp(0)],
                    outputRange: props.showClear
                      ? isPad
                        ? [-wp(20), wp(1)]
                        : Platform.OS === 'android'
                        ? [0, wp(8)]
                        : [wp(3), wp(8)]
                      : isPad
                      ? [-wp(55), 5]
                      : Platform.OS === 'android'
                      ? [-40, 5]
                      : [-30, 5],
                  }),
                },
              ],
            }}>
            {props.placeholder}
          </Animated.Text>
        )}

        <TextInput
          {...props}
          keyboardType={props.keyboardType || 'default'}
          onSubmitEditing={props.onSubmitEditing}
          ref={ref}
          cursorColor={COLORS.primary.default}
          //@ts-ignore
          value={props.value}
          onChangeText={props.onChange}
          autoCapitalize="none"
          autoCorrect={false}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor={COLORS.grayscale.label}
          placeholder={props.type ? props.placeholder : ''}
          style={[
            styles.input,
            {
              marginLeft: isPad && !props?.icon ? wp(-3) : 0,

              paddingLeft: isPad
                ? wp(props.icon ? 0.1 : 0)
                : wp(props?.icon ? 4 : 0),
              width: props?.rightComponent ? wp(70) : wp(80),
              marginTop: props.type === 'DEFAULT' ? hp(0) : hp(marginTop),
            },
          ]}
          returnKeyType={props.returnKeyType || 'default'}
          secureTextEntry={props.secureTextEntry}
          selectionColor={COLORS.primary.default}
        />
        {props.rightComponent && (
          <View style={{marginRight: wp(5)}}>{props.rightComponent}</View>
        )}
      </View>
      {props.error && (
        <Text style={styles.errorText}>{props.error.message}</Text>
      )}
    </Animated.View>
  );
};

export default React.forwardRef(Input);

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(0.8),
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#D9DBE9',

    paddingVertical: hp(2),
    paddingHorizontal: wp(7),

    //@ts-ignore
    height: isPad ? wp(10) : wp(15),
    width: 'auto',

    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: hp(10),

    fontSize: isPad ? 32 : SIZE.BODY_TEXT_MEDIUM,
    fontFamily: 'Poppins-Medium',
    color: COLORS.grayscale.header_weak,
    letterSpacing: wp(0.2),
    borderRadius: 12,
    flexGrow: 2,
  },
  errorText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: SIZE.MEDIUM,
    marginLeft: wp(2),
    color: COLORS.danger.default,
  },
});
