import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const singleCourseSlice = createSlice({
    name: 'singleCourse',
    initialState: {
        singleCourse: {} 
      },
    reducers: {
      setSingleCourse: (state, action) => {
        state.singleCourse = action.payload;
      },
    },
  });
  
  export const { setSingleCourse } = singleCourseSlice.actions;
  export default singleCourseSlice.reducer;
  
  export const fetchSingleCourse = (courseId) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3333/courses/${courseId}`);
      dispatch(setSingleCourse(response.data));
    } catch (error) {
      console.error(`Error fetching course with ID ${courseId}:`, error);
    }
  };