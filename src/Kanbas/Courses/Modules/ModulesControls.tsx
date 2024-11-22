import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdBlock } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  // Get current user role from Redux
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY"; // Check if user is faculty

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Render "+ Module" button only for FACULTY */}
      {isFaculty && (
        <button
          id="wd-add-module-btn"
          className="btn btn-md btn-danger me-1 float-end d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#wd-add-module-dialog"
        >
          <FaPlus className="me-2" />
          Module
        </button>
      )}

      {/* Render "Publish All" dropdown only for FACULTY */}
      {isFaculty && (
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
      )}

      {/* Remaining controls visible for all users */}
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

      <ModuleEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
