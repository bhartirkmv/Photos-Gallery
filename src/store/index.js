// This is also going to be a central export point for 
// everything related to our redux stuff.

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";


const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath] : albumsApi.reducer,
    [photosApi.reducerPath] : photosApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  }
});

// TEMPORARY< JUST TO TEST IN BROWSER
//window.store = store;

setupListeners(store.dispatch);

export {store};

// The below line means find everything that is exportable from the 
// thunks and export that from index.js as well.
export * from './thunks/fetchUsers';

export * from './thunks/addUser';

export * from './thunks/removeUser';

export { useFetchAlbumsQuery , useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsApi';
export { useFetchPhotosQuery , useAddPhotoMutation , useRemovePhotoMutation } from './apis/photosApi';