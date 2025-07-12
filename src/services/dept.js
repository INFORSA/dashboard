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
    getReview: build.query({
        query: ({depart, month}) => `dept/get/review/${depart}/${month}`
    }), 
    addReview: build.mutation({
      query: (body) => ({
        url: 'dept/add/review',
        method: 'POST',
        body,
      }),
    }),
    deleteReview: build.mutation({
      query: (id) => ({
        url: `dept/remove/review/${id}`, 
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetDeptQuery, useGetPengurusQuery, useGetReviewQuery, useAddReviewMutation, useDeleteReviewMutation } = deptAPI