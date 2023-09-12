import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types"

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map(function (todo) {
        return <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo}/>;
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
}

export default TodoList;
