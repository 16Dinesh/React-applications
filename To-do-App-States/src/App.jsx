import './App.css'
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {

  const [todos, setTodo] = useState([
    {
      task: "Your Task Added Here",
      id: uuidv4(),
      done: false,
      important: false,
    },
  ]);
  
  const [newTodoInp, setNewTodoInp] = useState("");

  const addNewTask = () => {
    if (newTodoInp.trim() === "") return; 
    setTodo((prevTodo) => [
      ...prevTodo, 
      { task: newTodoInp, id: uuidv4(), done: false, important: false }
    ]);
    setNewTodoInp(""); 
  };

  const updateTodoValue = (event) => {
    setNewTodoInp(event.target.value);
  };

  const todoDelete = (id) => {
    setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };


  const DeleteAll = () => {
    setTodo(() => []);
  };


  const markAsImportant = (id) => {
    setTodo((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, important: true, task: todo.task.toUpperCase() } 
          : todo
      );

      const importantTodo = updatedTodos.find((todo) => todo.id === id);
      const otherTodos = updatedTodos.filter((todo) => todo.id !== id);

      return [importantTodo, ...otherTodos]; 
    });
  };

  const markAsDone = (id) => {
    setTodo((prevTodos) => {
      let updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );

      const toggledTodo = updatedTodos.find(todo => todo.id === id);
      if (toggledTodo && toggledTodo.done) {
        updatedTodos = updatedTodos.filter(todo => todo.id !== id);
        updatedTodos.push({ ...toggledTodo, important: false }); 
      }

      return updatedTodos;
    });
  };

  const lineThrough = (done) => {
    return done ? "line-through" : "none";
  };


  return (
    <div className="todo-app">
    <h1 className="todo-title">Todo App</h1>

    <div className="todo-input-section">
      <input
        type="text"
        placeholder="Add a new task"
        value={newTodoInp}
        onChange={updateTodoValue}
        className="todo-input"
      />
      <button onClick={addNewTask} className="todo-button">Submit</button>
    </div>

    <hr />

    <h4 className="centerH4">Tasks List</h4>
    <ul className="todo-list">
      {todos.map((todo) => (
        <li 
          key={todo.id} 
          className="todo-item"
          style={{
            backgroundColor: todo.important ? 'red' : 'transparent',
            color: todo.important ? 'white' : 'black',
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center', 
          }}
        >
          <span
            style={{ 
              textDecoration: lineThrough(todo.done), 
              fontWeight: todo.important ? "bold" : "normal",
              color: todo.important ? 'white' : 'black' 
            }}
          >
            {todo.task}
          </span>
          <div className="todo-actions" style={{ display: 'flex', gap: '10px' }}> 
            <button onClick={() => markAsImportant(todo.id)}>
              Mark as Important
            </button>
            <button onClick={() => markAsDone(todo.id)}>
              {todo.done ? "Undo" : "Mark as Done"}
            </button>
            <button onClick={() => todoDelete(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
    
    <button onClick={DeleteAll} className="uppercase-all-button">Delete All</button>
  </div>
  )
}

export default App
