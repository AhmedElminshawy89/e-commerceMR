import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const AdvertisingApi = createApi({
  reducerPath: 'AdvertisingApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
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
    saveAdvertise: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/advertise/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateAdvertise: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/advertise/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    updateStatusAdvertise: builder.mutation({
        query: ( id ) => ({
          url: `/admin/advertise/updateStatus/${id}`,
          method: 'POST',
      }),
    }),
    delAdvertise: builder.mutation({
      query: (id) => ({
        url: `/admin/advertise/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminAdvertise: builder.query({
      query: (page) => ({
        url: `/admin/advertise/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
 useSaveAdvertiseMutation,
 useUpdateAdvertiseMutation,
 useUpdateStatusAdvertiseMutation,
 useDelAdvertiseMutation,
 useShowAllAdminAdvertiseQuery,
} = AdvertisingApi;
