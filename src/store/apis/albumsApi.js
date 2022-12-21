
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// In this createApi we will be passing in the configuration object.
const albumsApi = createApi({

  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005'
  }),
  endpoints (builder) {

    // The returned object is going to contain a bunch of additional information that 
    // is going to detail the different kinds of requests we want to make
    // The goal of the query parameter is to specify how exactly to make the request.
    return {
      
      fetchAlbums: builder.query({
        // We do not want to hardcode the tags.
        // The third argument comes from whatever we called the hook 
        // with inside of our component.
        providesTags: (result, error, user) => {
          // Result contains the data that we are fetching.
          const tags = result.map((album) => {
            return {type: 'Album', id: album.id};
          });

          tags.push({ type: 'UsersAlbums', id: user.id});
          return tags;
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET'
          };
        }
      }),
      removeAlbum : builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id}];
        },

        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          }
        }
      }),
      addAlbum : builder.mutation({
        invalidatesTags: (result, error, user) => {
          
          return [{type: 'UsersAlbums', id: user.id}];
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            }
          }
        }
      })
    };
  }

});

// When we create a new endpoint , a new set of automatically generated hooks 
// is created for us.
export const { useFetchAlbumsQuery , useAddAlbumMutation , useRemoveAlbumMutation } = albumsApi;
export { albumsApi };