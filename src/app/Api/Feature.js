import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const featureApi = createApi({
  reducerPath: 'featureApi',
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
    saveFeature: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/feature/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateFeatures: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/feature/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    delFeature: builder.mutation({
      query: (id) => ({
        url: `/admin/feature/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminFeature: builder.query({
      query: (page) => ({
        url: `/admin/feature/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
    showFeature: builder.query({
      query: () => ({
        url: `/admin/feature/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveFeatureMutation,
  useUpdateFeaturesMutation,
  useDelFeatureMutation,
  useShowAllAdminFeatureQuery,
  useShowFeatureQuery,
} = featureApi;
