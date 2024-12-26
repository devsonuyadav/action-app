import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme';
import moment from 'moment';
import {useSelector} from 'react-redux';
import IState from '../redux/store/type';
import {getNotifications} from '../services/notification';

const NotificationItem = ({item, onPress}: any) => (
  <TouchableOpacity style={{margin: 10}} onPress={onPress}>
    <View style={[styles.notificationItem, !item.isRead && styles.unread]}>
      <View style={styles.contentContainer}>
        {!item.isRead && <View style={styles.unreadDot} />}
        <View style={styles.text}>
          <Text style={[styles.username, !item.read && styles.unreadText]}>
            {item.title}
          </Text>
          <Text>{item.details}</Text>
        </View>
        <Text style={styles.time}>{moment(item.createdOn).fromNow()}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Notifications = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const {notificationList, currentPage, nextPage} = useSelector(
    (store: IState) => store.notification,
  );

  const filteredNotifications = notificationList.filter(notification =>
    notification?.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleNotificationPress = (notification: any) => {
    navigation.navigate('NotificationDetails', {notification});
  };

  const fetchNotifications = async () => {
    if (nextPage !== '') {
      await getNotifications((parseInt(currentPage) + 1).toString());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={'black'}
          placeholder="Search notifications..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredNotifications}
        onEndReached={searchQuery ? () => {} : fetchNotifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NotificationItem
            item={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: COLORS.primary.default,
  },
  header: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 48,
    textAlign: 'center',
  },
  backButton: {
    padding: 16,
    marginRight: -16,
  },
  notificationItem: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  unread: {
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    paddingLeft: 16,
  },
  unreadDot: {
    position: 'absolute',
    left: 0,
    top: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginTop: -4,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '500',
  },
  username: {
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary.weak,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default Notifications;
