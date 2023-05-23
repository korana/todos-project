import { useReducer, useEffect } from "react";
import axios from "axios";

// Components
import Todo from "./components/Todo";
import ProgressBar from "./components/ProgressBar";
import TodoList from "./components/TodoList";
import "./App.css";

// Reducer
import { todoReducer, State, TodoInfo } from "./reducer/todoReducer";



const initialState: State = {
  todos: []
};


const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  console.log("State:", state);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/todos"
      );
      const todosData: TodoInfo[] = response.data
      dispatch ({type: "SET_TODOS", payload: todosData})
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <>
      <form>
        <ProgressBar todos={state.todos} />
        {state.todos.length > 0 && (
          <TodoList todos={state.todos} dispatch={dispatch} />
        )}
        <Todo dispatch={dispatch} />
      </form>
    </>
  );
};
export default App;
