import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./KanbasNavigation.css";
import {
  AiOutlineDashboard
} from "react-icons/ai";
import {
  IoCalendarOutline
} from "react-icons/io5";
import {
  LiaBookSolid,
  LiaCogSolid
} from "react-icons/lia";
import {
  FaInbox,
  FaRegCircleUser
} from "react-icons/fa6";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Account", path: "/Kanbas/Account", icon: FaRegCircleUser },
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kanbas/Courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kanbas/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kanbas/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <div id="wd-kanbas-navigation"
         className="position-fixed bottom-0 top-0 d-none d-md-flex flex-column bg-black z-2">
      <Link to="/Kanbas/Dashboard" className="nav-logo-link">
        <img src="/images/N.png" alt="Northeastern Logo" className="nav-logo" />
      </Link>
      
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`nav-link bg-black text-center ${pathname.includes(link.path) ? "active" : ""}`}>
          {React.createElement(link.icon, { 
            className: `nav-icon ${pathname.includes(link.path) ? "active" : ""}`
          })}
          <span className="nav-label d-none d-xl-block">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}