import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const whyUsApi = createApi({
  reducerPath: 'whyUsApi',
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
    saveWhyUs: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/why/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateWhyUs: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/why/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    delWhyUs: builder.mutation({
      query: (id) => ({
        url: `/admin/why/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminWhyUs: builder.query({
      query: (page) => ({
        url: `/admin/why/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
    showWhyUs: builder.query({
      query: () => ({
        url: `/admin/why/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveWhyUsMutation,
  useUpdateWhyUsMutation,
  useDelWhyUsMutation,
  useShowAllAdminWhyUsQuery,
  useShowWhyUsQuery
} = whyUsApi;
