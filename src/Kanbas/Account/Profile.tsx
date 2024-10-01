import { Link } from "react-router-dom";
import "./styles.css";
export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3">
      <h3>Profile</h3>
      <input
        id="wd-username"
        value="alice"
        placeholder="username"
        className="form-control mb-1"
      />
      <br />
      <input
        id="wd-password"
        value="123"
        placeholder="password"
        type="password"
        className="form-control mb-1"
      />
      <br />
      <input
        id="wd-firstname"
        value="Alice"
        placeholder="First Name"
        className="form-control mb-1"
      />
      <br />
      <input
        id="wd-lastname"
        value="Wonderland"
        placeholder="Last Name"
        className="form-control mb-1"
      />
      <br />
      <input
        id="wd-dob"
        value="2000-01-01"
        type="date"
        className="form-control mb-1"
      />
      <br />
      <input
        id="wd-email"
        value="alice@wonderland"
        type="email"
        className="form-control mb-1"
      />
      <br />
      <select id="wd-role" className="form-control mb-1">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />
      <Link
        id="wd-signin-btn"
        to="/Kanbas/Account/Signin"
        className="btn btn-danger w-100"
      >
        Sign out
      </Link>
    </div>
  );
}
