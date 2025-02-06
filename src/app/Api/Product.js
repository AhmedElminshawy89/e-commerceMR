import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from './../../../Api/base_url';
import api_key from '../../../Api/Key';

export const productsApi = createApi({
  reducerPath: 'productsApi',
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
    saveProducts: builder.mutation({
      query: (newProduct) => ({
        url: '/admin/product/save',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, updateProduct }) => ({
        url: `/admin/product/update/${id}`,
        method: 'POST',
        body: updateProduct,
      }),
    }),
    delProducts: builder.mutation({
      query: (id) => ({
        url: `/admin/product/delete/${id}`,
        method: 'GET',
      }),
    }),
    delAllProducts: builder.mutation({
      query: () => ({
        url: `/admin/product/deleteAll`,
        method: 'GET',
      }),
    }),
    showAllAdminProducts: builder.query({
      query: (page) => ({
        url: `/admin/product/showAll?page=${page}`,
        method: 'GET',
      }),
    }),
    showAllAdminProductsSearch: builder.query({
      query: ({name,category_name,barcode}) => ({
        url: `/admin/product/searchProducts?name=${name}&category_name=${category_name}&barcode=${barcode}`,
        method: 'GET',
      }),
    }),
    showProducts: builder.query({
      query: ({ search = "", category = "", color = [], size = [], price_order = "", page = 1 }) => {
        const params = new URLSearchParams({
          search,
          category,
          price_order,
          page,
          color,
          size
        });
  
        return {
          url: `/admin/product/allProducts?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
    
    showSingleProduct: builder.query({
      query: (name) => ({
        url: `/admin/product/singleProduct/${name}`,
        method: 'GET',
      }),
    }),
    showProductColors: builder.query({
      query: () => ({
        url: `/admin/product/getAllColors`,
        method: 'GET',
      }),
    }),
    showOutOfStock: builder.query({
      query: () => ({
        url: `/admin/product/showOutOfStock`,
        method: 'GET',
      }),
    }),
    
  }),
});

export const {
  useSaveProductsMutation,
  useUpdateProductMutation,
  useDelProductsMutation,
  useShowAllAdminProductsQuery,
  useShowProductsQuery,
  useDelAllProductsMutation,
  useShowSingleProductQuery,
  useShowAllAdminProductsSearchQuery,
  useShowProductColorsQuery,
  useShowOutOfStockQuery,
} = productsApi;
