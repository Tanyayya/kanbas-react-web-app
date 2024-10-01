import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <NavLink
        to={`/Kanbas/Account/Signin`}
        className={({ isActive }) =>
          `list-group-item p-2 list-group-item-border text-danger ${
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
          `list-group-item p-2 list-group-item-border text-danger ${
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
          `list-group-item p-2 list-group-item-border text-danger ${
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
