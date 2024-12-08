import axios from "axios";
import mongoose from 'mongoose';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const QUIZ_API = `http://localhost:4000/api/quizzes`;
const QUESTION_API = `http://localhost:4000/api/questions`;
export const deleteQuiz = async (quizId: string) => {
 const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
 return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quiz._id}`, quiz);
    return data;
  };

  export const findQuestionsForQuizzes = async (quizId: string) => {
    const response = await axiosWithCredentials
      .get(`${QUIZ_API}/${quizId}/questions`);
    return response.data;
  };
  export const createQuestionsForQuiz = async (quizId: string, question: any) => {
    const response = await axiosWithCredentials.post(
      `${QUIZ_API}/${quizId}/questions`,
      question
    );
    return response.data;
  };
  export const deleteQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUESTION_API}/${questionId}`);
    return response.data;
   };
   export const updateQuestion = async (question: any) => {
    
    if (question._id && mongoose.Types.ObjectId.isValid(question._id)) {
      
      question._id = new mongoose.Types.ObjectId(question._id);
    } else {
      
      throw new Error('Invalid question _id');
    }
  
    try {
      const { data } = await axiosWithCredentials.put(`${QUESTION_API}/${question._id}`, question);
      return data;
    } catch (error) {
      // Handle error (log or rethrow)
      console.error('Error updating question:', error);
      throw error;
    }
  };