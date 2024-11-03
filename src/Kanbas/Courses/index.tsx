import React from "react";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import { RootState } from "../store";
import * as db from "../Database";

interface CoursesProps {
  courses: any[];
}

function Courses({ courses }: CoursesProps) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser, enrollments, unenrolledDbCourses } = useSelector(
    (state: RootState) => state.accountReducer
  );
  
  const isStudent = currentUser?.role === "STUDENT";

  const isEnrolled = (courseId: string): boolean => {
    if (!isStudent) return false;
    
    const isInDatabase = db.enrollments.some(
      enrollment => 
        enrollment.user === currentUser?._id && 
        enrollment.course === courseId
    );
    
   
    if (isInDatabase && !unenrolledDbCourses.includes(courseId)) {
      return true;
    }
    

    return enrollments.some(
      enrollment => 
        enrollment.user === currentUser?._id && 
        enrollment.course === courseId
    );
  };

  React.useEffect(() => {
    if (isStudent && courseId) {
      const checkAccess = async () => {
        if (!isEnrolled(courseId)) {
          navigate("/Kanbas/Dashboard");
        }
      };
      checkAccess();
    }
  }, [courseId, isStudent, isEnrolled, navigate]);

  const course = courses.find((course) => course._id === courseId);

  const displayedCourses = isStudent
    ? courses.filter(course => isEnrolled(course._id))
    : courses;

  if (!courseId) {
    return (
      <div>
        <h1>Course List</h1>
        <ul>
          {displayedCourses.map(course => (
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