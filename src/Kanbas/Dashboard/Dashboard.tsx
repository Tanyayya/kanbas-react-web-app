import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enrollIntoCourse, enrollUser, unenrollFromCourse, unenrollUser } from "../Account/client";
import { useState } from "react";


export default function Dashboard({
  
  course,
  allCourses,
  enrolledCourses,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  setEnrolledCourses,
   
}: {
  
  course: any;
  allCourses: any[];
  enrolledCourses:any[];
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  setEnrolledCourses: (courses: any[]) => void;
  
   
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showAllCourses, setShowAllCourses] = useState(false); 
  const toggleCourses = () => setShowAllCourses(!showAllCourses); 

    
  const isEnrolled = (courseId: string): boolean =>
    enrolledCourses.some((course:any) => course._id === courseId);
  
  
  const handleEnroll = async (courseId: string) => {
    try {
      await enrollIntoCourse( currentUser._id,courseId );
      setEnrolledCourses([...enrolledCourses, allCourses.find((c) => c._id === courseId)]);
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await unenrollFromCourse(  currentUser._id ,courseId);
      setEnrolledCourses(enrolledCourses.filter((c:any) => c._id !== courseId));
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };
  const isFaculty = currentUser?.role === "ADMIN";
  
  const displayedCourses = showAllCourses ? allCourses : enrolledCourses;
  console.log(enrolledCourses)
  
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
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: "100px", minHeight: "100px", overflowY: "hidden" }}
                    >
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


{isEnrolled(course._id) ? (
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


