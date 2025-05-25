import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const excelAPI = createApi({
  reducerPath: "excelAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    importExcel: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "import/excel",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useImportExcelMutation } = excelAPI;