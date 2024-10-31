import { createSlice } from '@reduxjs/toolkit';
import { enrollments } from '../Database';
const initialState = {
    enrollments: enrollments
    //  [] as { user: string; course: string }[], 
};

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {
        enrollCourse(state, action) {
            state.enrollments.push(action.payload);
        },
        unenrollCourse(state, action) {
            state.enrollments = state.enrollments.filter(
                (enrollment) => !(enrollment.user === action.payload.user && enrollment.course === action.payload.course)
            );
        },
    },
});

export const { enrollCourse, unenrollCourse } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
