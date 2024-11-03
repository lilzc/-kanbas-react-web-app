import React from "react";
import { useSelector } from "react-redux";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { VscMultipleWindows } from "react-icons/vsc";
import { IoStatsChartOutline } from "react-icons/io5";

export default function CourseStatus() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  if (!isFaculty) {
    return null;
  }

  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </button>
        </div>
      </div>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsPencilSquare className="me-2 fs-5" /> Choose Home Page
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <AiOutlineEye className="me-2 fs-5" /> View Course Stream
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FiSettings className="me-2 fs-5" /> Course Settings
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <VscMultipleWindows className="me-2 fs-5" /> Course Setup Checklist
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoStatsChartOutline className="me-2 fs-5" /> View Course Analytics
      </button>
    </div>
  );
}