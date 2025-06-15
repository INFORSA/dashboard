import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials : 'include',
    validateStatus: (response) => {
      return response.status === 200 || response.status === 304;
    }
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: 'api/auth',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: (body) => ({
        url: 'api/logout',
        method: 'POST',
        body,
      }),
    }),
    getCurrentUser: build.query({
      query: () => 'api/me',
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery, useLazyGetCurrentUserQuery } = loginAPI