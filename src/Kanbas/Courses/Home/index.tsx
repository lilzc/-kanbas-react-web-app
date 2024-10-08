import React from "react";
import Modules from "../Modules";
import CourseStatus from "./Status";

function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-grow-1">
        <Modules />
      </div>
      <div className="d-none d-md-block">
        <CourseStatus />
      </div>
    </div>
  );
}

export default Home;