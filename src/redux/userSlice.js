import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    profile: null,
    error: null,
    success: null,
    statue: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token, profile } = action.payload.body; 
      state.token = token;
      state.profile = profile;
      state.success = 'Login successful';
      state.error = null;
      state.statue = 'succeeded';
    },
    loginFailure: (state, action) => {
      state.statue = 'failed';
      state.error = action.payload;
      state.success = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.statue = 'succeeded';
    },
    updateProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.success = 'Profile updated successfully';
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.statue = 'idle';
      state.error = null;
      state.success = null;
    },
  },
});

export const { loginSuccess, loginFailure, setProfile, updateProfileSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
