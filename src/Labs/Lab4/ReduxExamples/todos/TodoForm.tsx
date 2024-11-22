import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

    return (
        <li className="list-group-item border p-3 d-flex align-items-center">
  <input
    value={todo.title}
    onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
    className="form-control me-2" // Adds space to the right of the input
  />
  <div className="d-flex"> {/* Added this div to hold buttons together */}
    <button
      onClick={() => dispatch(updateTodo(todo))}
      id="wd-update-todo-click"
      className="btn btn-warning m-1" // Adjusted margin
    >
      Update
    </button>
    <button
      onClick={() => dispatch(addTodo(todo))}
      id="wd-add-todo-click"
      className="btn btn-success m-1" // Adjusted margin
    >
      Add
    </button>
  </div>
</li>

      
  
);}
  