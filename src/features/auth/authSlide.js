import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      // POST /users with JSON body { name, email, password, avatar }
      query: (body) => ({
        url: "/users",
        method: "POST",
        body, // fetchBaseQuery will set JSON headers & stringify
      }),
    }),
    login: build.mutation({
      // POST /auth/login with JSON body { email, password }
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});


export const { useRegisterMutation, useLoginMutation } = authApi;


