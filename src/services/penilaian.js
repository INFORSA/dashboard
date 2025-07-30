import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const penilaianAPI = createApi({
  reducerPath: 'penilaianAPI',
  tagTypes: ['Penilaian'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
    validateStatus: (response) => {
      return response.status === 200 || response.status === 304;
    }
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
    getNilaiDept: build.query({
        query: (month) => `penilaian/get/nilai-dept/${month}`,
        providesTags: ["Penilaian Departemen"],
      }),
    editNilai: build.mutation({
      query: (data) => ({
        url: `penilaian/update-nilai`,
        method: 'PUT',
        body: data,
      }),
    }),
    editNilaiDept: build.mutation({
      query: (data) => ({
        url: `penilaian/update-nilai-dept`,
        method: 'PUT',
        body: data,
      }),
    }),
    generateTemplateStaff: build.mutation({
      query: (body) => ({
        url: `penilaian/add/template-staff`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Penilaian"], // atau sesuaikan tag jika ingin refetch otomatis
    }),
    getMaxNilai: build.query({
        query: (month) => `penilaian/get/max-nilai/${month}`,
        providesTags: ["Maks Penilaian"],
      }), 
    getNilaiDetail: build.query({
        query: ({depart, month, penilai}) => `penilaian/get/nilai/${depart}/${penilai}/${month}`,
        providesTags: ["Penilaian Detail"],
      }), 
    getNilaiDeptDetail: build.query({
        query: ({month, penilai}) => `penilaian/get/nilai-dept/${penilai}/${month}`,
        providesTags: ["Penilaian Detail"],
      }), 
    getNilaiPersonal: build.query({
      query: (username) => {
        if (username) {
          return `penilaian/get/nilai/${username}`;
        }else{
          return `penilaian/get/nilai/personal`;
        }
      },
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
    getLineChartDepart: build.query({
        query: (waktu) => `penilaian/get/departemen/linechart/${waktu}`,
        providesTags: ["Nilai Depart"],
      }), 
    getLineChartPersonal: build.query({
        query: (username) => {
          if(username){
            return `penilaian/get/staff/linechart/${username}`
          }else{
            return 'penilaian/get/personal/linechart'
          }
        },
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
    getRadarChartPersonal: build.query({
      query: (username) => {
        if (username) {
          return `penilaian/get/staff/radarchart/${username}`;
        }else{
          return `penilaian/get/personal/radarchart`;
        }
      },
      providesTags: ["Radarchart Personal"],
    }),
  }),
})

export const { useGetNilaiQuery, useGetNilaiDetailQuery, useGetMaxNilaiQuery, useGetLineChartValueQuery, useGetLineChartValueDepartQuery, 
              useGetBarChartValueQuery, useGetRadarChartValueQuery, useGetAllNilaiQuery, useGetNilaiPersonalQuery,
              useGetLineChartPersonalQuery, useEditNilaiMutation, useGetRadarChartPersonalQuery, useGetLineChartDepartQuery,
              useGetNilaiDeptQuery, useGetNilaiDeptDetailQuery, useEditNilaiDeptMutation, useGenerateTemplateStaffMutation } = penilaianAPI

export const matriksAPI = createApi({
  reducerPath: 'matriksAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
    validateStatus: (response) => {
      return response.status === 200 || response.status === 304;
    }
  }),
  endpoints: (build) => ({
    getMatriks: build.query({
      query: () => "penilaian/get/all/matriks"
    }), 
    storeMatriks: build.query({
      query: (id) => `penilaian/get/matriks/${id}`
    }),
    addMatriks: build.mutation({
      query: (body) => ({
        url: 'penilaian/add/matriks',
        method: 'POST',
        body,
      }),
    }),
    updateMatriks: build.mutation({
      query: ({ ...body }) => ({
        url: `penilaian/update/matriks`, 
        method: 'PUT',
        body,   
      }),
    }),
    deleteMatriks: build.mutation({
      query: (id) => ({
        url: `penilaian/remove/matriks/${id}`, 
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetMatriksQuery, useAddMatriksMutation, useDeleteMatriksMutation, useUpdateMatriksMutation, useStoreMatriksQuery } = matriksAPI