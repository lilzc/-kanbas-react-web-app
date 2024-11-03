import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enrollInCourse, unenrollFromCourse } from "./Account/reducer";
import { RootState } from "./store";
import * as db from "./Database";
import './Dashboard.css';

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}: DashboardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, enrollments, unenrolledDbCourses } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [showAllCourses, setShowAllCourses] = useState(false);

  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

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
    
    // Check Redux enrollments
    return enrollments.some(
      enrollment => 
        enrollment.user === currentUser?._id && 
        enrollment.course === courseId
    );
  };

  const handleEnroll = (courseId: string) => {
    dispatch(enrollInCourse({
      user: currentUser?._id,
      course: courseId,
    }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollFromCourse({
      user: currentUser?._id,
      course: courseId,
    }));
  };

  const handleCourseClick = (courseId: string, e: React.MouseEvent) => {
    if (isStudent && !isEnrolled(courseId)) {
      e.preventDefault();
      navigate("/Kanbas/Dashboard");
    }
  };

  const displayedCourses = !showAllCourses && isStudent
    ? courses.filter((course) => isEnrolled(course._id))
    : courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      {isStudent && (
        <button 
          className="btn btn-primary float-end mb-2"
          onClick={() => setShowAllCourses(!showAllCourses)}
          style={{ backgroundColor: '#0d6efd' }}
        >
          Enrollments
        </button>
      )}

      {isFaculty && (
        <>
          <h5>New Course</h5>
          <input 
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea 
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <button 
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
          <button 
            className="btn btn-primary float-end"
            onClick={addNewCourse}
            id="wd-add-new-course-click"
          >
            Add
          </button>
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {!showAllCourses && isStudent ? "My Courses" : "Published Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {displayedCourses.map((c) => (
          <div key={c._id} className="wd-dashboard-course col">
            <div className="card rounded-3 overflow-hidden h-100 d-flex flex-column">
              {isStudent && (
                <div className="card-header">
                  {isEnrolled(c._id) ? (
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleUnenroll(c._id)}
                    >
                      Unenroll
                    </button>
                  ) : (
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleEnroll(c._id)}
                    >
                      Enroll
                    </button>
                  )}
                </div>
              )}
              
              <Link 
                to={`/Kanbas/Courses/${c._id}/Home`} 
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={(e) => handleCourseClick(c._id, e)}
              >
                <img src={`/images/${c.image || 'reactjs.jpg'}`} alt={c.name} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {c.name}
                  </h5>
                  <p className="wd-dashboard-course-description card-text">
                    {c.description}
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
              
              {isFaculty && (
                <div className="d-flex flex-column">
                  <button 
                    className="btn btn-warning w-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setCourse({ ...c });
                    }}
                    id="wd-edit-course-click"
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger w-100"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteCourse(c._id);
                    }}
                    id="wd-delete-course-click"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}