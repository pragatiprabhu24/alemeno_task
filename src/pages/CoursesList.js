import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../context/slice/courseSlice";
import { Box, Grid, TextField } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import CourseCard from "../components/CourseCard";

const CoursesList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchInitiated, setSearchInitiated] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);


  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        course.instructor.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredCourses(filtered);
    setSearchInitiated(true);
  };

  return (
    <>
      <div>
        <div>
          <Box sx={{ display: "flex" }}>
            <DashboardLayout />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Box textAlign="center" sx={{ p: 3, mt: 1, mb: 2 }}>
                <div style={{ padding: '20px' }}>
                  <TextField
                    label="Search Courses"
                    variant="outlined"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    size="small"
                    sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}
                  />
                </div>
                <Grid container spacing={2}>
                  {(searchInitiated ? filteredCourses : courses).map((course) => (
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

export default CoursesList;