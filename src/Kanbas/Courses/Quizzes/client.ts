import axios from "axios";
import mongoose from "mongoose";

// Base API URLs
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const QUIZ_API = `http://localhost:4000/api/quizzes`;
const QUESTION_API = `http://localhost:4000/api/questions`;

// Quiz API Functions
export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quiz._id}`, quiz);
  return data;
};

export const getQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}`);
  return data;
};

export const updateQuizPublish = async (quizId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}`, quiz);
  return data;
};

export const findQuestionsForQuizzes = async (quizId: any) => {
  const response = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/questions`);
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
    throw new Error("Invalid question _id");
  }

  try {
    const { data } = await axiosWithCredentials.put(`${QUESTION_API}/${question._id}`, question);
    return data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const getQuestions = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/questions`);
  return data;
};

export const publishQuiz = async (quizId: string, isPublished: boolean) => {
  try {
    const response = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}/publish`, {
      isPublished,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error publishing/unpublishing quiz:", error?.response?.data || error.message);
    throw error;
  }
};

export const createAttempt = async (
  quizId: string,
  userID: string,
  attempt: {
  attemptNumber: number;
  answers: { question: string; selectedAnswer: string; correct: Boolean  }[]; // Array of answers
  score: number; // Total score
  completedAt: Date;
}
): Promise<any> => {
  try {
    // Post attempt data to the API
    const response = await axios.post(`${QUIZ_API}/${quizId}/attempt`, {
      ...attempt,
      student: userID, 
    });

    return response.data; 
  } catch (error: any) {
    console.error(`Error creating attempt for quiz ${quizId}:`, error);

    
    throw new Error(
      error.response?.data?.error ||
        "An unexpected error occurred while creating the attempt."
    );
  }
};
export const getLastAttempt = async (quizId: string, userId: string) => {
  try {
    const { data } = await axiosWithCredentials.get(
      `${QUIZ_API}/${quizId}/user/${userId}/attempts/last`
    );
    return data; // Return the last attempt data
  } catch (error: any) {
    console.error("Error fetching last attempt:", error);
    throw error;
  }
};



