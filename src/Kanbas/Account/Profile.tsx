import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";


interface DatabaseUser {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT" | "TA";
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

interface AccountState {
  accountReducer: {
    currentUser: DatabaseUser | null;
  }
}

const DATABASE_USERS: DatabaseUser[] = [
  {
    "_id": "123",
    "username": "iron_man",
    "password": "stark123",
    "firstName": "Tony",
    "lastName": "Stark",
    "email": "tony@stark.com",
    "dob": "1970-05-29",
    "role": "FACULTY",
    "loginId": "001234561S",
    "section": "RS101",
    "lastActivity": "2024-01-15",
    "totalActivity": "120:45:30"
  },
  {
    "_id": "234",
    "username": "cap_america",
    "password": "shield123",
    "firstName": "Steve",
    "lastName": "Rogers",
    "email": "steve@avengers.com",
    "dob": "1918-07-04",
    "role": "STUDENT",
    "loginId": "001234562S",
    "section": "RS102",
    "lastActivity": "2024-01-14",
    "totalActivity": "95:30:20"
  }
];

export default function Profile() {
  const { currentUser } = useSelector((state: AccountState) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<DatabaseUser | null>(null);

  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
      return;
    }
    
    // Find user in database by ID
    const databaseUser = DATABASE_USERS.find(user => user._id === currentUser._id);
    if (databaseUser) {
      setProfile(databaseUser);
    }
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  if (!profile) {
    return null;
  }

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      <div>
        <input
          defaultValue={profile.username}
          id="wd-username"
          className="form-control mb-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setProfile(profile ? { ...profile, username: e.target.value } : null)}
        />
        <input
          defaultValue={profile.password}
          id="wd-password"
          className="form-control mb-2"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setProfile(profile ? { ...profile, password: e.target.value } : null)}
        />
        <input
          defaultValue={profile.firstName}
          id="wd-firstname"
          className="form-control mb-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setProfile(profile ? { ...profile, firstName: e.target.value } : null)}
        />
        <input
          defaultValue={profile.lastName}
          id="wd-lastname"
          className="form-control mb-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setProfile(profile ? { ...profile, lastName: e.target.value } : null)}
        />
        <input
          defaultValue={profile.dob}
          id="wd-dob"
          className="form-control mb-2"
          type="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setProfile(profile ? { ...profile, dob: e.target.value } : null)}
        />
        <input
          defaultValue={profile.email}
          id="wd-email"
          className="form-control mb-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setProfile(profile ? { ...profile, email: e.target.value } : null)}
        />
        <select
          value={profile.role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            setProfile(profile ? { ...profile, role: e.target.value as DatabaseUser["role"] } : null)}
          className="form-control mb-2"
          id="wd-role"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="TA">TA</option>
        </select>
        <div className="form-group mb-2">
          <label>Login ID: {profile.loginId}</label>
        </div>
        <div className="form-group mb-2">
          <label>Section: {profile.section}</label>
        </div>
        <div className="form-group mb-2">
          <label>Last Activity: {profile.lastActivity}</label>
        </div>
        <div className="form-group mb-2">
          <label>Total Activity: {profile.totalActivity}</label>
        </div>
        <button
          onClick={signout}
          className="btn btn-danger w-100 mb-2"
          id="wd-signout-btn"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}