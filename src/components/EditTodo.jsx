import React, { useEffect, useRef } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetOneTodoQuery,
  useUpdateTodosMutation,
} from "../services/apiSlice";

const EditTodo = ({ closeModal, toastSuccess, onClose, idParams }) => {
  const [updateTodos, { isLoading, isSuccess, isError }] =
    useUpdateTodosMutation();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");
  const [date, setDate] = useState("");

  const { data: oneData, refetch } = useGetOneTodoQuery(idParams);
  // console.log(oneData && oneData);
  useEffect(() => {
    if (oneData) {
      setId(oneData.id);
      setTitle(oneData.title);
      setDescription(oneData.description);
      setDate(new Date(oneData.date));
    }
  }, [oneData, idParams]);

  useEffect(() => {
    refetch();
  }, [idParams]);

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodos({ id, title, description, date });
    e.target.reset();
  };

  {
    isSuccess &&
      (() => {
        closeModal();
        toastSuccess();
      })();
  }

  return (
    <div className="add-form absolute" ref={modalRef}>
      {isLoading ? (
        <div className="font-bold h-[400px] flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <form onSubmit={(e) => handleUpdate(e)}>
          <div className="max-w-xs m-auto">
            <h3 className="font-bold text-center py-3">EDIT TASK</h3>
            <label className="label">
              <span className="label-text">Write the task title</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />
            <label className="label">
              <span className="label-text">Write description</span>
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Pick the date</span>
            </label>

            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="w-full max-w-xs px-4 h-12 mb-5 rounded-md"
            />
            <button className="btn btn-primary px-16 w-full " type="submit">
              EDIT
            </button>
          </div>
        </form>
      )}

      {/* {isSuccess && <div>Post created successfully!</div>} */}
      {/* {isError && <div>Error creating post.</div>} */}
    </div>
  );
};

export default EditTodo;
