import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    profile: null,
    status: 'idle',
    error: null,
    success: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log('loginSuccess payload:', action.payload);
      const { token, profile } = action.payload.body; 
      state.token = token;
      state.profile = profile;
      console.log('Updated profile state:', state.profile);
      state.status = 'succeeded';
      state.error = null;
      state.success = 'Login successful';
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.success = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.success = 'Profile updated successfully';
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.status = 'idle';
      state.error = null;
      state.success = null;
    },
  },
});

export const { loginSuccess, loginFailure, setProfile, updateProfileSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
