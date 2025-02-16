import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const CartApi = createApi({
  reducerPath: 'CartApi',
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
    addToCart: builder.mutation({
      query: ({ id, cartData }) => ({
        url: `/admin/cart/addToCart/${id}`,
        method: 'POST',
        body: cartData,
      }),
    }),
    updateCart: builder.mutation({
      query: (updateCartData ) => ({
        url: `/admin/cart/updateQuantity`,
        method: 'POST',
        body: updateCartData,
      }),
    }),
    delCart: builder.mutation({
        query: (id) => ({
          url: `/admin/cart/removeFromCart/${id}`, 
          method: 'GET', 

        }),
      }),
    showCart: builder.query({
      query: () => ({
        url: `/admin/cart/viewCart`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useUpdateCartMutation,
  useDelCartMutation,
  useShowCartQuery,
} = CartApi;
