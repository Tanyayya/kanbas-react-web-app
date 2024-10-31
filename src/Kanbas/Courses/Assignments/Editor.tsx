

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { addAssignment } from "./reducer";
import { addAssignment, updateAssignment } from "./reducer"; // Ensure you import updateAssignment


export default function AssignmentEditor() {
    const { cid, aid } = useParams();
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { assignments } = useSelector((state:any) => state.assignmentsReducer);

    const defaultAssignment = {
        title: "New assignment",
        description: "New description",
        points: 0,
        course: cid,
        dueDate: "",
        availableDate: "",
        assignmentGroup: "Assignments",
        displayGradeAs: "Percentage",
        submissionType: "Online",
        onlineEntryOptions: {
            textEntry: false,
            websiteUrl: false,
            mediaRecordings: false,
            studentAnnotations: false,
            fileUploads: false,
        },
    };

    const assignment = assignments.find((a:any) => a.course === cid && a._id === aid) || defaultAssignment;
    const [formData, setFormData] = useState({ ...assignment });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
    
        setFormData((prevData:any) => {
            if (type === "checkbox") {
                // For checkbox updates, nested inside onlineEntryOptions
                return {
                    ...prevData,
                    onlineEntryOptions: {
                        ...prevData.onlineEntryOptions,
                        [id]: checked,
                    },
                };
            } else {
                // For input, textarea, and select elements
                return {
                    ...prevData,
                    [id]: value,
                };
            }
        });
    };
    

    const handleSave = () => {
        if (aid) {
            dispatch(updateAssignment({ ...formData, _id: aid })); 
        } else {
            const newAssignment = { ...formData, _id: aid || new Date().getTime().toString() };
            dispatch(addAssignment(newAssignment)); 
        }
        navigate(`/Kanbas/Courses/${cid}/Assignments`); 
    };
    
    

    return (
        <div id="wd-css-styling-forms" className="container my-4">
            <h1>{formData.title || "New Assignment"}</h1>
            
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Assignment Name</label>
                <input id="title" className="form-control" value={formData.title} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <textarea id="description" className="form-control" rows={5} value={formData.description} onChange={handleInputChange} />
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-5 text-end">
                    <label htmlFor="points" className="form-label">Points</label>
                </div>
                <div className="col-md-7">
                    <input id="points" type="number" className="form-control" value={formData.points} onChange={handleInputChange} />
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-5 text-end">
                    <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
                </div>
                <div className="col-md-7">
                    <select id="assignmentGroup" className="form-select" value={formData.assignmentGroup} onChange={handleInputChange}>
                        <option value="Assignments">Assignments</option>
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Projects">Projects</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-5 text-end">
                    <label htmlFor="displayGradeAs" className="form-label">Display Grade As</label>
                </div>
                <div className="col-md-7">
                    <select id="displayGradeAs" className="form-select" value={formData.displayGradeAs} onChange={handleInputChange}>
                        <option value="Percentage">Percentage</option>
                        <option value="GPA">GPA</option>
                        <option value="Scores">Scores</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-5 text-end">
                    <label htmlFor="submissionType" className="form-label">Submission Type</label>
                </div>
                <div className="col-md-7">
                    <select id="submissionType" className="form-select" value={formData.submissionType} onChange={handleInputChange}>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>

                    {formData.submissionType === "Online" && (
                        <div className="border border-gray p-3 rounded mt-2">
                            <h6><b>Online Entry Options</b></h6>
                            {["textEntry", "websiteUrl", "mediaRecordings", "studentAnnotations", "fileUploads"].map(option => (
                                <div className="form-check" key={option}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={option}
                                        checked={formData.onlineEntryOptions[option]}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor={option} className="form-check-label">
                                        {option.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-5 text-end">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                </div>
                <div className="col-md-7">
                    <input id="dueDate" type="date" className="form-control" value={formData.dueDate} onChange={handleInputChange} />
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-5 text-end">
                    <label htmlFor="availableDate" className="form-label">Available From</label>
                </div>
                <div className="col-md-7">
                    <input id="availableDate" type="date" className="form-control" value={formData.availableDate} onChange={handleInputChange} />
                </div>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <Link
                id="wd-cancel-btn"
                to={`/Kanbas/Courses/${cid}/Assignments`}
                className="btn btn-secondary me-2">
                Cancel
                </Link>
                <Link
                    to={`/Kanbas/Courses/${cid}/Assignments`}
                    onClick={handleSave}
                    className="btn btn-danger me-2">
                    Save
                </Link>
            </div>
        </div>
    );
}

