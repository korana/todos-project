export interface TodoInfo {
  id: string;
  title: string | undefined;
  completed: boolean;
}

export interface Action {
  type:
    | "ADD_TODO"
    | "COMPLETED_TODO"
    | "UPDATE_TODO"
    | "DELETE_TODO";
  payload: TodoInfo | Update ;
}

export interface Update {
  id: string;
  title?: string;
}

export interface State {
  todos: TodoInfo[];
}

export const todoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload as TodoInfo],
      };

    case "COMPLETED_TODO":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };

    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }
          return todo;
        }),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    default:
      return state;
  }
};
