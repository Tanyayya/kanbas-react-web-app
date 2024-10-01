import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router";
import Modules from "./Modules";
import Assignments from "./Assignments";
import Home from "./Home";
import { FaAlignJustify } from "react-icons/fa";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { PiLessThanLight } from "react-icons/pi";
export default function Courses() {
  return (
    <div id="wd-courses">
      <h3 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course 1234{" "}
        <span className="text-secondary">
          <PiLessThanLight></PiLessThanLight>
        </span>{" "}
        Assignments{" "}
        <span className="text-secondary">
          <PiLessThanLight></PiLessThanLight>
        </span>{" "}
        <span className="text-dark">A1 </span>
      </h3>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
