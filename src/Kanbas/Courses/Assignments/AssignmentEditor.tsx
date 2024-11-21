import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createAssignment, updateAssignment, fetchAssignmentsForCourse } from './reducer';
import type { RootState } from '../../store';
import type { Assignment } from './reducer';

interface User {
  role: 'FACULTY' | 'STUDENT' | 'ADMIN' | 'TA';
  [key: string]: any;  
}

export default function AssignmentEditor() {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useSelector((state: RootState) => 
    state.accountReducer.currentUser
  ) as User | null;

  const { assignments, loading } = useSelector((state: RootState) => 
    state.assignmentsReducer
  );

  const isNew = assignmentId === 'new';

  const [assignment, setAssignment] = useState<Assignment>({
    _id: '',
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
    course: courseId || ''
  });

  useEffect(() => {
    // Type guard for currentUser
    if (!currentUser || currentUser.role !== "FACULTY") {
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
      return;
    }
    
    // Fetch assignments if not already loaded
    if (courseId && assignments.length === 0) {
      dispatch(fetchAssignmentsForCourse(courseId) as any);
    }
    
    if (!isNew && assignmentId && assignments.length > 0) {
      const existingAssignment = assignments.find(
        (a) => a._id === assignmentId && a.course === courseId
      );
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [assignmentId, courseId, assignments, isNew, currentUser, navigate, dispatch]);

  if (!currentUser || currentUser.role !== "FACULTY") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (isNew) {
        await dispatch(
          createAssignment({ 
            courseId: courseId as string, 
            assignment: {
              ...assignment,
              _id: new Date().getTime().toString()
            }
          }) as any
        );
      } else {
        await dispatch(updateAssignment(assignment) as any);
      }
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAssignment(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2>{isNew ? 'Create Assignment' : 'Edit Assignment'}</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="title">Assignment Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={assignment.title}
            onChange={handleInputChange}
            className="form-control"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={assignment.description}
            onChange={handleInputChange}
            className="form-control"
            rows={6}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="points">Points</label>
          <input
            type="number"
            id="points"
            name="points"
            value={assignment.points}
            onChange={handleInputChange}
            className="form-control"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={assignment.dueDate}
            onChange={handleInputChange}
            className="form-control"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableFrom">Available from</label>
          <input
            type="datetime-local"
            id="availableFrom"
            name="availableFrom"
            value={assignment.availableFrom}
            onChange={handleInputChange}
            className="form-control"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableUntil">Until</label>
          <input
            type="datetime-local"
            id="availableUntil"
            name="availableUntil"
            value={assignment.availableUntil}
            onChange={handleInputChange}
            className="form-control"
            disabled={isSubmitting}
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments`)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-danger"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}