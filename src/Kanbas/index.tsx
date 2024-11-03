import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Account from "./Account";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import Signin from "./Account/Signin";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as db from "./Database";
import "./Style.css";
import "./KanbasNavigation.css";
import "./Courses/Navigation";
import AssignmentEditor from './Courses/Assignments/AssignmentEditor';

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description"
  });

  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };

  return (
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
                  courses={courses}
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
  );
}