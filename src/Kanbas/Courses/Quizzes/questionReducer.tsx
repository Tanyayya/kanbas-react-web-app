import { createSlice } from "@reduxjs/toolkit";

const initialState: { questions:any } = {
  questions: [],
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      
    },

    addQuestions: (state, action) => {
      
       state.questions.push(action.payload); 
    },
    deleteQuestions: (state, action) => {
      state.questions = state.questions.filter(
        (a: any) => a._id !== action.payload);
    },
    updateQuestions: (state, { payload: question }) => {
      state.questions = state.questions.map((a: any) =>
        a._id === question._id ? question : a
      ) as any;
    },
    editQuestions: (state, { payload: { id, data } }) => {
      state.questions = state.questions.map((a:any) =>
        a._id === id ? { ...a, ...data } : a
      );
    },
  },
});
export const { addQuestions,deleteQuestions ,updateQuestions , editQuestions,setQuestions } =
  questionsSlice.actions;
export default questionsSlice.reducer;