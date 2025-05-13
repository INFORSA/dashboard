// service/register.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerStaffAPI = createApi({
  reducerPath: 'registerStaffAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (builder) => ({
    registerStaff: builder.mutation({
      query: (body) => ({
        url: '/api/register/staff',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterStaffMutation } = registerStaffAPI;

export const registerAdminAPI = createApi({
  reducerPath: 'registerAdminAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (body) => ({
        url: '/api/register/admin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterAdminMutation } = registerAdminAPI;
