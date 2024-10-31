import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      
      state.assignments.push(action.payload); 
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== action.payload);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: { id, data } }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === id ? { ...a, ...data } : a
      );
    },
  },
});
export const { addAssignment,deleteAssignment ,updateAssignment , editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;