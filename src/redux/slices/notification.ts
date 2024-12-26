import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface INotification {
  id: string;
  title: string;
  details: string;
  createdOn: string;
  isRead: boolean;
}

export interface INotificationState {
  notificationList: INotification[];
  notificationUnreadCount: number;
}

const initialState: INotificationState = {
  notificationList: [],
  notificationUnreadCount: 0,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationList: (state, action: PayloadAction<INotification[]>) => {
      state.notificationList = action.payload;
    },
    setNotificationUnreadCount: (state, action: PayloadAction<number>) => {
      state.notificationUnreadCount = action.payload;
    },
  },
});

export const {setNotificationList, setNotificationUnreadCount} =
  notificationSlice.actions;
export default notificationSlice.reducer;
