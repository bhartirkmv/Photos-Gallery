
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// 'users/fetch' is the base type inside the async thunk.
// From the function inside the asyncthunk , we are going to return the data 
// that we want to use in the userSlice.

// When we create thunk , this fetchUsers has three properties automatically 
// assigned to it.
// fetchUsers.pending ==== 'users/fetch/pending'
// fetchUsers.fulfilled === 'users/fetch/fulfilled'
// fetchUsers.rejected ==== 'users/fetch/rejected'
// --> Remember these are action types.
// The words pending , fulfilled and rejected have very special meaning.
const fetchUsers = createAsyncThunk('users/fetch', async () => {

  // We want to return the data that we want to use inside our userSlice.
  // Which is an array of users.
  const response = await axios.get('http://localhost:3005/users');

  // DEV ONLY!!!
  //await pause(2000);

  // We need to return the data we want to use in our reducer.
  return response.data;

});

// DEV ONLY !!!
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// }

export { fetchUsers };