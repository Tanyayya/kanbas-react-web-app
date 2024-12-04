// import axios from "axios";

// const axiosWithCredentials = axios.create({ withCredentials: true });

// export const ENROLLMENT_API = "http://localhost:4000/api/enrollment";

// export const deleteEnrollment = async (courseId: string) => {
//     const response = await axiosWithCredentials.delete(`${ENROLLMENT_API}/${courseId}`);
//     return response.data;
// };

// export const createEnrollment = async (courseId: any) => {
//     const { data } = await axiosWithCredentials.post(`${ENROLLMENT_API}/${courseId}`);
//     return data;
// };

// export const getAllEnrollmentsForCourse = async (courseId: any) => {
//     const { data } = await axiosWithCredentials.get(`${ENROLLMENT_API}/${courseId}`);
//     return data;
// };

import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });



export const ENROLLMENTS_API = "http://localhost:4000/api/enrollments";
export const enrollUser = async (data: { courseId: string; userId: string }) => {
    console.log("Payload sent to enrollUser:", data); // Debugging
    const response = await axios.post(`${ENROLLMENTS_API}`, data);
    return response.data;
  };
  

  export const unenrollUser = async (unenrollment: { userId: string; courseId: string }) => {
    const response = await axios.delete(ENROLLMENTS_API, { data: unenrollment });
    return response.data;
  };
