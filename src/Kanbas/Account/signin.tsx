import { Link } from "react-router-dom";
import "./styles.css";
export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-3">
      <h3>Sign in</h3>
      <input
        id="wd-username"
        placeholder="username"
        className="form-control mb-1"
      />
      <br />
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-1"
      />
      <br />
      <Link
        id="wd-signin-btn"
        to="/Kanbas/Account/Profile"
        className="btn btn-primary w-100"
      >
        Sign in{" "}
      </Link>
      <br />
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
