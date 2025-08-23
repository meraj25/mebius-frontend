
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: async (headers) => {
      return new Promise((resolve) => {
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            headers.set("Authorization", `Bearer ${token}`);
            resolve(headers);
          } else {
            setTimeout(checkToken, 500);
          }
        }
        checkToken();
      });
    },
  }),
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => `/products`,
    }),
    getProductsBySearch: build.query({
      query: (query) => `/products/search?search=${query}`,
    }),
    getProductsByCategory: build.query({
      query: (categoryId) => `/products?categoryId=${categoryId}`,
    }),
    getAllCategories: build.query({
      query: () => `/categories`,
      
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),
    createOrder: build.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
   getCheckoutSessionStatus: build.query({
      query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
    }),
  }),
});


export const {
  useGetAllProductsQuery,
  useGetProductsBySearchQuery,
  useCreateOrderMutation,
  useGetCheckoutSessionStatusQuery,
  useCreateProductMutation,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
} = Api;
