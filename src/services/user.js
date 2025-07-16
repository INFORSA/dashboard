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
    getUserByNama: build.query({
      query: (nama) => `user/get/user/${nama}`
    }),
    getAnggotaByDepart: build.query({
      query: (depart) => `user/get/anggota/dept/${depart}`
    }), 
    getInti: build.query({
        query: () => "user/get/bpi",
      }), 
    storeUser: build.query({
      query: (id) => `user/store/${id}`
    }),
    storeAnggota: build.query({
      query: (id) => `user/store/anggota/${id}`
    }),
    updateUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `user/update/${id}`, 
        method: 'PUT',
        body,   
      }),
    }),
    updateAnggota: build.mutation({
      query: ({ id, ...body }) => ({
        url: `user/update/anggota/${id}`, 
        method: 'PUT',
        body,   
      }),
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

export const { useGetUserQuery, useGetIntiQuery, useGetAnggotaQuery, useGetAnggotaByDepartQuery, useGetAnggotaByNamaQuery, useGetUserByNamaQuery, 
                useDeleteUserMutation, useStoreUserQuery, useStoreAnggotaQuery, useUpdateUserMutation, useUpdateAnggotaMutation } = userAPI

export const roleAPI = createApi({
  reducerPath: 'roleAPI',
  tagTypes: ['Role'],
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
    providesTags: ['Role'],
  }),
})

export const { useGetRoleQuery, useAddRoleMutation, useDeleteRoleMutation, useUpdateRoleMutation, useStoreRoleQuery } = roleAPI