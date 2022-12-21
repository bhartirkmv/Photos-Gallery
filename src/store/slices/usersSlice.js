
// The goal of this sclice is to manage everything related to the users.

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from '../thunks/addUser';
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    error: null
  },
  extraReducers (builder) {

    // A huge part of redux toolkit is to not to have to write out the action types
    // manually
    builder.addCase(fetchUsers.pending, (state, action) => {
      // Update our state object however appropriate 
      // to show the user that we are loading data
      state.isLoading = true;
    });


    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Update our state object however appropriate 
      // to show the user that we have the data
      state.isLoading = false;
      state.data = action.payload;
    });


    builder.addCase(fetchUsers.rejected, (state, action) => {
      // To show the user that there is some error.
      // Whenever there is an error in the thunk, an error property
      // is automatically assigned to the action object.
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(addUser.pending, (state,action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading =false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading= true;
    });

    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // We have to manually go into the array.Find the user that was deleted
      // And then delete the user from the state
      // How do we know which particular user we are supposed to delete.
      // Since from thunk we are returning user. On our action.payload we will 
      // the user.
      state.data = state.data.filter((user) => {
        return (user.id !== action.payload.id);
      })


    });

    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  } 

  
});

export const usersReducer = usersSlice.reducer;