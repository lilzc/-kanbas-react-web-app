import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Account from "./Account";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import Signin from "./Account/Signin";
import KanbasProtectedRoute from "./ProtectedRoute";
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
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description"
  });

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => c._id === course._id ? course : c)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const findCoursesForUser = async () => {
    try {
      if (!currentUser?._id) return;
      const courses = await userClient.findMyCourses(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

const fetchCourses = async () => {
  try {
    if (!currentUser?._id) return;
    const allCourses = await courseClient.fetchAllCourses();
    const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
    const courses = allCourses.map((course: Course) => ({
      ...course,
      enrolled: enrolledCourses.some((c: Course) => c._id === course._id)
    }));
    setCourses(courses);
  } catch (error) {
    console.error(error);
  }
};

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      
      setCourses(courses.map((course) => 
        course._id === courseId ? { ...course, enrolled } : course
      ));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      enrolling ? fetchCourses() : findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const dashboardProps = {
    course,
    courses, 
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrolling,
    setEnrolling,
    updateEnrollment
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
                <KanbasProtectedRoute {...dashboardProps}>
                  <Dashboard />
                </KanbasProtectedRoute>
              } 
            />
            <Route 
              path="Courses" 
              element={
                <KanbasProtectedRoute {...dashboardProps}>
                  <Courses courses={courses} />
                </KanbasProtectedRoute>
              } 
            />
            <Route 
              path="Courses/:courseId/*" 
              element={
                <KanbasProtectedRoute {...dashboardProps}>
                  <Courses courses={courses} />
                </KanbasProtectedRoute>
              } 
            />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
            <Route 
              path="Courses/:courseId/Assignments/:assignmentId/edit" 
              element={
                <KanbasProtectedRoute {...dashboardProps}>
                  <AssignmentEditor />
                </KanbasProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Session>
  );
}