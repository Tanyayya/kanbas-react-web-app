import axios from "axios";

export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`https://kanbas-node-server-app-5z6w.onrender.com/lab5/welcome`);
  return response.data;
};
const ASSIGNMENT_API = `https://kanbas-node-server-app-5z6w.onrender.com/lab5/assignment`;
export const fetchAssignment = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}`);
  return response.data;
};
export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};
export const updateTodo = async (todo: any) => {
    const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
    return response.data;
  };
  

const TODOS_API = `https://kanbas-node-server-app-5z6w.onrender.com/lab5/todos`;
export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};
export const removeTodo = async (todo: any) => {
    const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
    return response.data;
  };
  export const deleteTodo = async (todo: any) => {
    const response = await axios.delete(`${TODOS_API}/${todo.id}`);
    return response.data;
  };
  
  export const createTodo = async () => {
    const response = await axios.get(`${TODOS_API}/create`);
    return response.data;
  };
  export const postTodo = async (todo: any) => {
    const response = await axios.post(`${TODOS_API}`, todo);
    return response.data;
  };
  
  
  