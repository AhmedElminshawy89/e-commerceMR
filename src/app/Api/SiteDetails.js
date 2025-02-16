import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const siteDetailsApi = createApi({
  reducerPath: 'siteDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
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
    saveOverAllInfo: builder.mutation({
        query: (newInfo) => ({
          url: '/admin/info/save',
          method: 'POST',
          body: newInfo,
        }),
      }),
      updateOverAllInfo: builder.mutation({
        query: ({ id, updateCategory }) => ({
          url: `/admin/info/update/${id}`,
          method: 'POST',
          body: updateCategory,
        }),
      }),
    showAllAdminOverAllInfo: builder.query({
      query: () => ({
        url: `/admin/info/show`,
        method: 'GET',
      }),
    }),
    showAllAdminOverAllInfo2: builder.query({
      query: () => ({
        url: `/admin/info/showAll`,
        method: 'GET',
      }),
    }),

    saveImageBanners: builder.mutation({
        query: (newInfo) => ({
          url: '/admin/ImagesBanner/save',
          method: 'POST',
          body: newInfo,
        }),
      }),
      updateImageBanners: builder.mutation({
        query: ({ id, updateCategory }) => ({
          url: `/admin/ImagesBanner/update/${id}`,
          method: 'POST',
          body: updateCategory,
        }),
      }),
    showAllAdminImageBanners: builder.query({
      query: () => ({
        url: `/admin/ImagesBanner/show`,
        method: 'GET',
      }),
    }),

    saveSocial: builder.mutation({
        query: (newInfo) => ({
          url: '/admin/social/save',
          method: 'POST',
          body: newInfo,
        }),
      }),
      updateSocial: builder.mutation({
        query: ({ id, updateCategory }) => ({
          url: `/admin/social/update/${id}`,
          method: 'POST',
          body: updateCategory,
        }),
      }),
    showAllAdminSocial: builder.query({
      query: () => ({
        url: `/admin/social/show`,
        method: 'GET',
      }),
    }),
    showAllAdminGetDashboardStats: builder.query({
      query: () => ({
        url: `/admin/getDashboardStats`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveOverAllInfoMutation,
  useUpdateOverAllInfoMutation,
  useShowAllAdminOverAllInfoQuery,
  useShowAllAdminOverAllInfo2Query,

  useSaveImageBannersMutation,
  useUpdateImageBannersMutation,
  useShowAllAdminImageBannersQuery,

  useSaveSocialMutation,
  useUpdateSocialMutation,
  useShowAllAdminSocialQuery,

  useShowAllAdminGetDashboardStatsQuery,
  
} = siteDetailsApi;
