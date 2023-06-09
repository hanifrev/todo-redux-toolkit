import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiTodo = createApi({
  reducerPath: "apiTodo",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "todo",
      providesTags: ["Todos"],
    }),
    getOneTodo: builder.query({
      query: (id) => ({
        url: `/todo/${id}`,
      }),
      invalidatesTags: ["Todos"],
    }),
    addTodos: builder.mutation({
      query: (data) => ({
        url: "/todo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodos: builder.mutation({
      query: (data) => ({
        url: `/todo/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
  useGetOneTodoQuery,
} = apiTodo;
