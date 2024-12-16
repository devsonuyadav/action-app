import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const LocationPermission = ({navigation}: any) => {
  const handleLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === RESULTS.GRANTED) {
        navigation.replace('Home');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/location-icon.png')} // Add your location icon
          style={styles.image}
        />

        <Text style={styles.title}>Enable Location Services</Text>

        <Text style={styles.description}>
          We need your location to provide you with the best nearby experiences
          and recommendations
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLocationPermission}>
          <Text style={styles.buttonText}>Enable Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Home')}>
          <Text style={styles.skipButtonText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LocationPermission;
