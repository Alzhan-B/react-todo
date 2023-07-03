import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({
      title: todoTitle,
      id: Date.now(),
    });
    console.log(todoTitle);
    setTodoTitle("");
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        name="title"
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;