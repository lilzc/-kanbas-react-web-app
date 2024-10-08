import React from 'react';
import { Link } from "react-router-dom";
import './Account.css';

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-5">
      <h3 className="mb-4">Signup</h3>
      <div className="mb-3">
        <input placeholder="username" className="form-control" />
      </div>
      <div className="mb-3">
        <input placeholder="password" type="password" className="form-control" />
      </div>
      <div className="mb-3">
        <input placeholder="verify password" type="password" className="form-control" />
      </div>
      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100 mb-3">
        Signup
      </Link>
      <Link to="/Kanbas/Account/Signin" className="d-block text-center">
        Signin
      </Link>
    </div>
  );
}