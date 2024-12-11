import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaBan, FaPencilAlt, FaTrash } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import * as quizClient from "./client";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuizz, updateQuiz } from "./reducer";

export default function QuizLessonControlButtons({
  courseId,
  quizId,
  published,
}: {
  courseId: string;
  quizId: string;
  published: boolean;
}) {
  const [publish, setPublish] = useState<boolean>(published);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Sync state with the latest publish status from Redux or API
    setPublish(published);
  }, [published]);

  const handleDeleteQuiz = () => {
    dispatch(deleteQuizz(quizId));
    quizClient.deleteQuiz(quizId);
  };

  const handlePublishQuiz = async (bool: boolean) => {
    const result = await quizClient.updateQuizPublish(quizId, { published: bool });
    console.log(result);
    if (result.modifiedCount === 1) {
      setPublish(bool);
      dispatch(updateQuiz({ quizId, published: bool })); // Update Redux state
    }
  };

  const handleEditQuiz = () => {
    navigate(`${quizId}`);
  };

  return (
    <div>
      <div className="dropdown dropend float-end">
        {/* {publish ? (
          <GreenCheckmark />
        ) : (
          <span
            className="position-relative d-inline-block"
            style={{ width: "1.5em", height: "1.5em" }}
          >
            <FaBan
              className="text-danger position-absolute"
              style={{ top: 3, left: 0, fontSize: "1.1em" }}
            />
          </span>
        )} */}
        <button
          id="wd-quiz-lesson-control-btn"
          className="btn border border-0"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <IoEllipsisVertical className="fs-4" />
        </button>
        <ul
          className="dropdown-menu p-0"
          aria-labelledby="wd-quiz-lesson-control-btn"
        >
          <li>
            <button className="dropdown-item" onClick={handleEditQuiz}>
              Edit
              <FaPencilAlt className="float-end" />
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleDeleteQuiz}>
              Delete
              <FaTrash className="float-end" />
            </button>
          </li>
          {publish ? (
            <li>
              <button
                className="dropdown-item"
                onClick={() => handlePublishQuiz(false)}
              >
                Unpublish
                <IoIosCloseCircle className="float-end fs-5" />
              </button>
            </li>
          ) : (
            <li>
              <button
                className="dropdown-item"
                onClick={() => handlePublishQuiz(true)}
              >
                Publish
                <IoIosCheckmarkCircle className="float-end fs-5" />
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
