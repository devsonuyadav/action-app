import {Platform} from 'react-native';
import api from './configure';
import {store} from '../redux/store';
import {
  setCurrentPage,
  setNextPage,
  setNotificationList,
  setNotificationUnreadCount,
  setReadNotification,
} from '../redux/slices/notification';

export const updateUserDeviceToken = async (token: string) => {
  try {
    const deviceType = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
    const employeeId = store.getState().auth.user.employeeId;
    const response = await api.post(
      `User/UpdateUserDeviceInfo?employeeId=${employeeId}&deviceType=${deviceType}&deviceToken=${token}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log({error});
    return null;
  }
};

export const postNotificationsRead = async (notificationId: string) => {
  try {
    const response = await api.post(
      `/Notification/MarkNotificationAsRead?notificationId=${notificationId}`,
    );
    getNotificationsCount();
    store.dispatch(setReadNotification(notificationId));
    console.log(response);
  } catch (error) {
    console.log('Failed to update read notification', error);
  }
};

export const getNotificationsCount = async () => {
  const employeeId = store.getState().auth.user.employeeId;

  const response = await api.get(
    `/Notification/GetUnReadNotificationCount?employeeId=${employeeId}`,
  );

  store.dispatch(setNotificationUnreadCount(response.data.message));
  console.log(JSON.stringify(response, null, 2));
};

export const getNotifications = async (page: string) => {
  try {
    const employeeId = store.getState().auth.user.employeeId;
    const response = await api.get(
      `/Notification/GetNotificationList?employeeId=${employeeId}&pageNumber=${page}`,
    );
    const prevData = store.getState().notification.notificationList;
    store.dispatch(
      setNotificationList([...prevData, ...response.data.notificationList]),
    );

    store.dispatch(setCurrentPage(response?.data?.currentPage));
    store.dispatch(setNextPage(response?.data?.nextPage));
    console.log({res: response.data});

    return response.data;
  } catch (error) {
    console.log({error});
    return null;
  }
};
