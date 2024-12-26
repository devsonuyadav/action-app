import {Platform} from 'react-native';
import api from './configure';
import {store} from '../redux/store';

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
