// RTK query
import { apiSlice } from "../api/apiSlice";


const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProductById: build.query({
      query: (id) => ({
        url: `/products/${id}`, 
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
