import React, { useState } from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem({ todo, onRemoveTodo }) {
  const [isDone, setIsDone] = useState(() => {
    const storedIsDone = localStorage.getItem(`todo-${todo.id}`);
    return storedIsDone ? JSON.parse(storedIsDone) : false;
  });

  const handleCheckboxChange = () => {
    const newIsDone = !isDone;
    setIsDone(newIsDone);
    localStorage.setItem(`todo-${todo.id}`, JSON.stringify(newIsDone));
  };

  return (
    <div className={`${style.todoItem} ${isDone ? style.doneItem : ""}`}>
      <p className={style.todoTitle}>
        <label idName="Checkbox" className={isDone ? style.done : ""}>
          <input
            type="checkbox"
            checked={isDone}
            onChange={handleCheckboxChange}
          />
          <span className={style.checkboxText}>{isDone ? " Done " : " "}</span>
          {todo.title}
        </label>
      </p>
      <button
        className={`removeButton ${style.removeButton}`}
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </div>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
