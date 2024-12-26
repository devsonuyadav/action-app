import {Platform} from 'react-native';
import api from './configure';
import {store} from '../redux/store';
import {
  setCurrentPage,
  setNextPage,
  setNotificationList,
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

    store.dispatch(setCurrentPage(response.data.currentPage));
    store.dispatch(setNextPage(response.data.nextPage));
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log({error});
    return null;
  }
};
