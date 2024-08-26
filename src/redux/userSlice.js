import { createSlice } from '@reduxjs/toolkit';

// Le slice Redux pour gérer l'état de l'utilisateur.
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    profile: null,
    error: null,
    success: null,
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
  },
  reducers: {
    loginLoading: (state)=> {
      state.status = 'loading';
      state.error = null;
      state.success = null;
    },

    // Action pour gérer la réussite de la connexion.
    loginSuccess: (state, {payload: {token,profile}}) => {
      state.profile = profile;
      state.token = token;
      state.success = 'Login successfully';
      state.error = null;
      state.status = 'succeeded';
    },

    // Action pour gérer l'échec de la connexion.
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.success = null;
    },

    updateProfileLoading: (state)=> {
      state.status = 'loading';
      state.error = null;
      state.success = null;
    },

    // Action pour gérer la réussite de la mise à jour du profil.
    updateProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.success = 'Profile updated successfully';
    },

    updateProfileFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.success = null;
    },

    // Action pour déconnecter l'utilisateur et réinitialiser l'état.
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.status = 'idle';
      state.error = null;
      state.success = null;
    },
  },
});

export const { loginLoading, loginSuccess, loginFailure,updateProfileLoading, updateProfileSuccess,updateProfileFailure, logout } = userSlice.actions;

export default userSlice.reducer;
