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
  notificationUnreadCount: string;
  currentPage: string;
  nextPage: string;
}

const initialState: INotificationState = {
  notificationList: [],
  notificationUnreadCount: '0',
  currentPage: '1',
  nextPage: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationList: (state, action: PayloadAction<INotification[]>) => {
      state.notificationList = action.payload;
    },
    setNotificationUnreadCount: (state, action: PayloadAction<string>) => {
      state.notificationUnreadCount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setNextPage: (state, action: PayloadAction<string>) => {
      state.nextPage = action.payload;
    },
    setReadNotification: (state, action: PayloadAction<string>) => {
      state.notificationList = state.notificationList.map(notification =>
        notification.id === action.payload
          ? {...notification, isRead: true}
          : notification,
      );
    },
  },
});

export const {
  setNotificationList,
  setNotificationUnreadCount,
  setCurrentPage,
  setNextPage,
  setReadNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
