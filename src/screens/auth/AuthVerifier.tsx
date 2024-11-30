import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {COLORS} from '../../theme';

const AuthVerifier = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary.strong}
      />
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <Image
            source={require('../../../assets/appicon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ActivityIndicator size="large" color={COLORS.primary.strong} />
          <Text style={styles.text}>Verifying your credentials...</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.strong || '#ffffff',
  },
  loaderContainer: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.primary.strong,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 12,
  },
});

export default AuthVerifier;
