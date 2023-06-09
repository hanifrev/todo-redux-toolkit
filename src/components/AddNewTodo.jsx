import React, { useEffect, useRef } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddTodosMutation } from "../services/apiSlice";

const AddNewTodo = ({ closeModal, toastSuccess, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);

  const [addTodos, { isLoading, isSuccess, isError }] = useAddTodosMutation();

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleAdd = (e) => {
    e.preventDefault();
    setCompleted(false);
    addTodos({ title, description, date, completed });
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
    <div className="add-form" ref={modalRef}>
      {isLoading ? (
        <div className="font-bold h-[400px] flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <form onSubmit={(e) => handleAdd(e)}>
          <div className="max-w-xs m-auto">
            <h3 className="font-bold text-center py-3">ADD TASK</h3>
            <label className="label">
              <span className="label-text">Write the task title</span>
            </label>
            <input
              required
              type="text"
              id="title"
              placeholder="Type title here..."
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Write description</span>
            </label>
            <input
              required
              type="text"
              id="description"
              placeholder="Type description here..."
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Pick the date</span>
            </label>

            <DatePicker
              required
              placeholderText="Select Date"
              selected={date}
              onChange={(date) => setDate(date)}
              className="w-full max-w-xs px-4 h-12 mb-5 rounded-md"
            />
            <button className="btn btn-primary px-16 w-full " type="submit">
              ADD
            </button>
          </div>
        </form>
      )}

      {/* {isSuccess && <div>Post created successfully!</div>} */}
      {/* {isError && <div>Error creating post.</div>} */}
    </div>
  );
};

export default AddNewTodo;
