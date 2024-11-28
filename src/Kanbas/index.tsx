import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard/Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";

import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useState,useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";
export default function Kanbas() {

  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchEnrolledCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };
 
  const fetchAllCourses=async()=>{
    try{
      const allCourses=await userClient.findAllCourses();
      setAllCourses(allCourses);
    }catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      fetchAllCourses();
      fetchEnrolledCourses();
    } else {
      setAllCourses([]); // Clear all courses if no user is logged in
      setEnrolledCourses([]); // Clear enrolled courses
    }
  }, [currentUser]);
  
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    img: "./images/reactjsCourse.webp", description: "New Description"
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setAllCourses([ ...allCourses, newCourse ]);
    await fetchEnrolledCourses();
  };


  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    setEnrolledCourses((prevEnrolled) => prevEnrolled.filter((c) => c._id !== courseId));

  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    const updatedEnrolledCourses = await userClient.findMyCourses();
      setEnrolledCourses(updatedEnrolledCourses);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })
  );};



  return (
    <Session>
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={<ProtectedRoute>
            <Dashboard
              allCourses={allCourses}
              enrolledCourses={enrolledCourses} 
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
              setEnrolledCourses={setEnrolledCourses} />
               
          </ProtectedRoute>} />
          <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
    </Session>
  );
}