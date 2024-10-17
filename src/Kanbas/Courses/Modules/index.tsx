import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useLocation } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { courseId } = useParams(); // Retrieve courseId from route params
  const modules = db.modules; // Assuming modules come from the Database
  const { pathname } = useLocation(); 

  console.log(courseId);
  console.log(modules);
  
  return (
    <div className="w-100 p-5">
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />

      <ul id="wd-modules" className="list-group-item rounded-0 border-top ">
        {/* Filter modules based on courseId */}
        {modules
          .filter((module: any) => module.course === pathname.split("/")[3]) // Filter by courseId
          .map((module: any) => (
            <li 
              key={module.id} 
              className="wd-module list-group-item p-0 mb-5 fs-5  "
              
            >
              <div className="wd-title p-2 bg-secondary d-flex align-items-center justify-content-between border border-1 border-black border-bottom-0">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="fs-3" />
                  <span>{module.name}</span>
                </div>
                <ModuleControlButtons />
              </div>

              {/* Check if lessons exist and render them */}
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0 border-top-none">
                  {module.lessons.map((lesson: any) => (
                    <li 
                      key={lesson.id} 
                      className="wd-lesson list-group-item p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
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
