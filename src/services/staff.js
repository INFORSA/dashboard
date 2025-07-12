import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const staffAPI = createApi({
  reducerPath: 'staffAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
    validateStatus: (response) => {
      return response.status === 200 || response.status === 304;
    }
  }),
  endpoints: (build) => ({
    getReview: build.query({
        query: (anggota) => `staff/get/review/${anggota}`
    }), 
  }),
})

export const { useGetReviewQuery } = staffAPI