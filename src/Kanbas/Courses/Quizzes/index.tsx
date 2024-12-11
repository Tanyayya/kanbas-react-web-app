import { useParams ,Link, useNavigate} from "react-router-dom";
import QuizControls from "./QuizControl";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuizz, setQuizzes } from "./reducer";
import * as coursesClient from "../client"
import * as quizClient from "./client"
import { addQuizzes, updateQuiz } from "./reducer";
import { FaBan } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsGripVertical } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import {  FaPlus, FaTrash } from 'react-icons/fa';
import LessonControlButtons from '../Modules/LessonControlButtons';
import GreenCheckmark from "../Modules/GreenCheckmark";
import QuizLessonControlButtons from "./QuizLessonControlButtons";
export default function Quizzes() {
    const { cid } = useParams(); 
   
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
      };
  
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState<string | null>(null);
    const toggleMenu = (quizId: string) => {
    setShowMenu(showMenu === quizId ? null : quizId);
  };

  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  const isFaculty = currentUser?.role === "ADMIN";
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourses(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const handleDeleteClick = (quizId: string) => {
    setQuizToDelete(quizId);
    setShowDeleteDialog(true);
  };
  const handleEdit = (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation(); // Prevent the click from propagating to the parent element
    navigate(`${quizId}`);
    
  };
  

  
  
  useEffect(() => {
    fetchQuizzes();
  }, []);

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
  const getAvailabilityStatus = (availableDate: string, dueDate: string) => {
    const currentDate = new Date();
    const availableDateObj = new Date(availableDate);
    const dueDateObj = new Date(dueDate);

    if (currentDate < availableDateObj) {
      return `Not available until ${formatDate(availableDateObj.toLocaleDateString())} at 12:00 am`;
    } else if (currentDate > dueDateObj) {
      return "Closed";
    } else {
      return "Available";
    }
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
              <span className="ms-2">Assignment Quizzes</span>
            </div>
            <div className="d-flex align-items-center">
              
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
                  to={`${assignment._id}/details`}
                  
                  className="text-decoration-none text-dark"
                >
                  <span className="fw-bold fs-5">{assignment.title}</span>
                </Link>
                <br />
                <small className="text-muted">
                  <span className="text-danger">{assignment.title}</span> |{" "}
                  Availablilty - 
                  <b>{getAvailabilityStatus(assignment.availableDate, assignment.dueDate)}</b> | <br />
                  <b>Due</b> {formatDate(assignment.dueDate)} at 11:59pm | {assignment.points} pts
                </small>
              </div>
             
              <div className="float-end me-3 d-flex align-items-center fs-5">
              {currentUser.role === 'FACULTY' && (
  <>
    {assignment.published ? (
      <GreenCheckmark />
    ) : (
      <span className="position-relative d-inline-block" style={{ width: "1.5em", height: "1.5em" }}>
        <FaBan
          className="text-danger position-absolute"
          style={{ top: 3, left: 0, fontSize: "1.1em" }}
        />
      </span>
    )}

    <div className="align-content-center justify-content-end">
      {/* Render QuizLessonControlButtons only for Faculty */}
      <QuizLessonControlButtons courseId={cid || ''} quizId={assignment._id.toString()} published={assignment.isPublished} />
    </div>
  </>
)}
    </div>
            </li>
          ))
        ) : (
          <p>No Quizzes available for this course.</p>
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