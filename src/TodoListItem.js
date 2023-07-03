import React from "react";

function TodoListItem({ todo }) {
  return (
    <li>
      <span>{todo.title}</span>
    </li>
  );
}

export default TodoListItem;
