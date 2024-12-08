import { useParams ,Link} from "react-router-dom";
import QuizControls from "./QuizControl";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuizz, setQuizzes } from "./reducer";
import * as coursesClient from "../client"
import * as quizClient from "./client"
import { useEffect, useState } from "react";
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsGripVertical } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import {  FaPlus, FaTrash } from 'react-icons/fa';
import LessonControlButtons from '../Modules/LessonControlButtons';
export default function Quizzes() {
    const { cid } = useParams(); 
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
      };
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  const isFaculty = currentUser?.role === "ADMIN";
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourses(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  const handleDeleteClick = (quizId: string) => {
    setQuizToDelete(quizId);
    setShowDeleteDialog(true);
  };
  const removeModule = async (courseId: string) => {
    await quizClient.deleteQuiz(courseId);
    dispatch(deleteQuizz(courseId));
  };
  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };
  const confirmDelete = async () => {
    if (quizToDelete) {
      await removeModule(quizToDelete); // Use your delete method
    }
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };
    return (
        <div>
        <QuizControls cid={cid}/>
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
        {quizzes.length > 0 ? (
          quizzes.map((assignment:any) => (
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
                  <b>Not available until</b> {formatDate(assignment.availableDate)} at 12:00 am | <br />
                  <b>Due</b> {formatDate(assignment.dueDate)} at 11:59pm | {assignment.points} pts
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
    )
  
}