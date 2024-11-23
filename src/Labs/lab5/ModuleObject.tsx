
import React, { useState } from "react";
export default function ModuleObjects() {
  const [module, setModule] = useState({
    id: 1, name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const MODULE_API_URL = `https://kanbas-node-server-app-5z6w.onrender.com/lab5/module`
  return (
    <div>
      <h3 id="wd-module-objects">Module Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update name
      </a>
      <input className="form-control w-75" id="wd-module-name"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />
      <a id="wd-update-module-description"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${module.description}`}>
        Update description
      </a>
      <input className="form-control w-75" id="wd-module-description"
        defaultValue={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/>
      <hr />
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={`https://kanbas-node-server-app-5z6w.onrender.com/lab5/module`}>
        Get Module
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-module-module" className="btn btn-primary"
         href={`https://kanbas-node-server-app-5z6w.onrender.com/lab5/module/name`}>
        Get Module Name
      </a><hr/>
    </div>
);}

