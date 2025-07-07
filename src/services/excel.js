import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const excelAPI = createApi({
  reducerPath: "excelAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
    validateStatus: (response) => {
      return response.status === 200 || response.status === 304;
    }
  }),
  tagTypes: ['User', 'Anggota', 'Penilaian'],
  endpoints: (builder) => ({
    importAnggota: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "import/excel/anggota",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ['Anggota'],
    }),
    importUser: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "import/excel/user",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    importPenilaianStaff: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "import/excel/penilaian/staff",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ['Penilaian'],
    }),
    importPenilaianDepartemen: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "import/excel/penilaian/departemen",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ['Penilaian'],
    }),
  }),
});

export const { useImportAnggotaMutation, useImportUserMutation, useImportPenilaianStaffMutation, useImportPenilaianDepartemenMutation } = excelAPI;