import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Modules from "./Modules";
import Assignments from "./Assignments";
import Home from "./Home";
import { FaAlignJustify } from "react-icons/fa";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";

import { useParams } from "react-router";


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams(); // Retrieve course id from URL
  const course = courses.find((course) => course._id === cid); // Find the selected course
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").slice(3).filter(Boolean);
  return (
    <div id="wd-courses">
      <h3 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} 
        {pathSegments.map((param, index) => (
          <span key={index}>
            {` > ${param}`} {/* Display each segment with the greater-than symbol */}
          </span>
        ))}

        
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
