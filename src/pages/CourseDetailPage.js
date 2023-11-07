import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Grid, Stack, Button, Chip } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { fetchSingleCourse } from "../context/slice/singleCourseSlice";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { enrollCourse } from "../context/slice/enrolledCoursesSlice";


const CourseDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleCourse = useSelector((state) => state.singleCourse.singleCourse);
    const enrolledCourses = useSelector((state) => state.enrolledCourses);

    useEffect(() => {
        dispatch(fetchSingleCourse(id));
    }, [dispatch, id]);


    const handleEnroll = (course) => {
        dispatch(enrollCourse(course));
    };

    const syllabusItems = singleCourse?.syllabus?.map((item, index) => (
        <>
            <div key={index}>
                <p>Week - {item.week}</p>
                <p>Tpoic - {item.topic}</p>
                <p>Content Covered - {item.content}</p>
            </div><hr />
        </>
    ));

    const prerequisitesItems = singleCourse?.prerequisites?.map((item, index) => (
        <>
            <div key={index}>
                <p>{item}</p>
            </div>
        </>
    ));

    return (
        <>
            <div>
                <div>
                    <Box sx={{ display: "flex" }}>
                        <DashboardLayout />
                        <Box component="main" sx={{ flexGrow: 1 }}>
                            <div style={{ backgroundColor: '#E3F4F4', marginTop: '2rem' }}>
                                <Container>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        <Grid item xs={8}>
                                            <div style={{ padding: '20px' }}>
                                                <div>
                                                    <Rating name="read-only" value={singleCourse.rating} readOnly /><br />
                                                    <Chip sx={{ p: 2 }} label={singleCourse.enrollmentStatus} />
                                                    <h2>{singleCourse.name}</h2>
                                                    <p>{singleCourse.description}</p>
                                                </div>
                                                <Stack direction="row" spacing={2}>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Instructor - {singleCourse.instructor}
                                                    </Typography>

                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Duration - {singleCourse.duration}
                                                    </Typography>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Mode - {singleCourse.location}
                                                    </Typography>
                                                </Stack>
                                                <div style={{ marginTop: '20px' }}>
                                                    {enrolledCourses.some((enrolledCourse) => enrolledCourse.id === singleCourse.id) ? (
                                                        <Button variant="contained" disabled>Enrolled</Button>
                                                    ) : (
                                                        <Button variant="contained" color="error" onClick={() => handleEnroll(singleCourse)}>Enroll Now</Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box textAlign="center" sx={{ p: 2 }}>
                                                <img src={singleCourse.img} style={{ width: '250px' }} alt="" />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </div>
                            <Container>
                                <div>
                                    <Grid container spacing={{ xs: 2, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        <Grid item xs={6}>
                                            <h3>Syllabus</h3>
                                            {syllabusItems}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div>
                                                <h3>Schedule</h3>
                                                {singleCourse.schedule}
                                            </div>
                                            <div>
                                                <h3>Prerequisites</h3>
                                                {prerequisitesItems}
                                            </div>
                                            <div>
                                                <h3>Due Date</h3>
                                                {singleCourse.due}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Container>
                        </Box>
                    </Box>
                </div>
            </div>
        </>
    )
}
export default CourseDetailPage;