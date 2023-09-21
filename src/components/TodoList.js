// import React from "react";
// import TodoListItem from "./TodoListItem";
// import PropTypes from "prop-types"

// function TodoList({ todoList, onRemoveTodo }) {
//   return (
//     <ul>
//       {todoList.map(function (todo) {
//         return <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo}/>;
//       })}
//     </ul>
//   );
// }

// TodoList.propTypes = {
//   todoList: PropTypes.array.isRequired,
//   onRemoveTodo: PropTypes.func.isRequired,
// }

// export default TodoList;

import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo }) {
  const [isAscending, setIsAscending] = useState(true);

  const sortedTodoList = todoList.slice().sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);
    return isAscending ? comparison : comparison * -1;
  });

  const toggleOrder = () => {
    setIsAscending((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleOrder}>
        Toggle Order by Title ({isAscending ? "Ascending" : "Descending"})
      </button>
      <ul>
        {sortedTodoList.map(function (todo) {
          return <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />;
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