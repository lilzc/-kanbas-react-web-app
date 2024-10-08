import React from 'react';
import { Link } from "react-router-dom";
import './Account.css';

export default function Signin() {
  return (
    <div className="wd-signin">
      <h2>Signin</h2>
      <input className="form-control" placeholder="username" />
      <input className="form-control" type="password" placeholder="password" />
      <button className="btn btn-primary w-100">Signin</button>
      <Link to="/Kanbas/Account/Signup" className="wd-signup-link">Signup</Link>
    </div>
  );
}