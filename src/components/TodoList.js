import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div className="TodoLlist">
      <ul>
        {todoList.map(function (todo) {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
            />
          );
        })}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
