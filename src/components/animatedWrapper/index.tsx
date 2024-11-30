import * as React from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface IProps {
  header: React.JSX.Element;
  body: React.JSX.Element;
  onFocusBodyHeight?: number;
  minimizeHeader?: boolean;
  height?: number;
  headerMarginTop?: number;
}

const AnimatedFormWrapper = ({
  header,
  body,
  onFocusBodyHeight = 9,
  minimizeHeader = false,
  height = 100,
  headerMarginTop = 14,
}: IProps) => {
  const containerHeight = React.useRef(new Animated.Value(0)).current;
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;

    let show: any;
    let hide: any;

    const handleShow = () => {
      if (isMounted.current) {
        coverScreen();
      }
    };

    const handleHide = () => {
      if (isMounted.current) {
        uncoverScreen();
      }
    };

    show = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      handleShow,
    );
    hide = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      handleHide,
    );

    return () => {
      isMounted.current = false;
      show.remove();
      hide.remove();
    };
  }, []);

  const coverScreen = () => {
    Animated.spring(containerHeight, {
      useNativeDriver: true,
      toValue: -hp(onFocusBodyHeight),
      bounciness: 10,
    }).start();
  };
  const uncoverScreen = () => {
    Animated.spring(containerHeight, {
      useNativeDriver: true,
      toValue: 0,
      bounciness: 10,
    }).start();
  };

  const transform = {
    transform: [
      {
        translateY: containerHeight.interpolate({
          inputRange: [-hp(onFocusBodyHeight), 0],

          outputRange: [-hp(5), 0],
        }),
      },
      {
        scale: minimizeHeader
          ? containerHeight.interpolate({
              inputRange: [-hp(onFocusBodyHeight), 0],

              outputRange: [0, 1],
            })
          : 1,
      },
    ],
  };
  return (
    <>
      <Animated.View
        style={[
          styles.imageContainer,
          transform,
          {marginTop: `${headerMarginTop}%`},
        ]}>
        {header}
      </Animated.View>

      <Animated.View
        style={[
          styles.loginContainer,

          {transform: [{translateY: containerHeight}], height: `${height}%`},
        ]}>
        {body}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: hp(14),
  },
  loginContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: wp(7),
    borderTopEndRadius: wp(7),
    overflow: 'hidden',
    alignItems: 'flex-start',
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -hp(40),
  },
});

export default AnimatedFormWrapper;
