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
    getMaxNilai: build.query({
        query: (month) => `penilaian/get/max-nilai/${month}`,
        providesTags: ["Maks Penilaian"],
      }), 
    getNilaiDetail: build.query({
        query: ({depart, month, penilai}) => `penilaian/get/nilai/${depart}/${penilai}/${month}`,
        providesTags: ["Penilaian Detail"],
      }), 
    getNilaiPersonal: build.query({
        query: () => `penilaian/get/nilai/personal`,
        providesTags: ["Penilaian Personal"],
      }), 
    getLineChartValue: build.query({
        query: () => `penilaian/get/linechart`,
        providesTags: ["Performa INFORSA"],
      }), 
    getLineChartValueDepart: build.query({
        query: (depart) => `penilaian/get/linechart/${depart}`,
        providesTags: ["Nilai Line"],
      }), 
    getLineChartPersonal: build.query({
        query: () => `penilaian/get/personal/linechart`,
        providesTags: ["Linechart Personal"],
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

export const { useGetNilaiQuery, useGetNilaiDetailQuery, useGetMaxNilaiQuery, useGetLineChartValueQuery, useGetLineChartValueDepartQuery, 
              useGetBarChartValueQuery, useGetRadarChartValueQuery, useGetAllNilaiQuery, useGetNilaiPersonalQuery,useGetLineChartPersonalQuery } = penilaianAPI