// src/screens/NotificationDetail.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const NotificationDetail = ({route, navigation}: any) => {
  const {notification} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Detail</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#007AFF',
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
