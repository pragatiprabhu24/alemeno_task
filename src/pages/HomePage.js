import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../context/slice/courseSlice";
import { Box, Grid } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import CourseCard from "../components/CourseCard";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courses = useSelector((state) => state.courses.courses);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    return (
        <div>
            <div>
                <Box sx={{ display: "flex" }}>
                    <DashboardLayout />
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <Box textAlign="center" sx={{ p: 3, }}>
                            <div>
                                <h2>Free Online Courses</h2>
                                <p>Our free online courses provide you with an affordable and flexible way to learn new skills and study new and emerging topics. Learn from instructors and industry experts at no cost to you.</p>
                            </div>
                            <Grid container spacing={2}>
                                {courses.slice(0, 4).map((course) => (
                                    <Grid item key={course.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                                        <CourseCard course={course} />
                                    </Grid>
                                ))}
                            </Grid>
                            <button class="button-85" role="button" onClick={() => navigate('/courses')}>Explore Courses</button>
                        </Box>
                    </Box>
                </Box>
            </div>

        </div>
    );
};

export default HomePage;