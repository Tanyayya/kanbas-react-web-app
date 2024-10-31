import { FaPlus, FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { GoPlus } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AssignmentControls({ cid }:any) {
   
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const isFaculty = currentUser?.role === "FACULTY";
    return (
      <div id="wd-modules-controls" className="text-nowrap">
        <div className="d-flex justify-content-between align-items-center my-3">
        
        {isFaculty && (
          <div className="ms-auto">
          <Link
            id="wd-add-assignments-btn"
            className="btn btn-md btn-danger me-1 float-end"
            to={`/Kanbas/Courses/${cid}/Assignments/new`}
          >
            <FaPlus className="position-relative" style={{ bottom: "1px", paddingRight:1}} />
            Assignment
          </Link>
          <button
            id="wd-group-assignments-btn"
            className="btn btn-md btn-secondary me-1 float-end"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </button>
          </div>
        )}
        </div>
      </div>
    );
  }