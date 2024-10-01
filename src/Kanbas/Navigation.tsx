import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }} 
    className="list-group rounded-0 position-fixed
    bottom-0 d-none top-0 d-md-block bg-black z-2">

      <NavLink 
        to="https://www.northeastern.edu/" 
        id="wd-neu-link" 
        className="list-group-items list-group-item border-0 text-center d-flex flex-column justify-content-center align-items-center" 
        target="_blank"
      >
        <img src="/images/logo.svg" width="75px" alt="Northeastern Logo" />
        <span>Northeastern</span>
      </NavLink>

      <NavLink to="/Kanbas/Account" id="wd-account-link" className="list-group-items list-group-item text-center border-0 ">
        <FaRegCircleUser className="fs-1" /><br />
        Account
      </NavLink>

      <NavLink to="/Kanbas/Dashboard" id="wd-dashboard-link" className="list-group-items list-group-item text-center border-0 ">
        <AiOutlineDashboard className="fs-1 list-group-icon" /><br />
        Dashboard
      </NavLink>

      <NavLink to="/Kanbas/Courses" id="wd-course-link" className="list-group-items list-group-item text-center border-0">
        <LiaBookSolid className="fs-1 list-group-icon" /><br />
        Courses
      </NavLink>

      <NavLink to="/Kanbas/Calendar" id="wd-calendar-link" className="list-group-items list-group-item text-center border-0">
        <IoCalendarOutline className="fs-1 list-group-icon" /><br />Calendar
      </NavLink>

      <NavLink to="/Kanbas/Inbox" id="wd-inbox-link" className="list-group-items list-group-item text-center border-0">
        <FaInbox className="fs-1 list-group-icon" /><br />Inbox
      </NavLink>

      <NavLink to="/Labs" id="wd-labs-link" className="list-group-items list-group-item text-center border-0">
        <LiaCogSolid className="fs-1 list-group-icon" /><br />Labs
      </NavLink>
    </div>
  );
}
