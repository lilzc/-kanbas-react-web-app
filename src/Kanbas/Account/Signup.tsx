import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as db from "../Database";
import './Account.css';

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: '',
    password: '',
    verifyPassword: '',
    firstName: '',
    lastName: '',
    role: 'STUDENT',
    email: '',
    dob: ''
  });
  const navigate = useNavigate();

  const signup = () => {
    if (user.password !== user.verifyPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (db.users.find(u => u.username === user.username)) {
      setError("Username already taken");
      return;
    }

    const newUser = {
      _id: new Date().getTime().toString(),
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      dob: user.dob,
      handle: `@${user.username}`,
      type: "STUDENT",
      createdOn: new Date().toISOString(),
      loginId: user.username,
      section: "123",
      lastActivity: new Date().toISOString(),
      totalActivity: "0" // Changed to string
    };
    
    db.users.push(newUser);
    navigate("/Kanbas/Account/Signin");
  };

  // Rest of your component remains the same
  return (
    <div id="wd-signup-screen" className="container mt-5">
      <h3 className="mb-4">Signup</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input 
          placeholder="First Name" 
          className="form-control"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input 
          placeholder="Last Name" 
          className="form-control"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input 
          placeholder="Email" 
          type="email" 
          className="form-control"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input 
          placeholder="Username" 
          className="form-control"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input 
          placeholder="Password" 
          type="password" 
          className="form-control"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input 
          placeholder="Verify Password" 
          type="password" 
          className="form-control"
          value={user.verifyPassword}
          onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input 
          placeholder="Date of Birth" 
          type="date" 
          className="form-control"
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <select 
          className="form-control"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </select>
      </div>
      <button onClick={signup} className="btn btn-primary w-100 mb-3">
        Signup
      </button>
      <Link to="/Kanbas/Account/Signin" className="d-block text-center">
        Signin
      </Link>
    </div>
  );
}