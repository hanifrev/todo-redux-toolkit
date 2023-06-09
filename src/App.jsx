import { useState } from "react";
import "./App.css";
import AddNewTodo from "./components/AddNewTodo";
import ShowAllTodos from "./components/ShowAllTodos";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      {/* <AddNewTodo /> */}
      <ShowAllTodos />
    </>
  );
}

export default App;
