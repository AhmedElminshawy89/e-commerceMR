import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const userApi = createApi({
  reducerPath: 'userApi',
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
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    verifyUser: builder.mutation({
        query: (newUser) => ({
          url: '/auth/verify-email',
          method: 'POST',
          body: newUser,
        }),
      }),
      resendOtp: builder.mutation({
        query: (newUser) => ({
          url: '/auth/resent-otp',
          method: 'POST',
          body: newUser,
        }),
      }),
      loginUser: builder.mutation({
        query: (user) => ({
          url: '/auth/login',
          method: 'POST',
          body: user,
        }),
      }),
      forgetPassword: builder.mutation({
        query: (user) => ({
          url: '/auth/forget-password',
          method: 'POST',
          body: user,
        }),
      }),
      resetPassword: builder.mutation({
        query: (user) => ({
          url: '/auth/reset-password',
          method: 'POST',
          body: user,
        }),
      }),
  }),
});

export const { useAddUserMutation  , useVerifyUserMutation,useResendOtpMutation , useLoginUserMutation , useForgetPasswordMutation , useResetPasswordMutation} = userApi;
