import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const ReviewApi = createApi({
  reducerPath: 'ReviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
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
    saveReview: builder.mutation({
      query: ({ id, Review }) => ({
        url: `/admin/review/store/${id}`,
        method: 'POST',
        body: Review,
      }),
    }),
    showAllAdminReview: builder.query({
      query: (page) => ({
        url: `/admin/review/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveReviewMutation,
  useShowAllAdminReviewQuery,
  
} = ReviewApi;
