import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (3)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/course1.jpeg" width={200} />
            <div>
              <h5>
                 CS1234 React JS

                 </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
            </Link>
        </div>
        <br/>
        <div className="wd-dashboard-course"> <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/course1.jpeg" width={200} />
            <div>
              <h5>
                 CS1234 Javascript

                 </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
            </Link> </div>
            <br/>
        <div className="wd-dashboard-course"> <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/course1.jpeg" width={200} />
            <div>
              <h5>
                 CS1234 Node

                 </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
            </Link> </div>
      </div>
    </div>
  );
}
