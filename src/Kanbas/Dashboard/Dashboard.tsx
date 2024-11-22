import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse } from "./reducer";
import { useEffect, useState } from "react";
import { addEnrollment, findEnrolledCourses } from "../Account/client";


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
  allCourses:any[];
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";
  const [showAllCourses, setShowAllCourses] = useState(false); 
  const [displayedCourses, setDisplayedCourses] = useState(allCourses);
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (currentUser?._id) {
        const data = await findEnrolledCourses(currentUser._id);
        
        setEnrolledCourses(data);
        
      }
    };
    fetchEnrolledCourses();
  }, [currentUser]);

  // const toggleCourses = async () => {
  //   setShowAllCourses(!showAllCourses);
  //   if (!showAllCourses) {
  //     const enrolledCourses = await findEnrolledCourses(currentUser._id);
      
  //     setDisplayedCourses(enrolledCourses);
  //   } else {
  //     setDisplayedCourses(allCourses);
  //   }
  // };

  
  const toggleCourses = () => {
    setShowAllCourses(!showAllCourses);
    setDisplayedCourses(showAllCourses ? allCourses : enrolledCourses);
  };
  

  const handleEnroll = async (courseId: string) => {
    if (currentUser?._id) {
      const enrollment = { userId: currentUser._id, courseId };
      const updatedEnrolledCourses = await addEnrollment(enrollment);
      setEnrolledCourses(updatedEnrolledCourses);
      if (!showAllCourses) setDisplayedCourses(updatedEnrolledCourses);
    }
  };
  console.log(enrolledCourses)
  // Handle unenroll action
  const handleUnenroll = async (courseId: string) => {
    if (currentUser?._id) {
      const enrollment = { userId: currentUser._id, courseId };
      // Implement the unenroll logic (e.g., API call to delete enrollment)
      // Mocking the response for now by filtering the enrolled courses list:
      const updatedEnrolledCourses = enrolledCourses.filter(
        (course) => course._id !== courseId
      );
      setEnrolledCourses(updatedEnrolledCourses);
      if (!showAllCourses) setDisplayedCourses(updatedEnrolledCourses);
    }
  };
  

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
                  to={`/Kanbas/Courses/${course._id}/Home`} // Corrected syntax
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

                    
                    {displayedCourses ? (
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
