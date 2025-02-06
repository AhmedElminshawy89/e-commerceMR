import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const BannerApi = createApi({
  reducerPath: 'BannerApi',
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
    saveBanner: builder.mutation({
      query: (newCategory) => ({
        url: '/admin/banner/save',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateBanner: builder.mutation({
      query: ({ id, updateCategory }) => ({
        url: `/admin/banner/update/${id}`,
        method: 'POST',
        body: updateCategory,
      }),
    }),
    updateStatusBanner: builder.mutation({
        query: ( id ) => ({
          url: `/admin/banner/updateStatus/${id}`,
          method: 'POST',
      }),
    }),
    delBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/banner/delete/${id}`,
        method: 'GET',
      }),
    }),
    showAllAdminBanner: builder.query({
      query: (page) => ({
        url: `/admin/banner/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
    showBannerLand: builder.query({
      query: () => ({
        url: `/admin/banner/showLand`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveBannerMutation,
  useUpdateBannerMutation,
  useUpdateStatusBannerMutation,
  useDelBannerMutation,
  useShowAllAdminBannerQuery,
  useShowBannerLandQuery,
} = BannerApi;
