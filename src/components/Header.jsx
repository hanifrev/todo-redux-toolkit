import React, { useEffect, useState } from "react";
import AddNewTodo from "./AddNewTodo";
import { useSelector } from "react-redux";

const Header = () => {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const { total, completed, uncompleted } = useSelector(
    (state) => state.totalItems
  );

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
    <>
      <div className="w-full bg-sky-950 h-14 flex justify-between items-center px-2">
        <div className="font-bold">TODO LIST</div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setModal(true)}
        >
          ADD
        </button>
        {modal && (
          <AddNewTodo
            toastSuccess={() => setToast(true)}
            closeModal={() => setModal(false)}
          />
        )}
        {toast && (
          <div className="alert alert-success absolute max-w-[600px]">
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
            <span>Your task added!</span>
          </div>
        )}
      </div>
      <div className="text-[10px]">
        <span>Total: {total}</span> | <span>Completed Task: {completed}</span> |{" "}
        <span>Uncompleted Task: {uncompleted}</span>
      </div>
    </>
  );
};

export default Header;
