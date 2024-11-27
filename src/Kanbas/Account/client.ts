import axios from "axios";

export const USERS_API = `http://localhost:4000/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const ENROLLMENTS_API = `http://localhost:4000/api/enrollments`;


export const signin = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
  };
  export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  };
  export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
  };
  export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  };
  export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
  };
  export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    
    return data;
  };
  export const findEnrolledCourses = async (userId : any) => {
    const {data} = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrolled-courses`);
    return data;
  }

  export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
  };
  
  export const findAllCourses=async()=>{
    const {data}=await axiosWithCredentials.get(`http://localhost:4000/api/courses`);
    return data;
  }
  export const addEnrollment = async (enrollment: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/enrolled`, enrollment);
    return data;
  };
  export const getEnrollment = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollmentStatus`,
    { params: { user: userId, course: courseId } }
  );
  return data;
};
  
export const enrollUser = async (data: { courseId: string; userId: string }) => {
  console.log("Payload sent to enrollUser:", data); // Debugging
  const response = await axios.post(`${ENROLLMENTS_API}`, data);
  return response.data;
};


export const unenrollUser = async (unenrollment: { userId: string; courseId: string }) => {
  const response = await axios.delete(ENROLLMENTS_API, { data: unenrollment });
  return response.data;
};
  
    
  