import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deptAPI = createApi({
  reducerPath: 'deptAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
    validateStatus: (response) => {
      return response.status >= 200 && response.status < 300;
    }
  }),
  endpoints: (build) => ({
    getDept: build.query({
        query: () => "dept/get"
    }),
    storeDept: build.query({
      query: (id) => `dept/get/departemen/${id}`
    }),
    addDept: build.mutation({
      query: (body) => ({
        url: 'dept/add/departemen',
        method: 'POST',
        body,
      }),
    }),
    updateDept: build.mutation({
      query: ({ ...body }) => ({
        url: `dept/update/departemen`, 
        method: 'PUT',
        body,   
      }),
    }),
    deleteDept: build.mutation({
      query: (id) => ({
        url: `dept/remove/departemen/${id}`, 
        method: 'DELETE',
      }),
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

export const { useGetDeptQuery, useGetPengurusQuery, useGetReviewQuery, useAddReviewMutation, useDeleteReviewMutation,
                useAddDeptMutation, useDeleteDeptMutation, useStoreDeptQuery, useUpdateDeptMutation              
              } = deptAPI