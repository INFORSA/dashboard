import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: 'api/auth',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = loginAPI