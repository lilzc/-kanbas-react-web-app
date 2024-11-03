import React from "react";
import Modules from "../Modules";
import CourseStatus from "./Status";
import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-grow-1">
        <Modules />
      </div>
      {isFaculty && (
        <div className="d-none d-md-block">
          <CourseStatus />
        </div>
      )}
    </div>
  );
}

export default Home;