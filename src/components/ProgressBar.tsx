import { FC, useState } from "react";

//Reducer
import { TodoInfo } from "../reducer/todoReducer";

interface ProgressBarProps {
  todos: TodoInfo[];
}

const ProgressBar: FC<ProgressBarProps> = ({ todos }) => {
  const todoQuantity = todos.length;
  const completedTodos: number = todos.filter((todo) => todo.completed).length;

  // State
  const [progress, setProgress] = useState<number>(0);

  const getColor = () => {
    if (progress < 40) {
      return "#ff0000";
    } else if (progress < 70) {
      return "#fa5000";
    } else {
      return "#2ecc71"
    }
  }

  return (
    <>
      <div className="progress-input">
        <h3>Progress</h3>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: '${Math.round((completedTodos / todoQuantity) * 100)}%', backgroundColor: getColor()}}>
            {Math.round((completedTodos / todoQuantity) * 100)}%
          </div>
        </div>
        <p>
          Completed {completedTodos} of {todoQuantity}
        </p>
      </div>
    </>
  );
};

export default ProgressBar;
