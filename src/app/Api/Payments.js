import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
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
    savePaymentPayMob: builder.mutation({
      query: (paymentData) => ({
        url: '/admin/payment/sendPayment',
        method: 'POST',
        body: paymentData,
      }),
    }),
    savePaymentCashOnDelivery: builder.mutation({
        query: (paymentData) => ({
          url: '/admin/payment/cashOnDelivery',
          method: 'POST',
          body: paymentData,
        }),
      }),
    showAllAdminPayment: builder.query({
      query: (page) => ({
        url: `/admin/payment/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
    showAllAdminPaymentSearch: builder.query({
      query: ({start_date,end_date,customer_name}) => ({
        url: `/admin/payment/searchOrders?start_date=${start_date}&end_date=${end_date}&customer_name=${customer_name}`,
        method: 'GET',
      }),
    }),
    showPayment: builder.query({
      query: (code) => ({
        url: `/admin/payment/showByCode/${code}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSavePaymentCashOnDeliveryMutation,
  useSavePaymentPayMobMutation,
  useShowAllAdminPaymentQuery,
  useShowPaymentQuery,
  useLazyShowAllAdminPaymentSearchQuery,
} = paymentsApi;
