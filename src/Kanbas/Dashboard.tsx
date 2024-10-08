import React from "react";
import { Link } from "react-router-dom";

const courses = [
  { number: "CS4550", name: "Web Development", term: "Fall 2023" },
  { number: "CS4560", name: "Mobile App Dev", term: "Fall 2023" },
  { number: "CS5610", name: "Advanced Web Dev", term: "Fall 2023" },
  { number: "CS5200", name: "Database Systems", term: "Fall 2023" },
  { number: "CS4400", name: "Computer Systems", term: "Fall 2023" },
  { number: "CS4500", name: "Software Engineering", term: "Fall 2023" },
  { number: "CS4300", name: "Artificial Intelligence", term: "Fall 2023" },
];

const bgColors = [
  "bg-primary", "bg-info", "bg-secondary",
  "bg-success", "bg-warning", "bg-danger", "bg-primary"
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {courses.map((course, index) => (
          <div key={index} className="col">
            <div className="card" style={{ width: "270px" }}>
              <div className={`card-body ${bgColors[index]} text-white`} style={{ height: "150px" }}>
                <h5 className="card-title">{course.number}</h5>
                <p className="card-text">{course.name}</p>
              </div>
              <div className="card-body">
                <p className="card-text">{course.term}</p>
                <Link to={`/Kanbas/Courses/${course.number}/Home`} className="btn btn-light">
                  Go to Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}