
import React, { useState } from "react";
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_API_URL = `https://kanbas-node-server-app-5z6w.onrender.com/lab5/assignment`
  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      
      <input className="form-control w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
      <a id="wd-update-assignment-score"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      
      <input className="form-control w-75" id="wd-assignment-score"
      type="number"
        defaultValue={assignment.score} onChange={(e) =>
          setAssignment({ ...assignment, score:Number( e.target.value )})}/>
      <hr />
      <a
  id="wd-update-assignment-completed"
  className="btn btn-primary float-end"
  href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
>
  Update status
</a>

<input
  className="form-control w-75"
  id="wd-assignment-completed"
  
  checked={assignment.completed} 
  onChange={(e) =>
    setAssignment({ ...assignment, completed: e.target.checked }) 
  }
/>
<hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`https://kanbas-node-server-app-5z6w.onrender.com/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`https://kanbas-node-server-app-5z6w.onrender.com/lab5/assignment/title`}>
        Get Title
      </a><hr/>
    </div>
);}

