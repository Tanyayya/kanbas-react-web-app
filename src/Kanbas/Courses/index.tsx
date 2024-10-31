import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Modules from "./Modules";
import Assignments from "./Assignments";
import Home from "./Home";
import { FaAlignJustify } from "react-icons/fa";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { PiGreaterThanLight } from "react-icons/pi";
import { useParams } from "react-router";


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams(); // Retrieve course id from URL
  const course = courses.find((course) => course._id === cid); // Find the selected course
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h3 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[3]}

        <span className="text-secondary">
          <PiGreaterThanLight className=" mb-1 " />
        </span>{" "}
        Assignments{" "}
        <span className="text-secondary">
          <PiGreaterThanLight className=" mb-1 "  />
        </span>{" "}
        <span className="text-dark">A1</span>
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
            <Route path="Assignments/new" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
