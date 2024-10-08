import React from 'react';
import { Link } from "react-router-dom";
import './Account.css';

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5">
      <h3 className="mb-4">Profile</h3>
      <div className="mb-3">
        <input defaultValue="alice" placeholder="username" className="form-control" />
      </div>
      <div className="mb-3">
        <input defaultValue="123" placeholder="password" type="password" className="form-control" />
      </div>
      <div className="mb-3">
        <input defaultValue="Alice" placeholder="First Name" className="form-control" />
      </div>
      <div className="mb-3">
        <input defaultValue="Wonderland" placeholder="Last Name" className="form-control" />
      </div>
      <div className="mb-3">
        <input defaultValue="2000-01-01" type="date" className="form-control" />
      </div>
      <div className="mb-3">
        <input defaultValue="alice@wonderland.com" type="email" className="form-control" />
      </div>
      <div className="mb-3">
        <select defaultValue="FACULTY" className="form-select">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>
      <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100">
        Signout
      </Link>
    </div>
  );
}