import { FaPlus, FaSearch } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizControls({ cid }:any) {
   
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const isFaculty = currentUser?.role === "ADMIN";
    return (
      <div id="wd-modules-controls" className="text-nowrap">
        <div className="d-flex justify-content-between align-items-center my-3">
        
        {isFaculty && (
          <div className="ms-auto">
          <Link
            id="wd-add-assignments-btn"
            className="btn btn-md btn-danger me-1 float-end"
            to={`/Kanbas/Courses/${cid}/Quizzes/new`}
          >
            <FaPlus className="position-relative" style={{ bottom: "1px", paddingRight:1}} />
             Add Quiz
          </Link>
          
          </div>
        )}
        </div>
      </div>
    );
  }