
import PeopleTable from "./People/Table";
import React from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules/index";
import Home from "./Home/index";
import Assignments from "./Assignments/index";
import Editor from "./Assignments/editor";
import { FaAlignJustify } from "react-icons/fa";


function Courses() {
  const { courseId } = useParams();
  const { pathname } = useLocation();

  React.useEffect(() => {
    console.log("Current path:", pathname);
  }, [pathname]);

  return (
    <div className="d-flex">
      <div className="d-none d-md-block">
        <CourseNavigation />
      </div>
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">
          <FaAlignJustify className="me-2" />
          Course {courseId}
        </h2>
        <hr />
        <div className="d-flex">
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:assignmentId" element={<Editor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Courses;