import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Account from "./Account";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import Signin from "./Account/Signin";
import ProtectedRoute from "./Account/ProtectedRoute";
import AssignmentEditor from './Courses/Assignments/AssignmentEditor';
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { Course } from './interfaces';
import "./Style.css";
import "./KanbasNavigation.css";
import "./Courses/Navigation";

export default function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description"
  });

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await userClient.findMyCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);


const addNewCourse = async () => {
  try {
    const newCourse = {
      ...course,
      creator: currentUser?._id
    };
    const createdCourse = await courseClient.createCourse(newCourse);
    setCourses([...courses, createdCourse]);
  } catch (error) {
    console.error(error);
  }
};

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          }
          return c;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <Session>
      <div className="d-flex">
        <KanbasNavigation />
        <div style={{ marginLeft: '90px', width: 'calc(100% - 90px)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
            <Route path="Account/*" element={<Account />} />
            <Route path="Account/Signin" element={<Signin />} />
            <Route 
              path="Dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              } 
            />
           <Route 
  path="Courses" 
  element={
    <ProtectedRoute>
      <Courses courses={courses} />
    </ProtectedRoute>
  } 
/>
<Route 
  path="Courses/:courseId/*" 
  element={
    <ProtectedRoute>
      <Courses courses={courses} />
    </ProtectedRoute>
  } 
/>

            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
            <Route 
              path="Courses/:courseId/Assignments/:assignmentId/edit" 
              element={
                <ProtectedRoute>
                  <AssignmentEditor />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Session>
  );
}