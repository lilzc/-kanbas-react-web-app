import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import './Account.css';

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error during sign-in. Please try again.");
    }
  };

  return (
    <div className="wd-signin">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        className="form-control mb-2"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        id="wd-username"
      />
      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        id="wd-password"
      />
      <button 
        onClick={signin} 
        className="btn btn-primary w-100 mb-2" 
        id="wd-signin-btn">
        Sign In
      </button>
      <div className="text-center mb-2">
        <small>
          Sample Accounts:<br/>
          Student: username="cap_america" password="shield123"<br/>
          Faculty: username="gandalf_grey" password="youshallnotpass"
        </small>
      </div>
      <Link to="/Kanbas/Account/Signup" className="wd-signup-link">
        Sign Up
      </Link>
    </div>
  );
}