import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const MODULES_API = `https://kanbas-node-server-app-2-z0sr.onrender.com/api/modules`;
export const deleteModule = async (moduleId: string) => {
 const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
 return response.data;
};
export const updateModule = async (module: any) => {
    const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
    return data;
  };
  

  
  