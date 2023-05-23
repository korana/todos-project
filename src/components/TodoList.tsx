import { FC, useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";

//Components
import EditMenu from "./EditMenu";

//Reducer
import { TodoInfo, Action } from "../reducer/todoReducer";

interface TodoListProps {
  todos: TodoInfo[];
  dispatch: React.Dispatch<Action>;
}

const TodoList: FC<TodoListProps> = ({ todos, dispatch }) => {
  //State
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string | undefined>(undefined);
  const [filterOption, setFilterOption] = useState<string>("all")

  const handleComplete = (todo: TodoInfo) => {
    dispatch({ type: "COMPLETED_TODO", payload: { id: todo.id } });
  };

  const showOptionMenu = (todo: TodoInfo) => {
    setSelectedTodoId((prevId) => (prevId === todo.id ? null : todo.id));
  };

  const handleEdit = (todo: TodoInfo) => {
    setEditingTodoId(todo.id);
    setEditedTitle(todo.title);
    setSelectedTodoId(null);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditedTitle("");
  };

  const saveEditing = (
    event: React.MouseEvent<HTMLButtonElement>,
    todo: TodoInfo
  ) => {
    event.preventDefault();
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        id: todo.id,
        title: editedTitle,
      },
    });
    setEditingTodoId(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value)
  }

  const filterTodos = todos.filter((todo) => {
    if (filterOption === "all") {
      return true;
    } else if (filterOption === "completed") {
      return todo.completed
    } else if (filterOption === "uncompleted") {
      return !todo.completed
    }
    return false;
  })
  console.log('Filter:', filterTodos);



  return (
    <>
      <div className="task">
        <h5>Tasks</h5>
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <div>
        {todos.map((todo) => (
          <div
            className={todo.completed ? "task-input complete" : "task-input"}
          >
            <input type="checkbox" onChange={() => handleComplete(todo)} />
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleTitleChange}
                />
                <button
                  className="save-button"
                  onClick={(event) => saveEditing(event, todo)}
                >
                  Save
                </button>
                <button className="cancel-button" onClick={cancelEditing}>
                  cancel
                </button>
              </>
            ) : (
              <>
                <input type="text" value={todo.title} disabled />
                <div className="action-info">
                  <BsThreeDots size={20} onClick={() => showOptionMenu(todo)} />
                  {selectedTodoId === todo.id && (
                    <EditMenu
                      todo={todo}
                      dispatch={dispatch}
                      handleEdit={handleEdit}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default TodoList;
