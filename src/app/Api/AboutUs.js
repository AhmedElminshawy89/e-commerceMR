import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const AboutUsApi = createApi({
  reducerPath: 'AboutUsApi',
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
    saveAbout: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/about/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateAbout: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/about/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    delAbout: builder.mutation({
      query: (id) => ({
        url: `/admin/about/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminAbout: builder.query({
      query: (page) => ({
        url: `/admin/about/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveAboutMutation,
  useUpdateAboutMutation,
  useDelAboutMutation,
  useShowAllAdminAboutQuery,
} = AboutUsApi;
