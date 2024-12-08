import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer"; 
import enrollmentsReducer from "./Account/enrollmentsReducer";
import enrollmentReducer from "./Dashboard/reducer"
import quizzesReducer from "./Courses/Quizzes/reducer"
import questionsReducer from "./Courses/Quizzes/questionReducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    enrollmentReducer,
    quizzesReducer,
    questionsReducer
  },
});
export default store;