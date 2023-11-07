import { configureStore } from '@reduxjs/toolkit';
import courseReducer from '../slice/courseSlice';
import enrolledCoursesReducer from '../slice/enrolledCoursesSlice';
import singleCourseReducer from '../slice/singleCourseSlice';

const store = configureStore({
  reducer: {
    courses: courseReducer,
    enrolledCourses: enrolledCoursesReducer,
    singleCourse: singleCourseReducer
  },

});

export default store;