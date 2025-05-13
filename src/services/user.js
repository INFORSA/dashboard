import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (build) => ({
    getUser: build.query({
        query: () => "user/get"
    }), 
  }),
})

export const { useGetUserQuery } = userAPI

export const anggotaAPI = createApi({
  reducerPath: 'anggotaAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (build) => ({
    getAnggota: build.query({
        query: () => "user/get/anggota"
    }), 
  }),
})

export const { useGetAnggotaQuery } = anggotaAPI