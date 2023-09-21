import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types"

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  // async function handleAddTodo(event) {
  //   event.preventDefault();
  //   onAddTodo({
  //     title: todoTitle,
  //     id: Date.now(),
  //   });
  //   console.log(todoTitle);
  //   setTodoTitle("");
  // }

  async function handleAddTodo(event) {
    event.preventDefault();
    if (!todoTitle) return;

    const newTodo = {
      title:todoTitle,
      id: Date.now(),
    }

    onAddTodo(newTodo);
    console.log(todoTitle);
    setTodoTitle("");
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
        <strong>Title</strong>
        &nbsp;  
      </InputWithLabel>
      &nbsp;
      <button type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
}

export default AddTodoForm;