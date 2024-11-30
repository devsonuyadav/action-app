import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IUserState {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
  middleName: string;
  loginName: string;
  cellPhoneNumber: string;
  company: string;
  employeeId: number;
  verificationCode: string;
  authorizationCode: string;
  departmentFk: string;
  checkInOut: number;
  status: boolean;
  statusCode: number;
  errorMessage: string | null;
}

export interface IAuthState {
  user: IUserState;
  isLoading: boolean;
  isVerified: boolean;
}

const initialState: IAuthState = {
  user: {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    lastLogin: '',
    middleName: '',
    loginName: '',
    cellPhoneNumber: '',
    company: '',
    employeeId: 0,
    verificationCode: '',
    authorizationCode: '',
    departmentFk: '',
    checkInOut: 0,
    status: false,
    statusCode: 0,
    errorMessage: null,
  },
  isLoading: false,
  isVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = initialState.user;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.user.errorMessage = action.payload;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
  },
});

export const {setUser, logout, setLoading, setError, setVerified} =
  authSlice.actions;
export default authSlice.reducer;