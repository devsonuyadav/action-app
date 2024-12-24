// src/screens/NotificationDetail.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationDetail = ({route, navigation}: any) => {
  const {notification} = route.params;

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

      <View style={styles.content}>
        <Image source={{uri: notification.avatar}} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{notification.user}</Text>
          <Text style={styles.action}>{notification.action}</Text>
          <Text style={styles.time}>{notification.time}</Text>
        </View>
      </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  action: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
});

export default NotificationDetail;
