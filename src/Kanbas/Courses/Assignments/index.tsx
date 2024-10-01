import { FaSearch, FaPlus } from "react-icons/fa"; // Import React Icons
import AssignmentControls from "./AssignmentControl";
import { BsGripVertical } from "react-icons/bs"; // To match with the Modules layout
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for spacing
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";

export default function Assignments() {
  return (
    <div className="w-75">
      <AssignmentControls />
      <div className="d-flex justify-content-between align-items-center my-3">
        {/* Search Box with Icon */}
        <div className="input-group" style={{ width: "300px" }}>
          <span className="input-group-text" id="basic-addon1">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            type="text"
            className="form-control"
            placeholder="Search for Assignments"
          />
        </div>
      </div>

      <br />
      <br />

      <ul id="wd-assignments" className="list-group rounded-0 ">
        {/* Assignment Group - Week 1 */}
        <li className="wd-assignment-group list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 d-flex justify-content-between align-items-center bg-secondary">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="ms-2">Week 1 Assignments</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted me-4 border rounded-pill border-black p-2">
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ul
            className="wd-assignment-items list-group rounded-0"
            style={{ borderLeft: "4px solid green" }}
          >
            {/* Assignment 1 */}
            <li className="wd-assignment-item list-group-item p-3 d-flex align-items-center">
              <BsGripVertical className="me-3 fs-2" />
              <TfiWrite className="me-3 text-success" />
              <div className="flex-grow-1">
                <span className="fw-bold fs-5 text-dark">
                  <a
                    className="wd-assignment-link text-dark"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    A1
                  </a>
                </span>

                <br />
                <small className="text-muted">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 6 at 12:00 am |
                  <br />
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </small>
              </div>
              <LessonControlButtons />
            </li>

            {/* Assignment 2 */}
            <li className="wd-assignment-item list-group-item p-3 d-flex align-items-center">
              <BsGripVertical className="me-3 fs-2" />
              <TfiWrite className="me-3 text-success" />
              <div className="flex-grow-1">
                <a
                  className="wd-assignment-link text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <span className="fw-bold fs-5">A2</span>
                </a>

                <br />
                <small className="text-muted">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 13 at 12:00 am |
                  <br />
                  <b>Due</b> May 20 at 11:59pm | 100 pts
                </small>
              </div>
              <LessonControlButtons />
            </li>

            {/* Assignment 3 */}
            <li className="wd-assignment-item list-group-item p-3 d-flex align-items-center">
              <BsGripVertical className="me-3 fs-2" />
              <TfiWrite className="me-3 text-success" />
              <div className="flex-grow-1">
                <a
                  className="wd-assignment-link text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <span className="fw-bold fs-5">A3</span>
                </a>

                <br />
                <small className="text-muted">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 20 at 12:00 am |
                  <br />
                  <b>Due</b> May 27 at 11:59pm | 100 pts
                </small>
              </div>
              <LessonControlButtons />
            </li>
          </ul>
        </li>

        {/* Assignment Group - Week 2 */}
        <li className="wd-assignment-group list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 d-flex align-items-center bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <span className="ms-2">Week 2 Assignments</span>
          </div>
          <ul className="wd-assignment-items list-group rounded-0">
            {/* Assignment Placeholder */}
            <li
              className="wd-assignment-item list-group-item p-3 d-flex align-items-center"
              style={{ borderLeft: "4px solid green" }}
            >
              <BsGripVertical className="me-3 fs-2" />
              <TfiWrite className="me-3 text-success" />
              <div className="flex-grow-1">
                <a
                  className="wd-assignment-link text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <span className="fw-bold fs-5">A1</span>
                </a>

                <br />
                <small className="text-muted">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 27 at 12:00 am |
                  <br />
                  <b>Due</b> June 3 at 11:59pm | 100 pts
                </small>
              </div>
              <LessonControlButtons />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
