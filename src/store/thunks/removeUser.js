
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// We need to put in the async function, because we are making a network request
// inside this function.
// The async function is going to be called with the user we are trying to delete.
const  removeUser = createAsyncThunk('users/remove', async (user) => {

  await axios.delete(`http://localhost:3005/users/${user.id}`);

  // FIX !!!
  // We need to make super clear to our reducer, which user we want to delete.
  // Whenever we send a delete request to json-server , the response that we get is an 
  // empty object. The data property does not have anything.
  return user;
});

export { removeUser };

