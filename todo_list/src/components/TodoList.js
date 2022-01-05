import React from "react";
// import components
import Todo from "./Todo";

const TodoList = ({ todos, setTodos, filteredTodos }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        { // Here I can write javascript code..
				filteredTodos.map((todo) => ( // access to each todo from states.todos
          <Todo
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
            text={todo.text}
            key={todo.id}
            todo={todo}
          /> // for each todo to render out Todo component
				))
				}
      </ul>
    </div>
  );
};

export default TodoList;
