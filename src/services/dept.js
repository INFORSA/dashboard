import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deptAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (build) => ({
    getDept: build.query({
        query: () => "dept/get"
    }), 
  }),
})

export const { useGetDeptQuery } = deptAPI