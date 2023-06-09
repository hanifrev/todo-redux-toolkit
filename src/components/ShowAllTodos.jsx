import React, { useState, useEffect } from "react";
import {
  useGetAllTodosQuery,
  useDeleteTodosMutation,
  useUpdateTodosMutation,
} from "../services/apiSlice";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  itemsCount,
  completedCount,
  uncompletedCount,
} from "../feature/todoSlice";
import EditTodo from "./EditTodo";
import { FaTrashAlt } from "react-icons/fa";

const ShowAllTodos = () => {
  const [editModal, setEditModal] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const { data } = useGetAllTodosQuery();
  // console.log(data && data);
  dispatch(itemsCount(data && data.length));

  const completedCounts =
    data && data.filter((item) => item.completed === true).length;
  dispatch(completedCount(completedCounts));
  const uncompletedCounts =
    data && data.filter((item) => item.completed === false).length;
  dispatch(uncompletedCount(uncompletedCounts));

  const [deleteTodos, { isSuccess, isLoading }] = useDeleteTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast]);

  return (
    <div className="flex flex-col gap-5">
      {toast && (
        <div className="alert alert-success absolute max-w-[600px] z-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your task updated!</span>
        </div>
      )}
      {/* {isLoading && <div>please wait..</div>}
      {isSuccess && (
        <div className="alert alert-warning absolute max-w-[600px] z-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Your task deleted!</span>
        </div>
      )} */}
      {data &&
        data.map((item) => {
          return (
            <div
              className="card card-body py-5 px-1 flex flex-row justify-between w-full"
              key={item.id}
            >
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.completed}
                  onChange={() =>
                    updateTodos({ ...item, completed: !item.completed })
                  }
                />
                <div className="">
                  <h2
                    className="card-title text-sm"
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="text-sm"
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                    }}
                  >
                    {item.description}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                    }}
                  >
                    {moment(item.date).format("MM/DD/YYYY")}
                  </p>
                </div>
              </div>
              <div className="">
                <button
                  onClick={() => {
                    setEditModal(true), setIdEdit(item.id);
                  }}
                  className="px-2 py-1 font-bold text-sm bg-gray-600 hover:bg-slate-400 mr-2"
                >
                  EDIT
                </button>
                <button
                  onClick={() => deleteTodos(item.id)}
                  className="p-2 font-bold text-sm bg-transparent"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          );
        })}
      {editModal && (
        <EditTodo
          closeModal={() => setEditModal(false)}
          idParams={idEdit}
          toastSuccess={() => setToast(true)}
        />
      )}
    </div>
  );
};

export default ShowAllTodos;
