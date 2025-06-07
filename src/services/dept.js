import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deptAPI = createApi({
  reducerPath: 'deptAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (build) => ({
    getDept: build.query({
        query: () => "dept/get"
    }),
    getPengurus: build.query({
        query: () => `dept/get/pengurus`
    }), 
  }),
})

export const { useGetDeptQuery, useGetPengurusQuery } = deptAPI