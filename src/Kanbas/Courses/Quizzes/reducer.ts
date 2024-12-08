import { createSlice } from "@reduxjs/toolkit";

const initialState: { quizzes:any } = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
      
    },

    addQuizzes: (state, action) => {
      
       state.quizzes.push(action.payload); 
    },
    deleteQuizz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== action.payload);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
    editQuiz: (state, { payload: { id, data } }) => {
      state.quizzes = state.quizzes.map((a:any) =>
        a._id === id ? { ...a, ...data } : a
      );
    },
  },
});
export const { addQuizzes,deleteQuizz ,updateQuiz , editQuiz,setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;