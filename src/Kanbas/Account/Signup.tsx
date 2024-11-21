import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import { User, UserRole } from "./types";

export default function Signup() {
    const [user, setUser] = useState<User>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "STUDENT" as UserRole
    });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        try {
            const newUser = await client.signup(user);
            dispatch(setCurrentUser(newUser));
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response?.data?.message || "Error during signup");
        }
    };

    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="form-control mb-2"
                placeholder="username"
            />
            <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="form-control mb-2"
                type="password"
                placeholder="password"
            />
            <input
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                className="form-control mb-2"
                placeholder="First Name"
            />
            <input
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="form-control mb-2"
                placeholder="Last Name"
            />
            <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="form-control mb-2"
                type="email"
                placeholder="Email"
            />
            <button onClick={signup} className="btn btn-primary w-100 mb-2">
                Sign up
            </button>
            <Link to="/Kanbas/Account/Signin" className="wd-signin-link">
                Sign in
            </Link>
        </div>
    );
}