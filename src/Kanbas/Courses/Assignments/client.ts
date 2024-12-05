import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const ASSIGNMENT_API = `http://localhost:4000/api/assignments`;
export const deleteAssignment = async (assignmentId: string) => {
 const response = await axiosWithCredentials.delete(`${ASSIGNMENT_API}/${assignmentId}`);
 return response.data;
};
export const updateAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    return data;
  };
 
   
  
