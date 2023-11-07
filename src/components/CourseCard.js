import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Chip } from "@mui/material"; // Import Chip
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { enrollCourse } from "../context/slice/enrolledCoursesSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { markAsComplete } from "../context/slice/enrolledCoursesSlice";
import LinearProgress from '@mui/material/LinearProgress';
import { useLocation } from "react-router-dom";


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [progress, setProgress] = React.useState(10);
    const enrolledCourses = useSelector((state) => state.enrolledCourses);
    const dispatch = useDispatch();
    const isEnrollPage = location.pathname === "/enroll";


    const handleEnroll = (course) => {
        dispatch(enrollCourse(course));
    };

    const handleMarkAsComplete = (course) => {
        dispatch(markAsComplete(course));
    };


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                <Card sx={{
                    maxWidth: '100%',
                    height: '450px',
                    '@media (min-width: 768px)': {
                        maxWidth: '800px',
                    },
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',

                }}

                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="160"
                        image={course.img}
                        onClick={() => navigate(`/course/${course.id}`)}
                        sx={{ cursor: 'pointer' }}
                    /> 

                    <CardContent>
                        <Typography gutterBottom variant="p" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate(`/course/${course.id}`)}>
                            {course.name}
                        </Typography><br />
                        <Typography gutterBottom variant="p">
                            Instructor - {course.instructor}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                            <Rating name="read-only" value={course.rating} readOnly />
                            <Chip icon={<FavoriteIcon style={{ color: '#F24C3D' }} />} label={course.likes} />
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                            {course.description}
                        </Typography>

                        {isEnrollPage ? (
                            <Box sx={{ width: '100%', p: 2 }}>
                                <LinearProgressWithLabel value={progress} />
                            </Box>
                        ) : (
                            <div style={{ padding: '10px' }}>
                                <Typography variant="p" sx={{ fontSize: '14px' }}>
                                    Duration {course.duration}
                                </Typography><br />
                                <Typography variant="p" sx={{ fontSize: '14px' }}>
                                    Mode  {course.location}
                                </Typography>
                            </div>
                        )}

                        {isEnrollPage ? (
                            course.completed ? (
                                <Button fullWidth variant="contained" color="success">
                                    Completed
                                </Button>
                            ) : (
                                <Button fullWidth variant="contained" onClick={() => handleMarkAsComplete(course)}>
                                    Mark as Complete
                                </Button>
                            )
                        ) : (
                            enrolledCourses.some((enrolledCourse) => enrolledCourse.id === course.id) ? (
                                <Button fullWidth variant="contained" disabled>
                                    Enrolled
                                </Button>
                            ) : (
                                <Button fullWidth variant="contained" color="error" onClick={() => handleEnroll(course)}>
                                    Enroll Now
                                </Button>
                            )
                        )
                        }
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CourseCard;