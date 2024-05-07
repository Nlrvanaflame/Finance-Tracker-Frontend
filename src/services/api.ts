import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FinancialRecord, NewFinancialRecord, updateRecord } from "../models/financialRecord";
import { LoginUser, RegisterUser, UpdateUserData, User } from "../models/user";
import { AuthResponse } from '../types/Authentication';

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:4000",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
 }),

  tagTypes: ["User", "Record"],
  endpoints: (builder) => ({}),
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // User endpoints
    registerUser: builder.mutation<void, RegisterUser>({
      query: (data: RegisterUser) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation<AuthResponse, LoginUser>({
      query: (data: LoginUser) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['User'], 
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<void, UpdateUserData>({
      query: (data: UpdateUserData) => ({
        url: "/users",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getUserFromToken: builder.query<User, void>({
      query: () => "/usersdata",
      providesTags: ['User'],
    }),
    // Financial records endpoints
    getRecords: builder.query<FinancialRecord[], void>({
      query: () => "/records",
      providesTags: ['Record'],
    }),
    createRecord: builder.mutation<FinancialRecord, NewFinancialRecord>({
      query: (data: NewFinancialRecord) => ({
        url: "/records",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Record'],
    }),
    editRecord: builder.mutation<void, { id: string, data: updateRecord }>({
      query: ({ id, data }) => ({
        url: `/records/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Record'],
    }),
    deleteRecord: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Record'],
    }),
  }),
});

export const {
  useGetRecordsQuery,
  useCreateRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useGetUserFromTokenQuery,
} = extendedApiSlice;
