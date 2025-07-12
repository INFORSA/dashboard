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
    checkSertif: build.query({
        query: (nim) => `staff/check-sertif/${nim}`
    }), 
    getSertif: build.query({
        query: () => `staff/get/sertif`
    }), 
    uploadSertif: build.mutation({
      query: (body) => ({
        url: `staff/upload-sertif`,
        method: 'POST',
        body,
      }),
    }),
    deleteSertif: build.mutation({
      query: (id) => ({
        url: `staff/remove/sertif/${id}`, 
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetReviewQuery, useGetSertifQuery, useCheckSertifQuery, useUploadSertifMutation, useDeleteSertifMutation } = staffAPI