import { useState, useEffect } from "react";
import AddTodo from "./Components/AddTodo.js";
import TaskList from "./Components/TaskList.js";
import { FaListCheck } from "react-icons/fa6";

export default function App() {
  const [todos, setTodos] = useState(
    localStorage.UserToDo ? JSON.parse(localStorage.UserToDo) : []
  );

  useEffect(() => {
    localStorage.UserToDo = JSON.stringify(todos);
  }, [todos]);

  const handleAddTodo = (todoTxt) => {
    let index = todos.length ? todos[todos.length - 1].id + 1 : 0;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: index, title: todoTxt, done: false },
    ]);
  };

  const handleChangeTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todoId)
    );
  };

  return (
    <div className="main">
      <section>
        <h1>
          <FaListCheck /> My Todos
        </h1>
        <AddTodo onAddTodo={handleAddTodo} />

        <TaskList
          todos={todos}
          onChangeTodo={handleChangeTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </section>
    </div>
  );
}
