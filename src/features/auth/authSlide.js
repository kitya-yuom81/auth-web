import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    
    register: build.mutation({
      query: (formData) => ({
        url: `/auth/register`,
        method: "POST",
        
        body: formData,
      })
    }),

    
    login: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: body
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
