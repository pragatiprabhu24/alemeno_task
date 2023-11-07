import { createSlice } from '@reduxjs/toolkit';

const enrolledCoursesSlice = createSlice({
    name: 'enrolledCourses',
    initialState: [],
    reducers: {
        enrollCourse: (state, action) => {
            state.push(action.payload); 
        },
        unenrollCourse: (state, action) => {
           
            return state.filter(course => course.id !== action.payload.id);
        },
        markAsComplete: (state, action) => {
            const courseToMark = state.find(course => course.id === action.payload.id);
            if (courseToMark) {
                courseToMark.completed = true;
            }
        }
    }
});

export const { enrollCourse, unenrollCourse, markAsComplete } = enrolledCoursesSlice.actions;

export default enrolledCoursesSlice.reducer;