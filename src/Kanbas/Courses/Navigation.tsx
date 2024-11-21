import { Link, useLocation, useParams } from "react-router-dom";
import "./CN.css"; 

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const { courseId } = useParams(); 

  const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Piazza" },
    { label: "Zoom", path: "Zoom" },
    { label: "Assignments", path: "Assignments" },
    { label: "Quizzes", path: "Quizzes" },
    { label: "People", path: "People" },
    { label: "Grades", path: "Grades" } 
  ];

  return (
    <div className="wd-course-navigation">
      {links.map((link) => (
        <Link
          key={link.path}
          to={`/Kanbas/Courses/${courseId}/${link.path}`} 
          className={`wd-course-nav-item ${pathname.includes(link.path) ? "active" : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
