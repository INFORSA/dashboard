import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deptAPI = createApi({
  reducerPath: 'deptAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
    validateStatus: (response) => {
      return response.status === 200 || response.status === 304;
    }
  }),
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