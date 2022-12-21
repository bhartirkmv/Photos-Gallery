import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

import { faker } from '@faker-js/faker';


const addUser = createAsyncThunk('users/add', async () => {
  const response = await axios.post('http://localhost:3005/users', {
    name: faker.name.fullName()
  })
  // Whatever we return over here is going to show up on the fulfilled
  // actions payload.
  return response.data;
});

export { addUser };