import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = document.cookie.split('; ').find(row => row.startsWith('tokenAdmin='))?.split('=')[1];
      const language = localStorage.getItem('userLanguage') || "EN";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept-Language", language);
      headers.set("API_PASSWORD", api_key);
      return headers;
    },
  }),
    endpoints: (builder) => ({
    addAdmin: builder.mutation({
      query: (newAdmin) => ({
        url: '/admin/save',
        method: 'POST',
        body: newAdmin,
      }),
    }),
      loginAdmin: builder.mutation({
        query: (admin) => ({
          url: '/admin/login',
          method: 'POST',
          body: admin,
        }),
      }),
      forgetPasswordAdmin: builder.mutation({
        query: (admin) => ({
          url: '/admin/updatePassword',
          method: 'POST',
          body: admin,
        }),
      }),
      delAdmin: builder.mutation({
        query: (id) => ({
          url: `/admin/delete/${id}`,
          method: 'GET',
        }),
      }),
      updateAdmin: builder.mutation({
        query: (admin) => ({
          url: '/admin/updateProfile',
          method: 'POST',
          body: admin,
        }),
      }),
      showAdminType: builder.query({
        query: ({type,page}) => ({
          url: `/admin/showByType/${type}?page=${page}`,
          method: 'GET',
        }),
      }),
      showAdminSearch: builder.query({
        query: (name) => ({
          url: `/admin/searchAdmins?name=${name}`,
          method: 'GET',
        }),
      }),
      showAdminSalesByCode: builder.query({
        query: (name) => ({
          url: `/admin/searchAdmins?name=${name}`,
          method: 'GET',
        }),
      }),
  }),
});

export const { 
    useAddAdminMutation,
    useLoginAdminMutation,
    useForgetPasswordAdminMutation,
    useUpdateAdminMutation,
    useShowAdminTypeQuery,
    useDelAdminMutation,
    useLazyShowAdminSearchQuery,
} = adminApi;
