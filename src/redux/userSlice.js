import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  },
  userStatus: false, 
  status: 'initial', 
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userExecute(state) {
      state.status = 'loading';
      state.error = null;
    },
    userSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
      state.userStatus = true;
    },
    userError(state, action) {
      state.status = 'error';
      state.error = action.payload;
      state.userStatus = false;
    },
    logoutUser(state) {
      state.user = initialState.user;
      state.userStatus = false;
      state.status = 'initial';
    },
  },
});

export const { userExecute, userSuccess, userError, logoutUser } = userSlice.actions;
export default userSlice.reducer;
