import React, {useState, useEffect} from "react";
import "./App.css";
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // States
  const [inputText, setInputText] = useState(""); // 문자열 초기값: 빈 문자열
  const [todos, setTodos] = useState([]); // 배열 초기값: 빈 배열
  const [status, setStatus] = useState("all"); // 문자열 초기값: all
  const [filteredTodos, setFilteredTodos] = useState([]); // 배열 초기값: 빈 배열

  // RUN ONCE when the app starts
  useEffect(() => {
    // getLocalTodos();
  }, []);

  // Use effect
  useEffect(() => {
    filteredHandler();
    // saveLocalTodos();
  }, [todos, status]);

  // Functions
  const filteredHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  // Save to local
  // const saveLocalTodos = () => {
  //   localStorage.getItem("todos", JSON.stringify(todos));
  // };
 
  // const getLocalTodos = () => {
  //   if(localStorage.getItem("todos" === null)) {
  //     localStorage.setItem("todos", JSON.stringify([]));
  //   } else {
  //     let todoLocal = JSON.parse(localStorage.getItem("todos"));
  //     setTodos(todoLocal);
  //   }
  // };

  return (
    <div className="App">
      <header>
        <h1>Min's Todo List</h1>
      </header>
      <Form 
      inputText={inputText}
      setInputText={setInputText}
      todos={todos}
      setTodos={setTodos}
      setStatus={setStatus}
      />
      <TodoList 
      todos={todos}
      setTodos={setTodos}
      filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
