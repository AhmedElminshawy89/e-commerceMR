import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = document.cookie.split('; ')?.find(row => row.startsWith('token='))?.split('=')[1];
      const language = (localStorage.getItem('userLanguage') || "en").toLowerCase();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept-Language", language);
      headers.set("API_PASSWORD", api_key);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    saveContact: builder.mutation({
      query: (newContact) => ({
        url: '/admin/contact/save',
        method: 'POST',
        body: newContact,
      }),
    }),
    saveSubscribe: builder.mutation({
        query: (newSubscribe) => ({
          url: '/admin/subscribe/save',
          method: 'POST',
          body: newSubscribe,
        }),
      }),
    showAllAdminContact: builder.query({
      query: (page) => ({
        url: `/admin/contact/?page=${page}`,
        method: 'GET',
      }),
    }),
    showAllAdminContactSearch: builder.query({
      query: (name) => ({
        url: `/admin/contact/searchContacts/?name=${name}`,
        method: 'GET',
      }),
    }),
    showAllAdminSubscribe: builder.query({
        query: (page) => ({
          url: `/admin/subscribe/?page=${page}`,
          method: 'GET',
        }),
      }),
  }),
});

export const {
  useSaveContactMutation,
  useShowAllAdminContactQuery,
  useSaveSubscribeMutation,
  useShowAllAdminSubscribeQuery,
  useLazyShowAllAdminContactSearchQuery,

} = contactApi;
