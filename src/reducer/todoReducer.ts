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
    | "DELETE_TODO"
    | "SET_TODOS";
  payload: TodoInfo | TodoInfo[] | Update | Complete | Delete ;
}
export interface Update {
  id: string;
  title?: string;
}
export interface State {
  todos: TodoInfo[];
}

export interface Complete {
  id: string;
}

export interface Delete {
  id: string;
}

export const todoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload as TodoInfo],
      };

    case "COMPLETED_TODO":
      const {id: completedId} = action.payload as Complete
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === completedId) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };

    case "UPDATE_TODO":
      const {id:updateId, title:updateTitle} = action.payload as Update
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === updateId) {
            return {
              ...todo,
              title: updateTitle,
            };
          }
          return todo;
        }),
      };

    case "DELETE_TODO":
      const {id: deleteId} = action.payload as Delete
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== deleteId),
      };

    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload as TodoInfo[]
      }

    default:
      return state;
  }
};
