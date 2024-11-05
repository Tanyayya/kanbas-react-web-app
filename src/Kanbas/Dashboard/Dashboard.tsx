import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse } from "./reducer"; // Adjust the import path accordingly
import { useState } from "react";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer); // Access enrollments from the store
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT"; // Check if user is a student
  const [showAllCourses, setShowAllCourses] = useState(false); // State to toggle course view

  const toggleCourses = () => setShowAllCourses(!showAllCourses); // Toggle course view

  const handleEnroll = (courseId: string) => {
    dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
  };
  
  
  const displayedCourses = showAllCourses ? courses : courses.filter(course =>
    enrollments.some((enrollment: any) => enrollment.course === course._id && enrollment.user === currentUser._id)
  );

  const filteredCourses = courses.filter(course => enrollments);
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Render New Course Form and buttons only if user is FACULTY */}
      {isFaculty && (
        <>
          <h5 className="m-2">
            New Course{" "}
            <button className="btn btn-primary float-end m-2" onClick={addNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end m-2" onClick={updateCourse}>
              Update
            </button>
          </h5>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      {/* Enrollment Button for Students */}
      {(
        <button className="btn btn-info float-end" onClick={toggleCourses}>
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}

<h2 id="wd-dashboard-published">Courses { `(${filteredCourses.length})`}</h2>

      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          
        {(displayedCourses).map((course) => (
  <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
    <div className="card rounded-3 overflow-hidden h-100">
      <Link
        to={`/Kanbas/Courses/${course._id}/Home`}
        className="wd-dashboard-course-link text-decoration-none text-dark"
      >
        <img src={"/Images/reactjs.png"} width="100%" height={160} alt={course.name} />
        <div className="card-body">
          <h5 className="wd-dashboard-course-title card-title" style={{ maxHeight: "3rem", minHeight: "3rem", overflowY: "hidden" }}>
            {course.name}
          </h5>
          <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: "100px", minHeight: "100px", overflowY: "hidden" }}>
            {course.description}
          </p>
          <button className="btn btn-primary">Go</button>
          {isFaculty && (
            <>
              <button onClick={(event) => {
                event.preventDefault();
                deleteCourse(course._id);
              }} className="btn btn-danger float-end">
                Delete
              </button>

              <button onClick={(event) => {
                event.preventDefault();
                setCourse(course);
              }} className="btn btn-warning me-2 float-end">
                Edit
              </button>
            </>
          )}

          {/* Render Enroll and Unenroll buttons for Students */}
          {(
            enrollments.some((enrollment: any) => enrollment.course === course._id && enrollment.user === currentUser._id) ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleUnenroll(course._id);
                }}
                className="btn btn-danger my-2 float-end"
              >
                Unenroll
              </button>
            ) : (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleEnroll(course._id);
                }}
                className="btn btn-success my-2 float-end"
              >
                Enroll
              </button>
            )
          )}
        </div>
      </Link>
    </div>
  </div>
))}

          
        </div>
      </div>
    </div>
  );
}
