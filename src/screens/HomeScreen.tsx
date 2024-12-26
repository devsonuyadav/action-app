/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
  AppState,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IState from '../redux/store/type';
import {RootStackParamList} from '../navigation/types';
import {logout, setVerified} from '../redux/slices/auth';

import {COLORS, FONTS} from '../theme';
import Modal from '../components/atoms/modal';

import {GeolocationService} from '../services/geolocation';
import {openBrowser} from '../components/browser';
import IState from '../redux/store/type';
import Modal from '../components/atoms/modal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  GeolocationService,
  requestLocationPermission,
} from '../services/geolocation';
import {
  configurePushNotification,
  requestPushNotificationPermission,
} from './services/push-notification';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {user} = useSelector((store: IState) => store.auth);
  const [latlng, setLatlng] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const getUrl = () => {
    return `https://ez-schedules.com/EmployeeMobilePunchInOut.aspx?Eid=${
      user.employeeId
    }&Lat=${latlng.latitude * user.employeeId}&Long=${
      latlng.longitude * user.employeeId
    }`;
  };

  const HOME_DATA = [
    {
      id: 1,
      title: 'Punch In/Out',
      icon: require('../../assets/punch.png'),
      url: `https://ez-schedules.com/EmployeeMobilePunchInOut.aspx?Eid=${
        user.employeeId
      }&Lat=${latlng.latitude * user.employeeId}&Long=${
        latlng.longitude * user.employeeId
      }`,
      locationEnabled: latlng.latitude !== 0 && latlng.longitude !== 0,
      locationRequired: true,
      getUrl: getUrl,
    },
    {
      id: 2,
      title: 'Door Codes',
      icon: require('../../assets/door.png'),
      url: `https://ez-schedules.com/DoorCodes.aspx?Eid=${user.employeeId}`,
    },
    {
      id: 3,
      title: 'Document Resources',
      icon: require('../../assets/doc.png'),
      url: 'https://ez-schedules.com/DocumentResourceMobile.aspx',
    },
    {
      id: 4,
      title: 'EZ-Ticket',
      icon: require('../../assets/ezticket.png'),
      url: `https://ez-ticketsys.com/MainMenuMobile.aspx?Eid=${user.employeeId}`,
    },
  ];

  const [homeData, setHomeData] = useState(HOME_DATA);

  const modalRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = async () => {
      setLocationLoading(true);
      GeolocationService.getCurrentPosition()
        .then(position => {
          setLatlng({
            latitude: position.latitude,
            longitude: position.longitude,
          });
        })
        .catch(error => {
          Alert.alert(
            error.message,
            'Please enable location services to use this feature from global settings',
          );
          console.log('error', error);
        })
        .finally(async () => {
          setLocationLoading(false);
        });
      await configurePushNotification();
    };

    // Initial location fetch
    getLocation();

    // Add AppState listener
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // Re-fetch location when app comes to foreground
        getLocation();
      }
    });

    // Cleanup subscription
    return () => {
      subscription.remove();
    };
  }, []);
  const onLogout = async () => {
    modalRef?.current?.present();
  };

  const onLogoutConfirm = async () => {
    await AsyncStorage.removeItem('employeeId');
    dispatch(logout());
    dispatch(setVerified(false));
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const HomeCard = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item?.locationRequired && latlng.latitude === 0) {
            Alert.alert(
              'Location Required',
              'Please enable location services to use this feature',
              [
                {
                  text: 'Open Settings',
                  onPress: () => {
                    // Open device settings
                    Linking.openSettings();
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
            );
            return;
          }
          if (item.locationRequired) {
            const url = getUrl();
            openBrowser(url);
          } else {
            openBrowser(item.url);
          }
        }}
        style={{
          width: '40%',
          margin: 20,
        }}>
        <Image
          source={item.icon}
          style={{height: wp(35), width: wp(35)}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#154e87" />
        <View style={styles.header}>
          <View style={{width: '100%', height: 100, marginTop: 30}}>
            <Image
              source={require('../../assets/full-logo.png')}
              style={{width: '100%', height: 100}}
              resizeMode="contain"
            />
          </View>
        </View>
        <View>
          {locationLoading && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#154e87" />
              <Text
                style={{
                  color: COLORS.primary.strong,
                  fontFamily: FONTS.SEMI_BOLD,
                }}>
                Loading Location...
              </Text>
            </View>
          )}
        </View>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'flex-start',
          }}
          data={[...homeData]}
          renderItem={({item}) => <HomeCard item={item} />}
          numColumns={2}
          bounces={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('Notifications' as never)}>
          <MaterialCommunityIcons name="bell" size={24} color={'#FFFF'} />
          <Text style={styles.notificationBadge}>24</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={styles.searchContainer}>
            <AntDesign
              name="search1"
              size={wp(5)}
              color="white"
              style={{marginRight: 10}}
            />
            <TextInput
              placeholder="SEARCH"
              placeholderTextColor="#d0dae4"
              style={styles.searchInput}
              selectionColor={'white'}
              onChangeText={text => {
                const filteredData = HOME_DATA.filter(item =>
                  item.title.toLowerCase().includes(text.toLowerCase()),
                );
                setHomeData(filteredData);
              }}
            />
          </View>

          <Pressable style={styles.logoutContainer} onPress={onLogout}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.logoutText}>LOG</Text>
              <Text style={styles.logoutText}>OUT</Text>
            </View>
            <MaterialCommunityIcons
              name="logout"
              size={wp(9)}
              color={COLORS.primary.strong}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <Modal
        ref={modalRef}
        children={
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>

            <View style={{flexDirection: 'row', gap: 20}}>
              <TouchableOpacity
                onPress={onLogoutConfirm}
                style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  modalRef?.current?.dismiss();
                }}
                style={styles.modalButton}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#154e87',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '20%',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '70%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#456c95',
  },
  contentContainer: {
    padding: 12,
    minHeight: '100%',
    backgroundColor: COLORS.primary.strong,
    alignItems: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#154e87',
    padding: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  logoutText: {
    color: COLORS.primary.strong,
    fontSize: 12,
    fontFamily: FONTS.SEMI_BOLD,
  },
  modalText: {
    fontSize: 18,
    fontFamily: FONTS.SEMI_BOLD,
    marginBottom: 20,
    color: COLORS.primary.strong,
  },
  modalButton: {
    backgroundColor: COLORS.primary.strong,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontFamily: FONTS.SEMI_BOLD,
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    backgroundColor: COLORS.primary.default,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notificationBadge: {
    top: 1,
    right: 2,
    height: 20,
    minWidth: 20,
    fontSize: 12,
    color: '#FFFF',
    borderRadius: 10,
    fontWeight: '700',
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: COLORS.warning.default,
  },
});
