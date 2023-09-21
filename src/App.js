import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import style from "./components/TodoListItem.module.css";
import "./components/App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);

  async function fetchData() {
    const options = {};
    options.method = "GET";
    options.headers = {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // const todos = data.records
      //   .sort((a, b) => 
      //     new Date(a.createdTime) < new Date(b.createdTime) ? -1 : 1
      //   )        
      //   .map((todo) => {
      //     const newTodo = {
      //       id: todo.id,
      //       title: todo.fields.title,
      //       createdTime: todo.createdTime,
      //     };
      //     return newTodo;
      //   });

      // const sortedTodos = [...todos].sort((a, b) =>
      //   sortAscending
      //     ? new Date(a.createdTime) - new Date(b.createdTime)
      //     : new Date(b.createdTime) - new Date(a.createdTime)
      // );

      // setTodoList(sortedTodos);
      const todos = data.records
      .map((todo) => ({
          id: todo.id,
          title: todo.fields.title,
          createdTime: todo.createdTime,
      }));

    const sortedTodos = [...todos].sort((a, b) =>
      sortAscending
        ? new Date(a.createdTime) - new Date(b.createdTime)
        : new Date(b.createdTime) - new Date(a.createdTime)
    );

      // setTodoList(todos);
      setTodoList(sortedTodos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // async function addTodo(newTodo) {
  //   const updatedTodoList = [...todoList, newTodo];

    // const sortedTodos = updatedTodoList.sort((a, b) =>
    //   sortAscending 
    //   ? new Date(a.createdTime) - new Date(b.createdTime)
    //   : new Date(b.createdTime) - new Date(a.createdTime)
    // );

    // setTodoList(sortedTodos);
  // }

  async function addTodo(newTodo) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`,
        options
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const todo = await response.json();

      const updatedTodo = {
        id: todo.id,
        title: todo.fields.title,
        createdTime: todo.createdTime,
      };

      setTodoList([...todoList, updatedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  function toggleSortOrder() {
    setSortAscending((prevSortOrder) => !prevSortOrder);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((item) => item.id !== id));
  }

  return (
    <BrowserRouter>
      <div className="App-content">
        <button class="ToggleButton" onClick={toggleSortOrder}>
          Toggle Sort by Time: {sortAscending ? "Ascending" : "Discending"}
        </button>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <h1 className="App-heading">Todo List</h1>
                  <AddTodoForm onAddTodo={addTodo} />
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                </>
              )
            }
          />
          <Route path="/new" element={<h1>New Todo List</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
