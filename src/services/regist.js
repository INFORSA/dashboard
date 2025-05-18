// service/register.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerAPI = createApi({
  reducerPath: 'registerAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (builder) => ({
    registerStaff: builder.mutation({
      query: (body) => ({
        url: 'api/register/staff',
        method: 'POST',
        body,
      }),
    }),
    registerAdmin: builder.mutation({
      query: (body) => ({
        url: 'api/register/admin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterStaffMutation, useRegisterAdminMutation } = registerAPI;
