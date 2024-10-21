import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { assignments } from '../../Database';
import './AssignmentEditor.css'; 

interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  assignTo: string;
}

export default function AssignmentEditor() {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Assignment>({
    _id: '',
    title: '',
    description: '',
    points: 0,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
    assignTo: ''
  });

  useEffect(() => {
    const assignmentToEdit = assignments.find(a => a._id === assignmentId && a.course === courseId);
    if (assignmentToEdit) {
      setAssignment(assignmentToEdit as Assignment);
    }
  }, [assignmentId, courseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving assignment:", assignment);
    // Here you would typically update the assignment in your database
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <div className="assignment-editor">
      <h2>Assignment Editor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Assignment Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={assignment.title}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>The assignment is available online</p>
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignTo">Assign</label>
          <input
            type="text"
            id="assignTo"
            name="assignTo"
            value={assignment.assignTo}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due</label>
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

        <div className="form-group text-right">
          <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments`)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}