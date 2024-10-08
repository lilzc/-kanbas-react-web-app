import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaSearch, FaEllipsisV, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import './Assignments.css';


const assignments = [
  { _id: "A101", title: "A1 - ENV + HTML", description: "Environment Setup...", dueDate: "2023-09-18", availableFromDate: "2023-09-11", availableUntilDate: "2023-09-18" },
  { _id: "A102", title: "A2 - CSS + Bootstrap", description: "CSS Styling...", dueDate: "2023-09-25", availableFromDate: "2023-09-18", availableUntilDate: "2023-09-25" },
  { _id: "A103", title: "A3 - JavaScript", description: "JavaScript Basics...", dueDate: "2023-10-02", availableFromDate: "2023-09-25", availableUntilDate: "2023-10-02" },
];

function Assignments() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Assignments for CS5610 SU1 24 MON/FRI</h2>
      <div className="row mb-3 align-items-center">
        <div className="col-md-6 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search for Assignment"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="position-absolute top-50 translate-middle-y" style={{right: "10px"}} />
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <button className="btn btn-secondary me-2">
            <FaPlusCircle className="me-1" /> Group
          </button>
          <button className="btn btn-danger">
            <FaPlusCircle className="me-1" /> Assignment
          </button>
        </div>
      </div>
      <ul className="list-group">
        {filteredAssignments.map((assignment) => (
          <li key={assignment._id} className="list-group-item border-0 border-start border-success border-5 ps-3 mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FaEllipsisV className="me-2 text-secondary" />
                <FaCheckCircle className="text-success me-2" />
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="text-dark text-decoration-none fw-bold">
                  {assignment.title}
                </Link>
                <p className="mb-0 text-muted">
                  <small>Multiple Modules | Due {assignment.dueDate} at 11:59pm | 100 pts</small>
                </p>
              </div>
              <FaEllipsisV className="text-secondary" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assignments;