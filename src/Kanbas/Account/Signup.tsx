import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3">
      <h3>Sign up</h3>
      <input placeholder="username" className="form-control mb-1" />
      <br />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-1"
      />
      <br />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-1"
      />
      <br />
      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100">
        {" "}
        Sign up{" "}
      </Link>
      <br />
      <Link to="/Kanbas/Account/Signin" id="wd-signup-link">
        Sign in
      </Link>
    </div>
  );
}
