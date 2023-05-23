import { FC, useState } from "react";
import { Action } from "../reducer/todoReducer";
import { v4 as uuid } from 'uuid';

interface TodoProps {
  dispatch: React.Dispatch<Action>;
}

const Todo: FC<TodoProps> = ({ dispatch }) => {
  //State
  const [todo, setTodo] = useState({
    title: "",
  });

  console.log(todo);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log("Todo:",todo);
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: uuid(),
        ...todo,
        completed: false,
      }
    });
    setTodo({ title: "" });
  };

  return (
    <>
      <div>
        <input
          name="title"
          type="text"
          value={todo.title}
          className="todo-input"
          placeholder="Add your todo..."
          onChange={handleOnChange}
        />
      </div>
      <button type="submit" className="add-button" onClick={handleOnSubmit}>
        Add
      </button>
    </>
  );
};

export default Todo;
