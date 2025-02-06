import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
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
    saveServices: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/services/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateServices: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/services/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    delServices: builder.mutation({
      query: (id) => ({
        url: `/admin/services/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminServices: builder.query({
      query: (page) => ({
        url: `/admin/services/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
    showServices: builder.query({
      query: () => ({
        url: `/admin/services/show`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveServicesMutation,
  useUpdateServicesMutation,
  useDelServicesMutation,
  useShowAllAdminServicesQuery,
  useShowServicesQuery,
} = servicesApi;
