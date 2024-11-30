import React, {useState} from 'react';
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
import {CustomModal} from '../components/atoms/modal';
import {useDispatch} from 'react-redux';
import {logout, setVerified} from '../redux/slices/auth';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HOME_DATA = [
  {
    id: 1,
    title: 'Punch In/Out',
    icon: require('../../assets/punch.png'),
    url: 'https://google.com',
  },
  {
    id: 2,
    title: 'Door Codes',
    icon: require('../../assets/door.png'),
    url: 'https://google.com',
  },
  {
    id: 3,
    title: 'Document Resources',
    icon: require('../../assets/doc.png'),
    url: 'https://google.com',
  },
  {
    id: 4,
    title: 'EZ-Ticket',
    icon: require('../../assets/ezticket.png'),
    url: 'https://google.com',
  },
];

const HomeCard = ({item}: {item: (typeof HOME_DATA)[0]}) => {
  return (
    <TouchableOpacity
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
  const [homeData, setHomeData] = useState(HOME_DATA);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const dispatch = useDispatch();
  const onLogout = async () => {
    // await AsyncStorage.removeItem('employeeId');
    setIsLogoutModalVisible(true);
  };

  const onLogoutConfirm = async () => {
    await AsyncStorage.removeItem('employeeId');
    dispatch(logout());
    dispatch(setVerified(false));
    setIsLogoutModalVisible(false);
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#154e87" />
      <View style={styles.header}>
        <Image source={require('../../assets/full-logo.jpg')} />
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
      <CustomModal
        isVisible={isLogoutModalVisible}
        onClose={() => setIsLogoutModalVisible(false)}>
        <View>
          <Text>Are you sure you want to logout?</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button title="Yes" onPress={onLogoutConfirm} />
            <Button title="No" onPress={() => setIsLogoutModalVisible(false)} />
          </View>
        </View>
      </CustomModal>
    </View>
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
