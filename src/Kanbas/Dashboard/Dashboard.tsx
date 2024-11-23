import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addEnrollment, findEnrolledCourses, getEnrollment } from "../Account/client";

export default function Dashboard({
  courses,
  course,
  setCourse,
  allCourses,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  allCourses: any[];
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState<Record<string, boolean>>({});
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [displayedCourses, setDisplayedCourses] = useState(allCourses);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (currentUser?._id) {
        const data = await findEnrolledCourses(currentUser._id);
        setEnrolledCourses(data);

        // Populate enrollment status for each course
        const status: Record<string, boolean> = {};
        data.forEach((course: any) => {
          status[course._id] = true;
        });
        setEnrollmentStatus(status);
      }
    };
    fetchEnrolledCourses();
  }, [currentUser]);

  const toggleCourses = () => {
    setShowAllCourses(!showAllCourses);
    setDisplayedCourses(showAllCourses ?   enrolledCourses: allCourses );
  };

  const handleEnroll = async (courseId: string) => {
    if (currentUser?._id) {
      const enrollment = { userId: currentUser._id, courseId };
      const updatedEnrolledCourses = await addEnrollment(enrollment);

      // Update state
      setEnrolledCourses(updatedEnrolledCourses);
      setEnrollmentStatus({ ...enrollmentStatus, [courseId]: true });

      if (!showAllCourses) setDisplayedCourses(updatedEnrolledCourses);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (currentUser?._id) {
      const enrollmentExists = await getEnrollment(currentUser._id, courseId);

      if (enrollmentExists) {
        const updatedEnrolledCourses = enrolledCourses.filter(
          (course) => course._id !== courseId
        );

        // Update state
        setEnrolledCourses(updatedEnrolledCourses);
        setEnrollmentStatus({ ...enrollmentStatus, [courseId]: false });

        if (!showAllCourses) setDisplayedCourses(updatedEnrolledCourses);
      }
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

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

      <button className="btn btn-info float-end" onClick={toggleCourses}>
        {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
      </button>

      <h2 id="wd-dashboard-published">Courses ({displayedCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden h-100">
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img src={course.img} width="100%" height={160} alt={course.name} />
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
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                        >
                          Delete
                        </button>

                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                    {enrollmentStatus[course._id] ? (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleUnenroll(course._id);
                        }}
                        className="btn btn-danger float-end my-2"
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleEnroll(course._id);
                        }}
                        className="btn btn-success float-end my-2"
                      >
                        Enroll
                      </button>
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