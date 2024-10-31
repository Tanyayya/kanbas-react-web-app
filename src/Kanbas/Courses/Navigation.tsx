import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles.css";

export default function CoursesNavigation() {

  const { pathname } = useLocation(); // Get the current pathname

  // Links array for course navigation
  const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Piazza" },
    { label: "Zoom", path: "Zoom" },
    { label: "Assignments", path: "Assignments" },
  
    { label: "Quizzes", path: "Quizzes" },
    { label: "Grades", path: "Grades" },
    { label: "People", path: "People" },
  ];

  

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={`/Kanbas/Courses/${pathname.split("/")[3]}/${link.path}`} // Construct path dynamically using courseId and link path
          id={`wd-course-${link.path.toLowerCase()}-link`}
          className={({ isActive }) =>
            `list-group-item list-group-item-border text-danger border border-0 ${
              isActive ? "active" : ""
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
