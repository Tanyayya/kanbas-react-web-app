import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <NavLink
        to={`/Kanbas/Account/Signin`}
        className={({ isActive }) =>
          `list-group-item text-danger p-2 list-group-item-border ${
            isActive ? "active" : ""
          }`
        }
      >
        Signin
      </NavLink>
      <br />
      <NavLink
        to={`/Kanbas/Account/Signup`}
        className={({ isActive }) =>
          `list-group-item text-danger p-2 list-group-item-border ${
            isActive ? "active" : ""
          }`
        }
      >
        Signup
      </NavLink>
      <br />
      <NavLink
        to={`/Kanbas/Account/Profile`}
        className={({ isActive }) =>
          `list-group-item text-danger p-2 list-group-item-border ${
            isActive ? "active" : ""
          }`
        }
      >
        Profile
      </NavLink>
      <br />
    </div>
  );
}
