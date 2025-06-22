import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  tagTypes: ['User', 'Anggota'],
  baseQuery: fetchBaseQuery({ 
      baseUrl: import.meta.env.VITE_API,
      credentials: "include",
      validateStatus: (response) => {
        return response.status === 200 || response.status === 304;
      }
   }),
  endpoints: (build) => ({
    getUser: build.query({
        query: () => "user/get",
      }), 
    getAnggota: build.query({
        query: () => "user/get/anggota"
    }),
    getAnggotaByNama: build.query({
      query: (nama) => `user/get/anggota/${nama}`
    }),
    getAnggotaByDepart: build.query({
      query: (depart) => `user/get/anggota/dept/${depart}`
    }), 
    storeUser: build.query({
      query: (id) => `user/store/${id}`
    }),
    storeAnggota: build.query({
      query: (id) => `user/store/anggota/${id}`
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `user/remove/${id}`, 
        method: 'DELETE',
      }),
    }),
    providesTags: ["User", "Anggota"],
  }),
})

export const { useGetUserQuery, useGetAnggotaQuery, useGetAnggotaByDepartQuery, useGetAnggotaByNamaQuery, useDeleteUserMutation, useStoreUserQuery, useStoreAnggotaQuery } = userAPI

export const roleAPI = createApi({
  reducerPath: 'roleAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
    validateStatus: (response) => {
      return response.status === 200 || response.status === 304;
    }
  }),
  endpoints: (build) => ({
    getRole: build.query({
      query: () => "user/get/role"
    }), 
    storeRole: build.query({
      query: (id) => `user/get/role/${id}`
    }),
    addRole: build.mutation({
      query: (body) => ({
        url: 'user/add/role',
        method: 'POST',
        body,
      }),
    }),
    updateRole: build.mutation({
      query: ({ id, ...body }) => ({
        url: `user/update/role/${id}`, 
        method: 'PUT',
        body,   
      }),
    }),
    deleteRole: build.mutation({
      query: (id) => ({
        url: `user/remove/role/${id}`, 
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetRoleQuery, useAddRoleMutation, useDeleteRoleMutation, useUpdateRoleMutation, useStoreRoleQuery } = roleAPI