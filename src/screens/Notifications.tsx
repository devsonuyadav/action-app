import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

// Dummy notification data
const notifications = [
  {
    id: '1',
    type: 'like',
    user: 'John Doe',
    action: 'liked your post',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: 'Jane Smith',
    action: 'commented on your photo',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '3',
    type: 'follow',
    user: 'Mike Johnson',
    action: 'started following you',
    time: '3 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'mention',
    user: 'Sarah Wilson',
    action: 'mentioned you in a comment',
    time: '1 day ago',
    read: true,
  },
];

const NotificationItem = ({item, onPress}: any) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.notificationItem, !item.read && styles.unread]}>
      <View style={styles.contentContainer}>
        {!item.read && <View style={styles.unreadDot} />}
        <Text style={[styles.text, !item.read && styles.unreadText]}>
          <Text style={styles.username}>{item.user}</Text> {item.action}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Notifications = ({navigation}: any) => {
  const handleNotificationPress = (notification: any) => {
    navigation.navigate('NotificationDetails', {notification});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
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
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  unread: {
    backgroundColor: '#f0f9ff',
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
    color: '#666',
    marginBottom: 4,
  },
  unreadText: {
    color: '#333',
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
});

export default Notifications;
