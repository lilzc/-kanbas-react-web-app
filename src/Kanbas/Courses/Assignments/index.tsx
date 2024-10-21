import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { assignments, courses } from '../../Database';
import './Assignments.css';

export default function Assignments() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCourse, setCurrentCourse] = useState<any>(null);

  useEffect(() => {
    const course = courses.find(c => c._id === courseId);
    setCurrentCourse(course);
  }, [courseId]);

  const filteredAssignments = assignments
    .filter(a => a.course === courseId)
    .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!currentCourse) return <div>Loading...</div>;

  return (
    
    <div className="assignments-container">
      <div className="assignments-header">
        <h2>Assignments for {currentCourse.name}</h2>
        <div className="assignments-actions">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn btn-secondary">+ Group</button>
          <button className="btn btn-danger">+ Assignment</button>
        </div>
      </div>

      <div className="assignments-list">
        <div className="assignments-list-header">
          <span className="assignment-icon">📄</span>
          <span className="assignment-title">ASSIGNMENTS</span>
          <span className="assignment-percentage">40% of Total</span>
          <span className="assignment-actions">...</span>
        </div>

        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div key={assignment._id} className="assignment-item">
              <span className="assignment-icon">📄</span>
              <div className="assignment-details">
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="assignment-title">
                  {assignment.title}
                </Link>
                <div className="assignment-info">
                  <span>Multiple Modules</span>
                  <span>|</span>
                  <span>Not available until {assignment.availableFrom}</span>
                  <span>|</span>
                  <span>Due {assignment.dueDate}</span>
                  <span>|</span>
                  <span>{assignment.points} pts</span>
                </div>
              </div>
              <span className="assignment-published">✓</span>
              <span className="assignment-actions">...</span>
            </div>
          ))
        ) : (
          <p>No assignments available for this course.</p>
        )}
      </div>
    </div>
  );
}