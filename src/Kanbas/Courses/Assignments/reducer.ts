import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
      
    },

    addAssignment: (state, action) => {
      
      // state.assignments.push(action.payload); 
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
      // state.assignments = state.assignments.map((a) =>
      //   a._id === id ? { ...a, ...data } : a
      // );
    },
  },
});
export const { addAssignment,deleteAssignment ,updateAssignment , editAssignment,setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;