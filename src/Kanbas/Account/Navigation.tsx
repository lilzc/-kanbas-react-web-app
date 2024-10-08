import React from 'react';
import { Link } from "react-router-dom";
import { FaCalendar, FaEnvelopeOpenText, FaFlask } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import "./KN.css";

export default function KanbasNavigation() {
  return (
    <div id="wd-kanbas-navigation">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank" rel="noopener noreferrer" className="wd-nav-item">
        N
      </a>
      <Link to="/Kanbas/Account" id="wd-account-link" className="wd-nav-item">
        <VscAccount className="wd-nav-icon" />
        <span>Account</span>
      </Link>
      <Link to="/Kanbas/Dashboard" id="wd-dashboard-link" className="wd-nav-item">
        <AiOutlineDashboard className="wd-nav-icon" />
        <span>Dashboard</span>
      </Link>
      <Link to="/Kanbas/Courses" id="wd-course-link" className="wd-nav-item">
        <FaBookBible className="wd-nav-icon" />
        <span>Courses</span>
      </Link>
      <Link to="/Kanbas/Calendar" id="wd-calendar-link" className="wd-nav-item">
        <FaCalendar className="wd-nav-icon" />
        <span>Calendar</span>
      </Link>
      <Link to="/Kanbas/Inbox" id="wd-inbox-link" className="wd-nav-item">
        <FaEnvelopeOpenText className="wd-nav-icon" />
        <span>Inbox</span>
      </Link>
      <Link to="/Kanbas/Labs" id="wd-labs-link" className="wd-nav-item">
        <FaFlask className="wd-nav-icon" />
        <span>Labs</span>
      </Link>
    </div>
  );
}