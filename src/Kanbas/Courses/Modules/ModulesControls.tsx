import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdBlock } from "react-icons/md";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button
        id="wd-add-module-btn"
        className="btn btn-md btn-danger me-1 float-end d-flex align-items-center"
      >
        <FaPlus className="me-2" />
        Module
      </button>
      
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-md btn-secondary dropdown-toggle d-flex align-items-center"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          <span className="ms-1">Publish All</span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item d-flex align-items-center"
              href="#"
            >
              <GreenCheckmark />
              <span className="ms-2">Publish all modules and items</span>
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item d-flex align-items-center"
              href="#"
            >
              <GreenCheckmark />
              <span className="ms-2">Publish modules only</span>
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-all-modules-and-items"
              className="dropdown-item d-flex align-items-center"
              href="#"
            >
              <MdBlock />
              <span className="ms-2">Unpublish all modules and items</span>
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-modules-only"
              className="dropdown-item d-flex align-items-center"
              href="#"
            >
              <MdBlock />
              <span className="ms-2">Unpublish modules only</span>
            </a>
          </li>
        </ul>
      </div>

      <button
        id="wd-view-progress-btn"
        className="btn btn-md btn-secondary me-1 float-end d-flex align-items-center"
      >
        <FaPlus className="me-2" />
        View Progress
      </button>

      <button
        id="wd-collapse-all-btn"
        className="btn btn-md btn-secondary me-1 float-end d-flex align-items-center"
      >
        <FaPlus className="me-2" />
        Collapse All
      </button>
    </div>
  );
}
