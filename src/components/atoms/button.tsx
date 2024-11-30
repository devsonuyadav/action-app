import * as React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../theme/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS, SIZE} from '../../theme/fonts';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'solid' | 'outlined';
  isLoading?: boolean;
  isDisabled?: boolean;
  rightIcon?: any;
  isRounded?: boolean;
  leftIcon?: any;
}

const Button = ({
  type,
  isDisabled,
  isLoading,
  onPress,
  title,
  rightIcon,
  isRounded = true,
  leftIcon,
}: ButtonProps) => {
  if (type === 'outlined')
    return (
      <TouchableOpacity
        disabled={isLoading || isDisabled}
        onPress={onPress}
        style={[
          styles.container,
          {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: isRounded ? 2 : 0,
            borderColor: COLORS.primary.default,
            opacity: isDisabled ? 0.5 : 1,
            borderRadius: isRounded ? 12 : 0,
          },
        ]}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary.default} />
        ) : (
          <View style={styles.buttonWrapper}>
            <Text
              style={[
                styles.title,
                {
                  color: COLORS.primary.default,

                  marginRight: rightIcon ? wp(4) : 0,
                },
              ]}>
              {title}
            </Text>
            {rightIcon}
          </View>
        )}
      </TouchableOpacity>
    );
  return (
    <TouchableOpacity
      disabled={isLoading || isDisabled}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        {opacity: isDisabled ? 0.5 : 1, borderRadius: isRounded ? 12 : 0},
      ]}>
      <View style={styles.buttonWrapper}>
        {isLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <>
            {leftIcon && leftIcon}
            <Text style={[styles.title, {marginRight: rightIcon ? wp(4) : 0}]}>
              {title}
            </Text>
            {rightIcon}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary.default,
    flex: 1,
    // padding: wp(4),
    overflow: 'hidden',

    minHeight: hp(7),
  },
  title: {
    color: 'white',
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: SIZE.BODY_TEXT_MEDIUM,
    letterSpacing: 0.75,
    // lineHeight: 25,
  },
  outlineText: {
    color: COLORS.primary.default,
    fontFamily: FONTS.SEMI_BOLD,
    letterSpacing: 0.75,
    fontSize: SIZE.BODY_TEXT_MEDIUM,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,
  },
});
