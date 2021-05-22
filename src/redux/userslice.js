import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import Swal from 'sweetalert2';

const baseUrl = 'https://group-e-jobfinder-api.herokuapp.com/api/v1';

const initialState = {
  allUsers: null,
  isGettingAllUsers: false,
  getUsersError: null,
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (token, { rejectWithValue }) => {
    try {
      const allUsers = await axios({
        method: 'get',
        url: `${baseUrl}/admin/get-users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return allUsers.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,

  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isGettingAllUsers = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.isGettingAllUsers = false;
      state.allUsers = payload;
      state.getUsersError = null;
    },
    [getAllUsers.rejected]: (state, { error }) => {
      state.isGettingAllUsers = false;
      state.allUsers = null;
      state.getUsersError = error;
    },
  },
});


export const selectAllUsers = state => state.users.allUsers;
export const selectIsGettingAllUsers = state => state.users.isGettingAllUsers;
export const selectGetUserErrMsg = state => state.users.getUsersError;

export default usersSlice.reducer;