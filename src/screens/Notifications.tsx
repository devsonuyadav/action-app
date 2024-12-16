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
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: 'Jane Smith',
    action: 'commented on your photo',
    time: '1 hour ago',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    read: true,
  },
  {
    id: '3',
    type: 'follow',
    user: 'Mike Johnson',
    action: 'started following you',
    time: '3 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    read: false,
  },
  {
    id: '4',
    type: 'mention',
    user: 'Sarah Wilson',
    action: 'mentioned you in a comment',
    time: '1 day ago',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    read: true,
  },
];

const NotificationItem = ({item, onPress}: any) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.notificationItem, !item.read && styles.unread]}>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
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
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});

export default Notifications;
