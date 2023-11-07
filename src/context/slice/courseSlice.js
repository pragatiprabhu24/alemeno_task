import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;

export const fetchCourses = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3333/courses");
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

