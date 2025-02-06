import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const ContactUsSecApi = createApi({
  reducerPath: 'ContactUsSecApi',
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
    saveContactUs: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/contactUs/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateContactUs: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/contactUs/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    delContactUs: builder.mutation({
      query: (id) => ({
        url: `/admin/contactUs/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminContactUs: builder.query({
      query: (page) => ({
        url: `/admin/contactUs/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
    showContactUs: builder.query({
      query: () => ({
        url: `/admin/contactUs/show`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveContactUsMutation,
  useUpdateContactUsMutation,
  useDelContactUsMutation,
  useShowAllAdminContactUsQuery,
  useShowContactUsQuery,
} = ContactUsSecApi;
