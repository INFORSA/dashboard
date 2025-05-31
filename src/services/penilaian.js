import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const penilaianAPI = createApi({
  reducerPath: 'penilaianAPI',
  tagTypes: ['Penilaian'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include'
   }),
  endpoints: (build) => ({
    getNilai: build.query({
        query: (depart) => `penilaian/get/nilai/${depart}`,
        providesTags: ["Penilaian"],
      }), 
  }),
})

export const { useGetNilaiQuery } = penilaianAPI