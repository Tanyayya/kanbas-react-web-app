import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import { IoIosStats } from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";
import { SiGoogleanalytics } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
        <button className="btn btn-lg btn-secondary w-100 text-nowrap d-flex align-items-center">
  <MdDoNotDisturbAlt className="me-1 fs-4" /> 
  Unpublish
</button>

        </div>
        <div className="w-50">
        <button className="btn btn-lg btn-success w-100 text-nowrap d-flex align-items-center">
  <FaCheckCircle className="me-2 fs-4" /> 
  Publish
</button>
        </div>
      </div>
      <br />

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" />
        Import Existing Content
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" />
        Import from Commons
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoMdHome className="me-2 fs-5" />
        choose Home Page
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosStats className="me-2 fs-5" />
        View Course Stream
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" />
        New Announcement
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <SiGoogleanalytics className="me-2 fs-5" />
        New Analytics
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" />
        View Course Notifications
      </button>
    </div>
  );
}
