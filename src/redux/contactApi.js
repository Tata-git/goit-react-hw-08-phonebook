import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#using-auto-generated-react-hooks
export const contactApi = createApi({
  reducerPath: 'contacts',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63186b6af6b281877c6bbd34.mockapi.io/api/v1/',
  }),
  tagTypes: ['Contact'],

  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),
    // https://redux-toolkit.js.org/rtk-query/usage/mutations#overview
    addContact: builder.mutation({
      query: newContact => ({
        url: '/contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const contactsSlice = createSlice({
  name: 'phonebook',
  initialState: {
    filter: '',
  },
  reducers: {
    viewContact(state, { payload }) {
      state.filter = payload;
    },
  },
});
export const { viewContact } = contactsSlice.actions;

// Selectors
export const getFilterValue = state => state.phonebook.filter;

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactApi;
