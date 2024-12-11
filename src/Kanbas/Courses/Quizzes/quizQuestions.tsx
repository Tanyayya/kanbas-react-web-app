import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as quizClient from "./client";

import {
  addQuestions,
  deleteQuestions,
  setQuestions,
  updateQuestions,
} from "./questionReducer";
import { FaPlus } from "react-icons/fa";

const QuizQuestions: React.FC = () => {
  const { cid, qid } = useParams();
  const [questionId, setQuestionId] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const defaultQuiz = {
    title:"",
    quiz: qid,
    type: "Multiple Choice",
    points: 1,
    questionText: "",
    choices: [{ text: "", correct: false }],
    
  };

  const { questions } = useSelector((state: any) => state.questionsReducer);
  const question =
    questions.find(
      (a: any) => a.quiz === qid && a._id === questionId
    ) || defaultQuiz;
  const [newQuestion, setNewQuestion] = useState({ ...question });
  

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "ADMIN";

  const fetchQuestions = async () => {
    const fetchedQuestions = await quizClient.findQuestionsForQuizzes(
      qid as string
    );
    dispatch(setQuestions(fetchedQuestions));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNewQuestionChange = (field: string, value: any) => {
    setNewQuestion((prev:any) => ({ ...prev, [field]: value }));
  };

  const handleNewChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...newQuestion.choices];
    updatedChoices[index].text = value;
    setNewQuestion((prev:any) => ({ ...prev, choices: updatedChoices }));
  };

  const handleAddChoice = () => {
    setNewQuestion((prev: any) => ({
      ...prev,
      choices: [
        ...prev.choices,
        { text: "", correct: false }, // Default new choice
      ],
    }));
  };
  

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = [...newQuestion.choices];
    updatedChoices.splice(index, 1);
    setNewQuestion((prev:any) => ({ ...prev, choices: updatedChoices }));
  };

  const handleMarkCorrect = (index: number) => {
    setNewQuestion((prev:any) => ({
      ...prev,
      choices: prev.choices.map((choice:any, i:any) => ({
        ...choice,
        correct: i === index,
      })),
     
    }));
  };

  const handleDeleteClick = (questionId: string) => {
    setQuizToDelete(questionId);
    setShowDeleteDialog(true);
  };

  const removeModule = async (quizId: string) => {
    await quizClient.deleteQuestion(quizId);
    dispatch(deleteQuestions(quizId));
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };

  const confirmDelete = async () => {
    if (quizToDelete) {
      await removeModule(quizToDelete);
    }
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };

  const saveQuestion = async (question: any) => {
    await quizClient.updateQuestion(question);
    dispatch(updateQuestions({
        ...question,
        _id: question._id.toString() // Convert ObjectId to string
      }));
      setQuestionId(null);
      setNewQuestion(defaultQuiz)
      
  };

  const createQuestionsForQuiz = async (qid: string, assignmentData: any) => {
    if (!qid) return;
    try {
      const newQuizQuestion = { ...newQuestion, quiz: qid };
      const question = await quizClient.createQuestionsForQuiz(
        qid,
        newQuizQuestion
      );
      dispatch(addQuestions(question));
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

 

  const handleSaveNewQuestion = async () => {
    console.log(questionId)
    
    console.log(qid)
    if (questionId) {
      const updatedOuestion = { ...newQuestion, _id: questionId };
      await saveQuestion(updatedOuestion);
    } else {
      const newQuizQuestion = {
        ...newQuestion,
        _id: new Date().getTime().toString(),
      };
      await createQuestionsForQuiz(qid!, newQuizQuestion);
    }
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Quiz Questions</h2>
      
      {isFaculty && (
        <div className="ms-auto">
          <button
            id="wd-add-assignments-btn"
            className="btn btn-md btn-danger me-1 float-end"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="position-relative" style={{ paddingRight: 1 }} />
            Add Questions
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* Question Form */}
                <div className="mb-3">
                  <label className="form-label">Question Type</label>
                  <select
                    className="form-select"
                    value={newQuestion.type}
                    onChange={(e) =>
                      handleNewQuestionChange("type", e.target.value)
                    }
                  >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Question Title</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newQuestion.title}
                    onChange={(e) =>
                      handleNewQuestionChange("title", e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Question Text</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={newQuestion.questionText}
                    onChange={(e) =>
                      handleNewQuestionChange("questionText", e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Points</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newQuestion.points}
                    onChange={(e) =>
                      handleNewQuestionChange("points", parseInt(e.target.value))
                    }
                  />
                </div>

                {/* Choices */}
                {newQuestion.type === "Multiple Choice" && (
  <div>
    {newQuestion.choices.map((choice: any, index: number) => (
      <div key={index} className="choice-row mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder={`Answer ${index + 1}`}
            value={choice.text}
            onChange={(e) => handleNewChoiceChange(index, e.target.value)}
          />
          <button
            className={`btn ${
              choice.correct ? "btn-success" : "btn-secondary"
            } ms-2`}
            onClick={() => handleMarkCorrect(index)}
          >
            {choice.correct ? "Correct" : "Mark"}
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDeleteChoice(index)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
    <button className="btn btn-secondary mt-3" onClick={handleAddChoice}>
      + Add Another Answer
    </button>
  </div>
)}

                 {/* True/False */}
                 {newQuestion.type === "True/False" && (
                  <div>
                    <label className="form-label">Answer</label>
                    <select
                      className="form-select"
                      value={newQuestion.choices[0]?.text || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewQuestion((prev: any) => {
                          const updatedChoices = prev.choices?.length
                            ? [...prev.choices] // Use existing choices
                            : [{ text: "true", correct: false }]; // Initialize if choices are empty
                      
                          // Update the text and ensure correct is true if it was false
                          updatedChoices[0] = {
                            text: value,
                            correct: updatedChoices[0]?.correct ? true : value !== "", // Set correct to true if false
                          };
                      
                          return {
                            ...prev,
                            choices: updatedChoices,
                          };
                        });
                      }}
                      
                    >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </div>
                )}

                {/* Fill in the Blank */}
                {newQuestion.type === "Fill in the Blank" && (
  <div>
    <label className="form-label">Correct Answers</label>
    {newQuestion.choices.map((choice: any, index: number) => (
      <div key={index} className="d-flex align-items-center mb-2">
        <input
          type="text"
          className="form-control"
          placeholder={`Correct answer ${index + 1}`}
          value={choice.text}
          onChange={(e) => {
            const value = e.target.value;
            setNewQuestion((prev: any) => {
              const updatedChoices = [...prev.choices];
              updatedChoices[index] = { text: value, correct: true }; // Mark as correct by default
              return { ...prev, choices: updatedChoices };
            });
          }}
        />
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={() => {
            setNewQuestion((prev: any) => {
              const updatedChoices = prev.choices.filter((_:any, i:any) => i !== index);
              return { ...prev, choices: updatedChoices };
            });
          }}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      className="btn btn-primary mt-2"
      onClick={() => {
        setNewQuestion((prev: any) => {
          const updatedChoices = [...prev.choices, { text: "", correct: true }]; // New correct answer
          return { ...prev, choices: updatedChoices };
        });
      }}
    >
      Add Answer
    </button>
  </div>
)}





              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveNewQuestion}
                >
                  Save Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <br></br>
      <br></br>
      <div className="questions-list">
      {questions.length > 0 ? (
        questions.map((question: any, index: number) => (
          <div key={question._id || index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{`Q${index + 1}: ${
                question.questionText || "Untitled Question"
              }`}</h5>
              <p className="card-text">
                <strong>Type:</strong> {question.type}
              </p>
              <p className="card-text">
                <strong>Points:</strong> {question.points}
              </p>

              {/* Choices */}
              {question.type === "Multiple Choice" && (
                <ul>
                  {question.choices.map((choice: any, idx: number) => (
                    <li
                      key={idx}
                      style={{
                        fontWeight: choice.correct ? "bold" : "normal",
                        color: choice.correct ? "green" : "black",
                      }}
                    >
                      {choice.text || `Answer ${idx + 1}`}
                    </li>
                  ))}
                </ul>
              )}
           
              {/* Action Buttons */}
              {isFaculty && (
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => {
                      setActiveQuestion(question);
                      setNewQuestion({
                        ...question, 
                      });
                      setQuestionId(question._id);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(question._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
              {showDeleteDialog && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this Question?</p>
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
          </div>
        ))
      ) : (
        <p>No questions available. Click "Add Questions" to create one.</p>
      )}
    </div>

      
      </div>
  );
};

export default QuizQuestions;
