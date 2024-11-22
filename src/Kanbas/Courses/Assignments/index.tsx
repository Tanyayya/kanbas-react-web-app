import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AssignmentControls from './AssignmentControl';
import {  FaPlus, FaTrash } from 'react-icons/fa';
import LessonControlButtons from '../Modules/LessonControlButtons';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsGripVertical } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import * as coursesClient from "../client"
import * as assignmentClient from "./client"
import { setAssignments, addAssignment, editAssignment, updateAssignment, deleteAssignment } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function Assignments() {
  const { cid } = useParams(); 
  
  const dispatch = useDispatch();
  
  
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
 
  
 
  const isFaculty = currentUser?.role === "FACULTY";
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const courseAssignments = assignments;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForModules(cid as string);
    dispatch(setAssignments(assignments));
    
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
 


  const removeModule = async (courseId: string) => {
    await assignmentClient.deleteAssignment(courseId);
    dispatch(deleteAssignment(courseId));
  };


  const confirmDelete = async () => {
    if (assignmentToDelete) {
      await removeModule(assignmentToDelete); // Use your delete method
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };
  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };
  

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };
  return (
    <div className="w-100 p-5">
        <AssignmentControls cid={cid} />
      <br />
      <ul className="list-group rounded-0">
        <li className="wd-assignment-group list-group-item p-0 fs-5 border-gray">
          <div className="wd-title p-3 d-flex justify-content-between align-items-center bg-secondary">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="ms-2">Week 1 Assignments</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted me-4 border rounded-pill border-black p-2">
                40% of Total
              </span>
              <FaPlus className="me-2" aria-label="Add Assignment" />
              <IoEllipsisVertical className="fs-4" aria-label="More options" />
            </div>
          </div>
        </li>
        {assignments.length > 0 ? (
          assignments.map((assignment:any) => (
            <li
              key={assignment._id}
              className="list-group-item p-3 d-flex align-items-center"
              style={{ borderLeft: "4px solid green" }}>
              <BsGripVertical className="me-3 fs-2" />
              <TfiWrite className="me-3 text-success fs-4" style={{fontSize:'2rem'}}/>
              <div className="flex-grow-1">
                <Link
                  to={`${assignment._id}`}
                  className="text-decoration-none text-dark"
                >
                  <span className="fw-bold fs-5">{assignment.title}</span>
                </Link>
                <br />
                <small className="text-muted">
                  <span className="text-danger">{assignment.title}</span> |{" "}
                  <b>Not available until</b> {assignment.availableDate} at 12:00 am | <br />
                  <b>Due</b> {assignment.dueDate} at 11:59pm | {assignment.points} pts
                </small>
              </div>
              {isFaculty && (
        <FaTrash 
          className="text-danger me-3 mb-1 fs-5"  
          onClick={() => handleDeleteClick(assignment._id)} 
          style={{ cursor: 'pointer' }} 
        />
      )}
              <LessonControlButtons />
            </li>
          ))
        ) : (
          <p>No assignments available for this course.</p>
        )}
      </ul>
      {showDeleteDialog && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this assignment?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>No, Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}