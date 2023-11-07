import React from 'react'
import { Routes, Route } from "react-router-dom"
import CoursesList from '../pages/CoursesList';
import EnrolledCourses from '../pages/EnrolledCourses';
import HomePage from '../pages/HomePage';
import CourseDetailPage from '../pages/CourseDetailPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesList />} />
      <Route path="/enroll" element={<EnrolledCourses />} />
      <Route path="/course/:id" element={<CourseDetailPage />} />
    </Routes>
  );
};

export default Router;
