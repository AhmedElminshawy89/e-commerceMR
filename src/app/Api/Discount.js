import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const discountApi = createApi({
  reducerPath: 'discountApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
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
    saveDiscount: builder.mutation({
      query: (newDiscount) => ({
        url: '/admin/cashBack/store',
        method: 'POST',
        body: newDiscount,
      }),
    }),
    updateDiscount: builder.mutation({
      query: ({ id, updateDiscount }) => ({
        url: `/admin/cashBack/update/${id}`,
        method: 'POST',
        body: updateDiscount,
      }),
    }),
    delDiscount: builder.mutation({
      query: (id) => ({
        url: `/admin/cashBack/delete/${id}`,
        method: 'GET',
      }),
    }),
    showDiscount: builder.query({
      query: () => ({
        url: `/admin/cashBack/`,
        method: 'GET',
      }),
    }),
    showDiscountToUser: builder.query({
      query: ({code,userId}) => ({
        url: `/admin/cashBack/showCashbackToUser/${code}/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveDiscountMutation,
  useUpdateDiscountMutation,
  useDelDiscountMutation,
  useShowDiscountQuery,
  useShowDiscountToUserQuery,
} = discountApi;
