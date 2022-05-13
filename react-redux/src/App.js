import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store/index'

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const increase = () => {
    // dispatch({ type: 'INC' }) // without redux tool kit
    dispatch(actions.increase());
  }
  const decrease = () => {
    // dispatch({ type: 'DEC' })
    dispatch(actions.decrease());
  }
  const addBy = () => {
    // dispatch({ type: 'ADD', payload: 10 })
    dispatch(actions.addBy(10));
  }
  return (
    <div>
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={addBy}>Add By 10</button>
    </div>
  );
}

export default App;
