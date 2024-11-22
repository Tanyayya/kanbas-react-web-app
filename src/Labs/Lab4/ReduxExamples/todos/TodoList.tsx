import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div style={{ padding: '5px' }}>
      <h2>Todo List</h2>
      <div
        style={{
          
          
          margin: '5px',
          borderRadius: '5px',
          display: 'inline-block',
        }}
      >
        <ul className="list-group-item" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          <TodoForm />
          {todos.map((todo: any, index: number) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
}
