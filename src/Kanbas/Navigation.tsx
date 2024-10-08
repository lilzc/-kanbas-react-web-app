import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./KanbasNavigation.css";
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaCog } from "react-icons/fa";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Account", icon: <FaUser />, path: "/Kanbas/Account" },
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/Kanbas/Dashboard" },
    { label: "Courses", icon: <FaBook />, path: "/Kanbas/Courses" },
    { label: "Calendar", icon: <FaCalendarAlt />, path: "/Kanbas/Calendar" },
    { label: "Inbox", icon: <FaInbox />, path: "/Kanbas/Inbox" },
    { label: "Labs", icon: <FaCog />, path: "/Kanbas/Labs" }
  ];
  
  return (
    <nav className="wd-kanbas-navigation">
      <div className="northeastern-logo">N</div>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className={`nav-item ${pathname.includes(link.path) ? "active" : ""}`}
        >
          <div className="icon-container">{link.icon}</div>
          <span className="nav-label">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}