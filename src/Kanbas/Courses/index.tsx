import React from "react";
import { Routes, Route, useParams, useLocation, Link } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";  
import { courses } from "../Database"; 
import AssignmentEditor from "./Assignments/AssignmentEditor";

function Courses() {
  const { courseId } = useParams<{ courseId: string }>();
  const { pathname } = useLocation();
  
  const course = courses.find((course) => course._id === courseId);

  if (!courseId) {
    return (
      <div>
        <h1>Course List</h1>
        <ul>
          {courses.map(course => (
            <li key={course._id}>
              <Link to={`/Kanbas/Courses/${course._id}`}>{course.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">
        <FaAlignJustify className="me-2" />
        {course ? course.name : `Course ${courseId}`}
      </h2>
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;