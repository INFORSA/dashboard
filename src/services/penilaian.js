import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const penilaianAPI = createApi({
  reducerPath: 'penilaianAPI',
  tagTypes: ['Penilaian'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include'
   }),
  endpoints: (build) => ({
    getAllNilai: build.query({
        query: (month) => `penilaian/get/all/nilai/${month}`,
        providesTags: ["All Nilai"],
      }), 
    getNilai: build.query({
        query: ({depart, month}) => `penilaian/get/nilai/${depart}/${month}`,
        providesTags: ["Penilaian"],
      }), 
    getLineChartValue: build.query({
        query: () => `penilaian/get/linechart`,
        providesTags: ["Performa INFORSA"],
      }), 
    getLineChartValueDepart: build.query({
        query: (depart) => `penilaian/get/linechart/${depart}`,
        providesTags: ["Nilai Line"],
      }), 
    getBarChartValue: build.query({
        query: (depart) => `penilaian/get/barchart/${depart}`,
        providesTags: ["Nilai Bar"],
      }), 
    getRadarChartValue: build.query({
        query: (depart) => `penilaian/get/radarchart/${depart}`,
        providesTags: ["Nilai Radar"],
      }), 
  }),
})

export const { useGetNilaiQuery, useGetLineChartValueQuery, useGetLineChartValueDepartQuery, useGetBarChartValueQuery, useGetRadarChartValueQuery, useGetAllNilaiQuery } = penilaianAPI