import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {COLORS, FONTS} from '../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {logout, setVerified} from '../redux/slices/auth';
import {openBrowser} from '../components/browser';
import IState from '../redux/store/type';
import Modal from '../components/atoms/modal';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeCard = ({item}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        openBrowser(item.url);
      }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
      }}>
      <Image source={item.icon} style={{height: 150, width: 150}} />
    </TouchableOpacity>
  );
};

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {user} = useSelector((store: IState) => store.auth);
  const HOME_DATA = [
    {
      id: 1,
      title: 'Punch In/Out',
      icon: require('../../assets/punch.png'),
      url: `https://google.com`,
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
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const modalRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const onLogout = async () => {
    // await AsyncStorage.removeItem('employeeId');
    console.log('present', modalRef.current);
    modalRef?.current?.present();
  };

  const onLogoutConfirm = async () => {
    await AsyncStorage.removeItem('employeeId');
    dispatch(logout());
    dispatch(setVerified(false));
  };
  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#154e87" />
        <View style={styles.header}>
          <Image source={require('../../assets/full-logo.png')} />
        </View>
        <FlatList
          data={homeData}
          renderItem={({item}) => <HomeCard item={item} />}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            padding: 12,
            flex: 1,
            backgroundColor: COLORS.primary.strong,
          }}
          style={{flex: 1}}
        />
        <View
          style={{
            padding: 12,
            backgroundColor: '#154e87',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
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
              style={{
                flex: 1,
                color: 'white',
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
              }}
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
              <Text
                style={{
                  color: COLORS.primary.strong,
                  fontSize: 12,
                  fontFamily: FONTS.SEMI_BOLD,
                }}>
                LOG
              </Text>
              <Text
                style={{
                  color: COLORS.primary.strong,
                  fontSize: 12,
                  fontFamily: FONTS.SEMI_BOLD,
                }}>
                OUT
              </Text>
            </View>
            <MaterialCommunityIcons
              name="logout"
              size={wp(9)}
              color={COLORS.primary.strong}
            />
          </Pressable>
        </View>
      </View>
      <Modal ref={modalRef}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: FONTS.SEMI_BOLD,
              marginBottom: 20,
              color: COLORS.primary.strong,
            }}>
            Are you sure you want to logout?
          </Text>

          <View style={{flexDirection: 'row', gap: 20}}>
            <TouchableOpacity
              onPress={onLogoutConfirm}
              style={{
                backgroundColor: COLORS.primary.strong,
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 8,
              }}>
              <Text style={{color: 'white', fontFamily: FONTS.SEMI_BOLD}}>
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                modalRef?.current?.dismiss();
              }}
              style={{
                backgroundColor: '#e0e0e0',
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: COLORS.primary.strong,
                  fontFamily: FONTS.SEMI_BOLD,
                }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#154e87',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
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
});
