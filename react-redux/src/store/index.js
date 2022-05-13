// import { createStore } from 'redux';

// const reducerFn = (state = { counter: 10 }, action) => {
//   // Synchronous Functions
//   // We should not mutate the original state because it will crash the application.
//   if (action.type === "INC") {
//     return { counter: state.counter + 1 };
//   }
//   if (action.type === "DEC") {
//     return { counter: state.counter - 1 };
//   }
//   if (action.type === "ADD") {
//     return { counter: state.counter + action.payload };
//   }
//   return state;
// }

// const store = createStore(reducerFn);

// export default store;

import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 },
  reducers: {
    increase(state, action) {
      state.counter++;
    },
    decrease(state, action) {
      state.counter--;
    },
    addBy(state, action) {
      state.counter += action.payload;
    }
  }
})
export const actions = counterSlice.actions
const store = configureStore({
  reducer: counterSlice.reducer
})
export default store;