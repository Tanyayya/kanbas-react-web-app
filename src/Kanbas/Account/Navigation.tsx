import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
      <div id="wd-account-navigation" className="wd list-group fs-6 rounded-0 mr-3">
        {currentUser ? (
          <Link 
          to="/Kanbas/Account/Profile" id="wd-course-home-link"
          className={`${pathname.includes("Profile")?"list-group-item active border border-0":"list-group-item text-danger border border-0"}`}>
            Profile
          </Link>):(
            <>
               <Link to="/Kanbas/Account/Signin" id="wd-course-home-link"
               className={`${pathname.includes("Signin")?"list-group-item active border border-0":"list-group-item text-danger border border-0"}`}>Sign In</Link><br/>
              <Link to="/Kanbas/Account/Signup" id="wd-course-home-link"
                className={`${pathname.includes("Signup")?"list-group-item active border border-0":"list-group-item text-danger border border-0"}`}>Sign Up</Link><br/>  
            </>
          )}
      </div>
);}


