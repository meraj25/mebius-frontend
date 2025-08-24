
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
  query: (categoryId) => {
    if (!categoryId) return `/products`;


    return `/products?categoryId=${categoryId}`;
  },
    query: (color) => {
    if (!color) return `/products`;


    return `/products?${color}`;
    
  },
   query: (priceorder) => {
    if (!priceorder) return `/products`;


    return `/products?sort=price&order=${priceorder}`;

  }
}),
getAllOrders: build.query({
  query: (userId) => {
    if (!userId) return `/orders`;


    return `/products?${userId}`;
  },
}),



    getProductsBySearch: build.query({
      query: (query) => `/products/search?search=${query}`,
    }),
    

    getProductsById: build.query({
      query: (productId) => `/products/${productId}`,
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
  useGetProductsByIdQuery,
  useGetAllOrdersQuery

} = Api;
