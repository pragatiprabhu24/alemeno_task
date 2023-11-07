import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
    const navigate = useNavigate();
    const enrolledCourses = useSelector((state) => state.enrolledCourses);

    return (
        <>
            <div>
                <div>
                    <Box sx={{ display: "flex" }}>
                        <DashboardLayout />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Box textAlign="center" sx={{ p: 3, mt: 2 }}>
                                <h2>User Enrolled Courses</h2>
                                {enrolledCourses.length === 0 && (
                                    <div>
                                        <img src="https://img.freepik.com/premium-vector/exam-preparation-school-test-examination-concept-checklist-hourglass-choosing-answer_183665-521.jpg"
                                            style={{ width: '300px' }} alt="" />
                                        <h3 style={{ color: 'blue' }}>Till now you not enrollled to any course</h3>
                                        <button class="button-85" role="button" onClick={() => navigate('/courses')}>Explore Courses</button>
                                    </div>
                                )}
                                <Grid container spacing={2}>
                                    {enrolledCourses?.map((course) => (
                                        <Grid item key={course.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                                            <CourseCard course={course} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </div>
            </div>

        </>
    );
};

export default EnrolledCourses;