// src/screens/NotificationDetail.tsx
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {openBrowser} from '../components/browser';
import {postNotificationsRead} from '../services/notification';

const NotificationDetail = ({route, navigation}: any) => {
  const {notification} = route.params;

  const renderTextWithLinks = (text: string) => {
    const urlPattern =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    const parts = text.split(urlPattern);
    const matches = text.match(urlPattern) || [];

    return (
      <Text style={styles.detailsText}>
        {parts.reduce((acc: React.ReactNode[], part, index) => {
          acc.push(<Text key={`text-${index}`}>{part}</Text>);

          if (matches[index]) {
            acc.push(
              <Text
                key={`link-${index}`}
                style={styles.link}
                onPress={() => openBrowser(matches[index])}>
                {matches[index]}
              </Text>,
            );
          }

          return acc;
        }, [])}
      </Text>
    );
  };

  useEffect(() => {
    postNotificationsRead(notification.id);
  }, [notification]);

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
        <View>
          <Text style={styles.username}>{notification.title}</Text>
          <View style={styles.detailsContainer}>
            {renderTextWithLinks(notification.details)}
          </View>
          <Text style={styles.time}>
            {moment(notification.createdOn).fromNow()}
          </Text>
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
    alignItems: 'flex-start',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
  detailsContainer: {
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 18,
    lineHeight: 24,
  },
  link: {
    color: COLORS.primary.default,
    textDecorationLine: 'underline',
    fontSize: 18,
    lineHeight: 24,
  },
});

export default NotificationDetail;
