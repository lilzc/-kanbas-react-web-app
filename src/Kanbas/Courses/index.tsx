import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Modules from './Modules';
import Assignments from './Assignments/Assignments'; 
import CoursesNavigation from './Navigation';
import AssignmentEditor from './Assignments/Editor'; 
export default function Courses() {
  return (
    <div id="wd-courses">
      <h2>Course 1234</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <CoursesNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />  {/* Add Assignments route */}
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
