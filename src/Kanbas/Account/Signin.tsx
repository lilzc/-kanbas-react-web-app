import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";
import './Account.css';

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTestAccounts = () => {
    const testFaculty = {
      _id: "123", 
      username: "faculty",
      password: "faculty123",
      role: "FACULTY",
      firstName: "Faculty",
      lastName: "User",
      email: "faculty@university.edu",
      dob: "1980-01-01",
      handle: "@faculty",
      type: "FACULTY",
      createdOn: new Date().toISOString(),
      loginId: "faculty",
      section: "123",
      lastActivity: new Date().toISOString(),
      totalActivity: "0"
    };

    const testStudent = {
      _id: "234", // Using existing ID from enrollments
      username: "student",
      password: "student123",
      role: "STUDENT",
      firstName: "Student",
      lastName: "User",
      email: "student@university.edu",
      dob: "2000-01-01",
      handle: "@student",
      type: "STUDENT",
      createdOn: new Date().toISOString(),
      loginId: "student",
      section: "123",
      lastActivity: new Date().toISOString(),
      totalActivity: "0"
    };

    // Add test accounts if they don't exist
    if (!db.users.find(u => u.username === "faculty")) {
      db.users.push(testFaculty);
    }
    if (!db.users.find(u => u.username === "student")) {
      db.users.push(testStudent);
    }
  };

  React.useEffect(() => {
    createTestAccounts();
  }, []);

  const signin = () => {
    const user = db.users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );
    
    if (!user) {
      setError("Invalid credentials");
      return;
    }

    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div className="wd-signin">
      <h2>Signin</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        className="form-control mb-2"
        placeholder="username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        id="wd-username"
      />
      <input
        className="form-control mb-2"
        type="password"
        placeholder="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        id="wd-password"
      />
      <button onClick={signin} className="btn btn-primary w-100 mb-2" id="wd-signin-btn">
        Signin
      </button>
      <div className="text-center mb-2">
        <small>
          Test Accounts:<br/>
          Faculty: username="faculty" password="faculty123" (ID: 123)<br/>
          Student: username="student" password="student123" (ID: 234)
        </small>
      </div>
      <Link to="/Kanbas/Account/Signup" className="wd-signup-link">Signup</Link>
    </div>
  );
}