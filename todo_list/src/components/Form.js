import React from "react";

const Form = ({inputText, setInputText, todos, setTodos, setStatus}) => {
	// Here I can write javascript code and function

	const inputTextHandler = (e) => {
		console.log(e.target.value);
		setInputText(e.target.value);
	}

	const submitTodoHandler = (e) => {
		e.preventDefault();
		setTodos([
			...todos, // pass the items added to the todo list and continue on the next item for a new input
			{text: inputText, completed: false, id: Math.ceil(Math.random()*1000000)}
		]);
		setInputText(""); // reset the input state after setting the states
	}

	const statusHandler = (e) => {
		setStatus(e.target.value); // selected value from the select tag is set to status in states.
	}

	return (
    <form>
      <input value={inputText} type="text" className="todo-input" 
			onChange={inputTextHandler}/>
      <button className="todo-button" type="submit"
			onClick={submitTodoHandler}>
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
				<select onChange={statusHandler}
				 name="todos" className="filter-todo">
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="uncompleted">Uncompleted</option>
				</select>
			</div>
    </form>
  );
};

export default Form;
