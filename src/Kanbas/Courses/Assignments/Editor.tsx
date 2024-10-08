import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './Assignments.css';

export default function AssignmentEditor() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState({
    name: "A1",
    description: "The assignment is available online\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kanbas application\n• Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.",
    points: 100,
    assignmentGroup: "ASSIGNMENTS",
    displayGrade: "Percentage",
    submissionType: "Online",
    onlineEntryOptions: {
      textEntry: false,
      websiteUrl: true,
      mediaRecordings: false,
      studentAnnotation: false,
      fileUploads: false
    },
    assignTo: "Everyone",
    dueDate: "2024-05-13T23:59",
    availableFrom: "2024-05-06T00:00",
    availableUntil: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignment(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAssignment(prev => ({
      ...prev,
      onlineEntryOptions: { ...prev.onlineEntryOptions, [name]: checked }
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Assignment saved:", assignment);
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <div className="container mt-4">
      <h2>Assignment Name</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text"
            className="form-control"
            name="name"
            value={assignment.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <textarea 
            className="form-control"
            name="description"
            rows={5}
            value={assignment.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Points</label>
          <div className="col-sm-9">
            <input 
              type="number"
              className="form-control"
              name="points"
              value={assignment.points}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Assignment Group</label>
          <div className="col-sm-9">
            <select 
              className="form-control"
              name="assignmentGroup"
              value={assignment.assignmentGroup}
              onChange={handleInputChange}
            >
              <option>ASSIGNMENTS</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Display Grade as</label>
          <div className="col-sm-9">
            <select 
              className="form-control"
              name="displayGrade"
              value={assignment.displayGrade}
              onChange={handleInputChange}
            >
              <option>Percentage</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Submission Type</label>
          <div className="col-sm-9">
            <select 
              className="form-control"
              name="submissionType"
              value={assignment.submissionType}
              onChange={handleInputChange}
            >
              <option>Online</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Online Entry Options</label>
          <div className="col-sm-9">
            {Object.entries(assignment.onlineEntryOptions).map(([key, value]) => (
              <div className="form-check" key={key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={value}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={key}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Assign</label>
          <div className="col-sm-9">
            <input 
              type="text"
              className="form-control"
              name="assignTo"
              value={assignment.assignTo}
              onChange={handleInputChange}
              readOnly
            />
            <div className="mt-2">
              <label>Due</label>
              <input 
                type="datetime-local"
                className="form-control"
                name="dueDate"
                value={assignment.dueDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label>Available from</label>
                <input 
                  type="datetime-local"
                  className="form-control"
                  name="availableFrom"
                  value={assignment.availableFrom}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-6">
                <label>Until</label>
                <input 
                  type="datetime-local"
                  className="form-control"
                  name="availableUntil"
                  value={assignment.availableUntil}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="float-end">
          <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Assignments`)}>Cancel</button>
          <button type="submit" className="btn btn-danger">Save</button>
        </div>
      </form>
    </div>
  );
}