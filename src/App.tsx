import { useReducer } from "react";

// Components
import Todo from "./components/Todo";
import ProgressBar from "./components/ProgressBar";
import TodoList from "./components/TodoList";
import "./App.css";

// Reducer
import { todoReducer, State } from "./reducer/todoReducer";

const initialState: State = {
  todos: [],
};

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  console.log('State:',state)
  
  return (
    <>
      <form>
        <ProgressBar todos={state.todos} />
        {state.todos.length > 0 && <TodoList todos={state.todos} dispatch={dispatch} />}
        <Todo dispatch={dispatch} />
      </form>
    </>
  );
};
export default App;
