import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

// function useSemiPersistentState() {
//   const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("savedTodoList")) || []);

//   useEffect(() => {
//     localStorage.setItem("savedTodoList", JSON.stringify(todoList))
//   }, [todoList])

//   return [todoList, setTodoList]
// }

function App() {
  // const [todoList, setTodoList] = useSemiPersistentState();
  // const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("savedTodoList")) || []);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: todoList } });
      }, 2000);
    });

    promise
      .then((result) => {
        const { todoList } = result.data;
        setTodoList(todoList);
        setIsLoading(false);
        console.log("Loading after 2 secs");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((item) => item.id !== id));
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}

      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {/* <TodoList todoList={todoList} onRemoveTodo={removeTodo} /> */}
    </>
  );
}

export default App;
