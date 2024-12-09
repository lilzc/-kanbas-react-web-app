import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Course } from "./interfaces";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Enrollments/client";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolling, setEnrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCourses = async () => {
    if (!currentUser?._id) {
      console.log("No current user, skipping fetch");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      console.log("Fetching courses for user:", currentUser._id);
      
      const allCourses = await courseClient.fetchAllCourses();
      console.log("Fetched courses:", allCourses);
      
      const enrolledCourses = await enrollmentClient.findEnrollmentsByUser(currentUser._id);
      console.log("Fetched enrollments:", enrolledCourses);
      
      const enrolledIds = new Set(enrolledCourses.map((e: any) => e.course._id));
      const coursesWithEnrollment = allCourses.map((course: Course) => ({
        ...course,
        enrolled: enrolledIds.has(course._id)
      }));

      setCourses(enrolling ? coursesWithEnrollment 
                           : coursesWithEnrollment.filter((c: Course) => c.enrolled));
      setError(null);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError(err.message || "Failed to load courses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Dashboard effect triggered:", { 
      currentUser: currentUser?._id, 
      isLoading, 
      enrolling 
    });
    
    if (currentUser && currentUser._id) {
      // If we have a currentUser with an ID, attempt to fetch courses
      fetchCourses();
    } else {
      // If we don’t have a currentUser yet, it might still be loading
      // Keep isLoading true to indicate we’re waiting for user data
      if (!currentUser) {
        console.log("No user data yet, still loading...");
        setIsLoading(true);
      } else {
        // If currentUser is defined but has no _id, user might not be logged in
        setIsLoading(false);
      }
    }
  }, [currentUser?._id, enrolling]); // Removed the second useEffect

  const updateEnrollment = async (courseId: string, shouldEnroll: boolean) => {
    if (!currentUser?._id) return;
    try {
      if (shouldEnroll) {
        await enrollmentClient.enrollInCourse(currentUser._id, courseId);
      } else {
        await enrollmentClient.unenrollFromCourse(currentUser._id, courseId);
      }
      await fetchCourses();
    } catch (err: any) {
      setError(err.message || "Failed to update enrollment");
    }
  };

  // If we are still waiting for the profile to load or user to log in, show a loading state
  if (isLoading) return <div>Loading...</div>;

  // If we have no currentUser after loading finishes, prompt login
  if (!currentUser) return <div>Please log in to view the dashboard.</div>;

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canViewCourse = (course: Course) => {
    return currentUser.role === "FACULTY" || currentUser.role === "ADMIN" || course.enrolled;
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">
        Dashboard
        {currentUser.role === "STUDENT" && (
          <button
            className="btn btn-primary float-end"
            onClick={() => setEnrolling(!enrolling)}
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="row">
        {filteredCourses.map(course => (
          <div key={course._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {course.name}
                  {currentUser.role === "STUDENT" && (enrolling || course.enrolled) && (
                    <button
                      className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                      onClick={() => updateEnrollment(course._id, !course.enrolled)}
                    >
                      {course.enrolled ? "Unenroll" : "Enroll"}
                    </button>
                  )}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{course.number}</h6>
                <p className="card-text">{course.description}</p>
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="btn btn-primary w-100"
                  style={{ textDecoration: 'none' }}
                  onClick={(e) => {
                    if (!canViewCourse(course)) {
                      e.preventDefault();
                      setError("You must be enrolled to view this course");
                    }
                  }}
                >
                  View Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
