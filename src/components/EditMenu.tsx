import { FC } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { TodoInfo, Action } from "../reducer/todoReducer";

interface EditMenuProps {
  todo: TodoInfo
  dispatch:React.Dispatch<Action>
  handleEdit: (todo: TodoInfo) => void
}

const EditMenu: FC<EditMenuProps> = ({todo, dispatch, handleEdit}) => {

  const handleDelete = (todo: TodoInfo) => {
    dispatch({type: "DELETE_TODO", payload: { id: todo.id }})
  }

  return (
    <>
        <div className="popup-input" id={todo.id}>
          <div className="popup-info" onClick={() => handleEdit(todo)} >
            <div>Edit</div>
            <AiFillEdit size={20} />
          </div>
          <div className="popup-info" onClick={() => handleDelete(todo)}>
            <div>Delete</div>
            <AiFillDelete size={20} />
          </div>
        </div>
    </>
  );
};

export default EditMenu;
