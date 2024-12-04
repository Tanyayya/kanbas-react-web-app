import { useEffect, useState } from "react";

import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import * as client from "../../Account/client";
export default function PeopleDetails() {
  const { uid} = useParams();
  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow-lg w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2 mb-3">
        <FaUserCircle className="text-secondary fs-1" />
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        {!editing ? (
          <>
            <h4
              className="text-dark fw-bold m-0 wd-name"
              style={{ cursor: "pointer" }}
              onClick={() => setEditing(true)}
            >
              {user.firstName} {user.lastName}
            </h4>
            <FaPencil
              onClick={() => setEditing(true)}
              className="fs-5 text-primary wd-edit"
              title="Edit User"
              style={{ cursor: "pointer" }}
            />
          </>
        ) : (
          <>
            <input
              className="form-control w-75 mx-0 me-auto"
              defaultValue={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveUser();
              }}
            />
            <FaCheck
              onClick={() => saveUser()}
              className="fs-5 text-success ms-2 wd-save"
              title="Save Changes"
              style={{ cursor: "pointer" }}
            />
          </>
        )}
      </div>

      <hr />

      <div className="mb-3">
        <b>Roles:</b>{" "}
        <span className="text-primary">{user.role || "N/A"}</span>
      </div>
      <div className="mb-3">
        <b>Login ID:</b>{" "}
        <span className="text-primary">{user.loginId || "N/A"}</span>
      </div>
      <div className="mb-3">
        <b>Section:</b>{" "}
        <span className="text-primary">{user.section || "N/A"}</span>
      </div>
      <div className="mb-3">
        <b>Total Activity:</b>{" "}
        <span className="text-primary">{user.totalActivity || "N/A"}</span>
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <button
          onClick={() => deleteUser(uid)}
          className="btn btn-danger w-45 fw-bold"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary w-45 fw-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}