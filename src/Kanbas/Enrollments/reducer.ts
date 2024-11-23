import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
    enrollments: db.enrollments,
}

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            state.enrollments = [...state.enrollments, enrollment];
            console.log("Enrollment added: ", state.enrollments);
        },
        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter(
                (enrollment: any) => enrollment._id !== enrollmentId
            );
            console.log("Enrollment deleted: ", state.enrollments);
        },
    },
});

export const { addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;