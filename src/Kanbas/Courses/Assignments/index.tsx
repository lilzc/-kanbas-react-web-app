import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssignment, fetchAssignmentsForCourse } from './reducer';
import type { RootState } from '../../store';

interface User {
  _id: string;
  username: string;
  role: "FACULTY" | "STUDENT" | "ADMIN" | "TA";
  email: string;
}

export default function Assignments() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const currentUser = useSelector((state: RootState) => 
    state.accountReducer.currentUser as User | null
  );

  const { assignments, loading, error } = useSelector((state: RootState) => 
    state.assignmentsReducer
  );

  // Fetch assignments when component mounts or courseId changes
  useEffect(() => {
    if (courseId) {
      dispatch(fetchAssignmentsForCourse(courseId) as any);
    }
  }, [courseId, dispatch]);

  const isFaculty = currentUser?.role === "FACULTY";

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/new`);
  };

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await dispatch(deleteAssignment(assignmentToDelete) as any);
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
      } catch (err) {
        console.error("Failed to delete assignment:", err);
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  const filteredAssignments = assignments
    .filter(a => a.course === courseId)
    .filter(a => 
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error loading assignments: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Search for Assignment"
          className="form-control w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isFaculty && (
          <div>
            <button className="btn btn-secondary me-2">+ Group</button>
            <button 
              className="btn btn-danger"
              onClick={handleAddAssignment}
            >
              + Assignment
            </button>
          </div>
        )}
      </div>

      <div className="assignments-list">
        <div className="d-flex justify-content-between align-items-center bg-light p-2 mb-2">
          <h3>ASSIGNMENTS</h3>
          <span>40% of Total</span>
        </div>

        {filteredAssignments.map((assignment) => (
          <div key={assignment._id} className="border rounded p-3 mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1">
                <Link 
                  to={isFaculty 
                    ? `/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`
                    : '#'}
                  className={`text-danger text-decoration-none fs-5 ${!isFaculty ? 'pe-none' : ''}`}
                >
                  {assignment.title}
                </Link>
                <div className="text-secondary small">
                  <span>Due {formatDate(assignment.dueDate)}</span>
                  <span className="mx-2">•</span>
                  <span>{assignment.points} pts</span>
                </div>
              </div>
              {isFaculty && (
                <div className="d-flex align-items-center">
                  <button 
                    onClick={() => handleDeleteClick(assignment._id)}
                    className="btn btn-link text-danger"
                    aria-label={`Delete ${assignment.title}`}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && isFaculty && (
        <>
          <div 
            className="modal show d-block"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}
          >
            <div className="modal-dialog" style={{ zIndex: 1055 }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Assignment</h5>
                  <button 
                    type="button" 
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to remove this assignment?</p>
                  {assignmentToDelete && (
                    <p className="text-muted">
                      {assignments.find(a => a._id === assignmentToDelete)?.title}
                    </p>
                  )}
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div 
            className="modal-backdrop show" 
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1040 
            }}
            onClick={() => setShowDeleteModal(false)}
          ></div>
        </>
      )}
    </div>
  );
}