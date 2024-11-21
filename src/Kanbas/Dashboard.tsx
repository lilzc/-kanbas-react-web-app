import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Course, DashboardProps, Enrollment } from "./interfaces";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Enrollments/client";
import './Dashboard.css';

const INITIAL_COURSE_STATE: Course = {
  _id: "",
  name: "",
  number: "",
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split('T')[0],
  description: ""
};

export default function Dashboard({
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}: DashboardProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [facultyCourses, setFacultyCourses] = useState<string[]>([]);
  const [allDatabaseCourses, setAllDatabaseCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";

  const isOwnCourse = (courseId: string): boolean => {
    return facultyCourses.includes(courseId);
  };

  const fetchData = useCallback(async () => {
    if (!currentUser?._id) {
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const allCourses = await courseClient.fetchAllCourses();

      if (currentUser._id) {
        const enrollments: Enrollment[] = await enrollmentClient.findEnrollmentsByUser(currentUser._id);

        if (isFaculty) {
          const facultyEnrollments = enrollments.map((enrollment: Enrollment) => enrollment.course);
          setFacultyCourses(facultyEnrollments);
          const facultyCoursesList = allCourses.filter((course: Course) =>
            facultyEnrollments.includes(course._id)
          );
          setAllDatabaseCourses(facultyCoursesList);
        } else {
          setEnrolledCourses(enrollments.map((enrollment: Enrollment) => enrollment.course));
          setAllDatabaseCourses(allCourses);
        }
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to load courses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?._id, isFaculty]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetCourseForm = () => {
    setCourse(INITIAL_COURSE_STATE);
  };

  const handleAddCourse = async () => {
    if (!currentUser?._id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Validate required fields
      if (!course.name || !course.number) {
        throw new Error("Course name and number are required.");
      }

      // Directly call addNewCourse without creating newCourse object
      await addNewCourse();

      
      // Create faculty enrollment for the new course
      const createdCourse = await courseClient.fetchAllCourses();
      const latestCourse = createdCourse[createdCourse.length - 1];
      
      if (latestCourse) {
        await enrollmentClient.enrollInCourse(currentUser._id, latestCourse._id);
        setFacultyCourses(prev => [...prev, latestCourse._id]);
      }

      await fetchData();
      resetCourseForm();
      
    } catch (error: any) {
      setError(error.message || "Failed to add course. Please try again.");
    } finally {fetchData
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser?._id]);

  const handleUpdateCourse = async () => {
    if (!currentUser?._id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (!course._id || !isOwnCourse(course._id)) {
        throw new Error("You can only edit courses you're enrolled in as faculty.");
      }

      // Validate required fields
      if (!course.name || !course.number) {
        throw new Error("Course name and number are required.");
      }

      await updateCourse();
      await fetchData();
      resetCourseForm();

    } catch (error: any) {
      setError(error.message || "Failed to update course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!currentUser?._id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (!isOwnCourse(courseId)) {
        throw new Error("You can only delete courses you're enrolled in as faculty.");
      }

      await deleteCourse(courseId);
      await enrollmentClient.unenrollFromCourse(currentUser._id, courseId);
      setFacultyCourses(prev => prev.filter(id => id !== courseId));
      await fetchData();

    } catch (error: any) {
      setError(error.message || "Failed to delete course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser?._id) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      await enrollmentClient.enrollInCourse(currentUser._id, courseId);
      setEnrolledCourses(prev => [...prev, courseId]);
    } catch (error: any) {
      setError(error.message || "Failed to enroll in course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser?._id) return;

    try {
      setIsSubmitting(true);
      setError(null);
      await enrollmentClient.unenrollFromCourse(currentUser._id, courseId);
      setEnrolledCourses(prev => prev.filter(id => id !== courseId));
    } catch (error: any) {
      setError(error.message || "Failed to unenroll from course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCourses = isFaculty 
    ? allDatabaseCourses 
    : showAllCourses 
      ? allDatabaseCourses 
      : allDatabaseCourses.filter((course: Course) => enrolledCourses.includes(course._id));

  const searchFilteredCourses = filteredCourses.filter((course: Course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return <div className="p-4">Please log in to view the dashboard.</div>;
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <div className="d-flex gap-2">
          {isStudent && (
            <button 
              className="btn btn-primary"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              {showAllCourses ? "My Courses" : "All Courses"}
            </button>
          )}
          <input
            type="search"
            className="form-control"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {isFaculty && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{course._id ? "Edit Course" : "Create New Course"}</h5>
            <input 
              value={course.name}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              placeholder="Course Name"
              id="wd-course-name"
              required
            />
            <input 
              value={course.number}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, number: e.target.value })}
              placeholder="Course Number"
              id="wd-course-number"
              required
            />
            <input 
              value={course.startDate}
              className="form-control mb-2"
              type="date"
              onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
              id="wd-course-start-date"
            />
            <input 
              value={course.endDate}
              className="form-control mb-2"
              type="date"
              onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
              id="wd-course-end-date"
            />
            <textarea 
              value={course.description}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              placeholder="Course Description"
              id="wd-course-description"
            />
            <div className="text-end">
              {course._id ? (
                <>
                  <button 
                    className="btn btn-secondary me-2"
                    onClick={resetCourseForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-warning"
                    onClick={handleUpdateCourse}
                    disabled={isSubmitting || !isOwnCourse(course._id)}
                    id="wd-update-course"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </button>
                </>
              ) : (
                <button 
                  className="btn btn-success"
                  onClick={handleAddCourse}
                  disabled={isSubmitting}
                  id="wd-create-course"
                >
                  {isSubmitting ? "Creating..." : "Create Course"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <h2 className="mb-4">
        {isFaculty ? "My Courses" : "Published Courses"} ({searchFilteredCourses.length})
      </h2>

      {searchFilteredCourses.length === 0 ? (
        <div className="alert alert-info">
          No courses found. {searchTerm && "Try adjusting your search."}
        </div>
      ) : (
        <div className="row g-4">
          {searchFilteredCourses.map((c) => (
            <div key={c._id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="card h-100">
                {isStudent && (
                  <div className="card-header border-0 bg-transparent p-0">
                    <button
                      className={`btn w-100 ${
                        enrolledCourses.includes(c._id)
                          ? "btn-danger"
                          : "btn-success"
                      } rounded-0`}
                      onClick={() =>
                        enrolledCourses.includes(c._id)
                          ? handleUnenroll(c._id)
                          : handleEnroll(c._id)
                      }
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? "Processing..." 
                        : enrolledCourses.includes(c._id) 
                          ? "Unenroll" 
                          : "Enroll"
                      }
                    </button>
                  </div>
                )}

                <img
                  src={`/images/${c.image || 'default-course.jpg'}`}
                  alt={c.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/default-course.jpg';
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text text-muted small mb-2">{c.number}</p>
                  <p className="card-text">{c.description}</p>
                  <div className="mt-auto">
                    <Link 
                      to={`/Kanbas/Courses/${c._id}/Home`}
                      className="btn btn-primary w-100"
                    >
                      View Course
                    </Link>
                  </div>
                </div>

                {isFaculty && isOwnCourse(c._id) && (
                  <div className="card-footer bg-transparent">
                    <button
                      className="btn btn-warning w-100 mb-2"
                      onClick={() => setCourse(c)}
                      disabled={isSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDeleteCourse(c._id)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}