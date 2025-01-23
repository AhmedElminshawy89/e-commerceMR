import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
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
    saveCategory: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/category/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/category/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    delCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/category/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminCategory: builder.query({
      query: (page) => ({
        url: `/admin/category/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveCategoryMutation,
  useUpdateCategoryMutation,
  useDelCategoryMutation,
  useShowAllAdminCategoryQuery,
} = categoriesApi;
