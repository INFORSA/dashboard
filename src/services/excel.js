import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const excelAPI = createApi({
  reducerPath: "excelAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
  }),
  tagTypes: ['User', 'Anggota'],
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
  }),
});

export const { useImportAnggotaMutation, useImportUserMutation } = excelAPI;