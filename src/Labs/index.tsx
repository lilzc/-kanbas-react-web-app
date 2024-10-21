import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";

const labsStyle = {
  color: 'black',
  backgroundColor: 'white',
};

export default function Labs() {
  return (
    <div className="p-3" style={labsStyle}>
      <h1>Labs</h1>
      <p>Name: Zhicheng Liu</p>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
      </Routes>
    </div>
  );
}