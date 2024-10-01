import { NavLink } from "react-router-dom";
import "./styles.css";

export default function CoursesNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <NavLink
        to="/Kanbas/Courses/1234/Home"
        id="wd-course-home-link"
        className={({ isActive }) =>
          `list-group-item list-group-item-border text-danger border border-0 ${
            isActive ? "active" : ""
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/Kanbas/Courses/1234/Modules"
        id="wd-course-modules-link"
        className={({ isActive }) =>
          `list-group-item list-group-item-border text-danger border border-0 ${
            isActive ? "active" : ""
          }`
        }
      >
        Modules
      </NavLink>
      <NavLink
        to="/Kanbas/Courses/1234/Piazza"
        id="wd-course-piazza-link"
        className={({ isActive }) =>
          `list-group-item list-group-item-border text-danger border border-0 ${
            isActive ? "active" : ""
          }`
        }
      >
        Piazza
      </NavLink>
      <NavLink
        to="/Kanbas/Courses/1234/Zoom"
        id="wd-course-zoom-link"
        className={({ isActive }) =>
          `list-group-item list-group-item-border text-danger border border-0 ${
            isActive ? "active" : ""
          }`
        }
      >
        Zoom
      </NavLink>
      <NavLink
        to="/Kanbas/Courses/1234/Assignments"
        id="wd-course-assignments-link"
        className={({ isActive }) =>
          `list-group-item list-group-item-border text-danger border border-0 ${
            isActive ? "active" : ""
          }`
        }
      >
        Assignments
      </NavLink>
      <NavLink
        to="/Kanbas/Courses/1234/Quizzes"
        id="wd-course-quizzes-link"
        className={({ isActive }) =>
          `list-group-item list-group-item-border text-danger border border-0 ${
            isActive ? "active" : ""
          }`
        }
      >
        Quizzes
      </NavLink>
      <NavLink
        to="/Kanbas/Courses/1234/People"
        id="wd-course-people-link"
        className={({ isActive }) =>
          `list-group-item list-group-item-border text-danger border border-0 ${
            isActive ? "active" : ""
          }`
        }
      >
        People
      </NavLink>
    </div>
  );
}
