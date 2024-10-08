import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface User {
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

const users: User[] = [
  { firstName: "Tony", lastName: "Stark", loginId: "001234561S", section: "S101", role: "STUDENT", lastActivity: "2020-10-01T00:00:00.000Z", totalActivity: "10:21:32" },
  { firstName: "Bruce", lastName: "Wayne", loginId: "001234562S", section: "S101", role: "STUDENT", lastActivity: "2020-11-02T00:00:00.000Z", totalActivity: "15:32:43" },
  { firstName: "Steve", lastName: "Rogers", loginId: "001234563S", section: "S101", role: "STUDENT", lastActivity: "2020-10-02T00:00:00.000Z", totalActivity: "23:32:43" },
  { firstName: "Natasha", lastName: "Romanoff", loginId: "001234564S", section: "S101", role: "TA", lastActivity: "2020-11-05T00:00:00.000Z", totalActivity: "13:23:34" },
  { firstName: "Thor", lastName: "Odinson", loginId: "001234565S", section: "S101", role: "STUDENT", lastActivity: "2020-12-01T00:00:00.000Z", totalActivity: "11:22:33" },
  { firstName: "Bruce", lastName: "Banner", loginId: "001234566S", section: "S101", role: "STUDENT", lastActivity: "2020-12-01T00:00:00.000Z", totalActivity: "22:33:44" },
];

export default function PeopleTable() {
  return (
    <div id="wd-people-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{new Date(user.lastActivity).toLocaleDateString()}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}