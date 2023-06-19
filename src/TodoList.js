import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
    {
      id: 1,
      title: "Complete assignment"  
    },
    {
      id: 2,
      title: "Review results"
    },
    {
      id: 3,
      title: "Submit assignment"
    }
  ];

function TodoList() {
    return (
        <ul>
        {todoList.map(function(todo) {
          return (
             <TodoListItem key={todo.id} todo={todo} />
          );
        })}
      </ul> 
    )
}

export default TodoList;