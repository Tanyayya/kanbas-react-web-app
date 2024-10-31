import ModulesControls from "./ModulesControls";
import React, { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useLocation } from "react-router";

export default function Modules() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  const dispatch = useDispatch();
  
  // Check if current user has the FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="w-100 p-5">
      
      
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }}
        />
      

      <br />
      <br />
      <br />
      <br />

      <ul id="wd-modules" className="list-group-item rounded-0 border-top">
        {modules
          .filter((module: any) => module.course === pathname.split("/")[3])
          .map((module: any) => (
            <li key={module.id} className="wd-module list-group-item p-0 mb-5 fs-5">
              <div className="wd-title p-2 bg-secondary d-flex align-items-center justify-content-between border border-1 border-black border-bottom-0">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <input
                      className="form-control w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(updateModule({ ...module, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>

                {/* Render ModuleControlButtons only if the user is FACULTY */}
                {isFaculty && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                )}
              </div>

              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0 border-top-none">
                  {module.lessons.map((lesson: any) => (
                    <li key={lesson.id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      
                      {/* Render LessonControlButtons only if the user is FACULTY */}
                      {isFaculty && <LessonControlButtons />}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
