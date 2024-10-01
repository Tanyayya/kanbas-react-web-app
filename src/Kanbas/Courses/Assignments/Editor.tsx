import { MdOutlineCalendarMonth } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4 w-75">
      <label htmlFor="wd-name" className="form-label">
        Assignment Name
      </label>
      <input id="wd-name" className="form-control" defaultValue="A1" />
      <br />

      <div
        id="wd-description"
        className="form-control"
        style={{
          border: "1px solid #ced4da",
          padding: "10px",
          borderRadius: "4px",
          height: "auto",
          whiteSpace: "pre-wrap", // Ensures line breaks are respected
        }}
      >
        The assignment is <span className="text-danger">available online</span>.{" "}
        <br />
        <br />
        Submit a link to the landing page of your Web application running on
        Netlify.
        <br />
        <br />
        The landing page should include the following:
        <li>Your full name and section</li>
        <li>Links to each of the lab assignments</li>
        <li> Link to the Kanbas application</li>
        <li>Links to all relevant source code repositories</li>
        <br />
        The Kanbas application should include a link to navigate back to the
        landing page.
      </div>
      <br />

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td className="text-end">
              <label htmlFor="wd-points" className="form-label">
                Points
              </label>
            </td>
            <td>
              <input
                id="wd-points"
                className="form-control"
                defaultValue={100}
              />
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <label htmlFor="wd-group" className="form-label">
                Assignment Group
              </label>
            </td>
            <td>
              <select id="wd-group" className="form-select">
                <option selected value="SCIFI">
                  ASSIGNMENTS
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <label htmlFor="wd-display-grade-as" className="form-label">
                Display Grade In
              </label>
            </td>
            <td>
              <select id="wd-display-grade-as" className="form-select">
                <option selected value="SCIFI">
                  Percentage
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <label htmlFor="wd-submission-type" className="form-label">
                Submission Type
              </label>
            </td>
            <td className="border border-rounded p-1 ">
              <select id="wd-submission-type" className="form-select">
                <option selected value="SCIFI">
                  Online
                </option>
              </select>
              <br />
              <b>Online Entry Options</b>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="text-entry"
                />
                <label className="form-check-label" htmlFor="text-entry">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="website-url"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="website-url">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="media-recordings"
                />
                <label className="form-check-label" htmlFor="media-recordings">
                  Media Recordings
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="student-annotation"
                />
                <label
                  className="form-check-label"
                  htmlFor="student-annotation"
                >
                  Student Annotation
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="file-uploads"
                />
                <label className="form-check-label" htmlFor="file-uploads">
                  File Uploads
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <label htmlFor="wd-assign-to" className="form-label">
                Assign
              </label>
            </td>
            <td>
              <input
                id="wd-assign-to"
                className="form-control"
                defaultValue="Everyone"
              />
              <br />
              <label htmlFor="wd-due-date" className="form-label">
                Due
              </label>

              <div className="input-group">
                <input
                  id="wd-until"
                  className="form-control"
                  defaultValue="May 13, 2024, 11:59 PM"
                  style={{ borderRadius: "0.175rem 0 0 0.175rem" }} // Optional: To match border radius with icon
                />
                <span
                  className="input-group-text"
                  style={{ borderRadius: "0 0.175rem 0.175rem 0" }}
                >
                  <MdOutlineCalendarMonth className="" />
                </span>
              </div>
              <br />

              <div className="row">
                <div className="col">
                  <label htmlFor="wd-available-from" className="form-label">
                    Available from
                  </label>
                  <div className="input-group">
                    <input
                      id="wd-until"
                      className="form-control"
                      defaultValue=""
                      style={{ borderRadius: "0.175rem 0 0 0.175rem" }} // Optional: To match border radius with icon
                    />
                    <span
                      className="input-group-text"
                      style={{ borderRadius: "0 0.175rem 0.175rem 0" }}
                    >
                      <MdOutlineCalendarMonth className="" />
                    </span>
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="wd-until" className="form-label">
                    Until
                  </label>
                  <div className="input-group">
                    <input
                      id="wd-until"
                      className="form-control"
                      defaultValue=""
                      style={{ borderRadius: "0.175rem 0 0 0.175rem" }} // Optional: To match border radius with icon
                    />
                    <span
                      className="input-group-text"
                      style={{ borderRadius: "0 0.175rem 0.175rem 0" }}
                    >
                      <MdOutlineCalendarMonth className="" />
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-end">
              <hr />
              <button className="btn btn-secondary me-2">Cancel</button>
              <button className="btn btn-danger">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
