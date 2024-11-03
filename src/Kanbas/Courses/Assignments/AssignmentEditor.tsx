import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from './reducer';
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
  

  const currentUser = useSelector((state: RootState) => 
    state.accountReducer.currentUser
  ) as User | null;

  const assignments = useSelector((state: RootState) => 
    state.assignmentsReducer?.assignments || []
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
    
    if (!isNew && assignmentId && assignments.length > 0) {
      const existingAssignment = assignments.find(
        (a) => a._id === assignmentId && a.course === courseId
      );
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [assignmentId, courseId, assignments, isNew, currentUser, navigate]);


  if (!currentUser || currentUser.role !== "FACULTY") {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      dispatch(addAssignment({
        ...assignment,
        _id: new Date().getTime().toString()
      }));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAssignment(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <h2>{isNew ? 'Create Assignment' : 'Edit Assignment'}</h2>
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
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            {isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}