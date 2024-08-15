import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'initial', // 'initial', 'loading', 'succeeded', 'error'
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginExecute(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    loginError(state, action) {
      state.status = 'error';
      state.error = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.status = 'initial';
    },
  },
});

export const { loginExecute, loginSuccess, loginError, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
