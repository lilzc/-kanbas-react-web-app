import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Account from "./Account";
import Courses from "./Courses";
import KanbasNavigation from "./Account/Navigation";
import Signin from "./Account/Signin";
import Labs from '../Labs';
import "./Style.css";
import "./KanbasNavigation.css";
import "./Courses/Navigation";



export default function Kanbas() {
  return (
    <div className="d-flex">
      <KanbasNavigation />
      <div style={{ marginLeft: '84px', width: 'calc(100% - 84px)' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Account/Signin" element={<Signin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses/:courseId/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </div>
    </div>
  );
}