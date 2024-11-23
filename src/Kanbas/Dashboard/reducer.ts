import { createSlice } from '@reduxjs/toolkit';
import { enrollments } from '../Database';

const initialState = {
    enrollments:enrollments,
     
};

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {
        setEnrollments(state, action) {
             state.enrollments = action.payload;
        },
        enrollCourse(state, action) {
            state.enrollments.push(action.payload);
        },
        unenrollCourse(state, action) {
            const { user, course } = action.payload;
            state.enrollments = state.enrollments.filter(
                (e) => e.user !== user || e.course !== course
            );
        },
       
    },
});

export const { enrollCourse, unenrollCourse,setEnrollments } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
