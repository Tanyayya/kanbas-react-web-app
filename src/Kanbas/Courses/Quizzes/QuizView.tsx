import React, { useState, useEffect } from "react";
import * as questionsClient from "./client";
import { useParams, useNavigate } from "react-router";
import { setQuestions } from "./questionReducer";
import { useDispatch, useSelector } from "react-redux";

interface Question {
  quiz: string; // ObjectId as a string
  type: 'Multiple Choice' | 'True/False' | 'Fill in the Blank';
  questionText: string;
  points: number;
  choices: { text: string; correct: boolean }[]; // Array of choice objects
  correctAnswer: string;
}

const QuizPreview: React.FC = () => {
  const { qid, cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [answers, setAnswers] = useState<
    { question: string; selectedAnswer: string; correct: boolean }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { questions } = useSelector((state: any) => state.questionsReducer);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionsClient.findQuestionsForQuizzes(qid as string);
        if (!response) {
          throw new Error("Failed to fetch questions");
        }
        const data: Question[] = response;
        dispatch(setQuestions(data));
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    fetchQuestions();
  }, [qid]);

  const handleAnswerChange = (question: string, selectedAnswer: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) =>
        answer.question === question ? { ...answer, selectedAnswer } : answer
      );
      const Question = questions.find((q: any) => q.id === question);
      
      if (!updatedAnswers.find((answer) => answer.question === Question)) {
        updatedAnswers.push({
          question,
          selectedAnswer,
          correct: Question
          ? Question.choices.some(
              (choice: any) => choice.correct && choice.text === selectedAnswer
            )
          : false,
      
        });
      }
      return updatedAnswers;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const Attemptanswers = answers.map((answer) => {
        const question = questions.find((q: any) => q._id === answer.question);

        if (!question) {
          throw new Error(`Question not found for id: ${answer.question}`);
        }

        const correctChoice = question.choices.find((choice: any) => choice.correct);

        return {
          question: answer.question,
          selectedAnswer: answer.selectedAnswer,
          correct: correctChoice ? correctChoice.text === answer.selectedAnswer : false,
        };
      });

      const score = calculateScore(Attemptanswers);

      const attempt = {
        attemptNumber: 1,
        answers: Attemptanswers,
        score: score,
        completedAt: new Date(),
      };

      const response = await questionsClient.createAttempt(qid!, currentUser._id, attempt);
      setAnswers(attempt.answers);
      setSubmitted(true);

      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`, {
        state: {
          answers: Attemptanswers,
          score: score,
          questions: questions,
        },
      });
    } catch (err: any) {
      setError(err.message);
      console.error("Error submitting quiz attempt:", err);
    }
  };

  const calculateScore = (
    answers: { question: string; selectedAnswer: string; correct: boolean }[]
  ): number => {
    let score = 0;
    for (const answer of answers) {
      const question = questions.find((q: any) => q._id === answer.question);
      if (question && answer.correct) {
        score += question.points;
      }
    }
    return score;
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (submitted) {
    return (
      <div className="text-center mt-5">
        <h3>Quiz Submitted Successfully!</h3>
        <p>Your answers have been recorded.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Quiz Instructions</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question: any, index: any) => (
          <div className="card mb-3" key={question.id}>
            <div className="card-body">
              <h5 className="card-title">
                Question {index + 1}: {question.questionText}
              </h5>
              {question.type === "Multiple Choice" && (
                question.choices.map((choice: any, idx: number) => (
                  <div className="form-check" key={choice.text}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${question._id}`}
                      id={`${question._id}-${idx}`}
                      value={choice.text}
                      checked={
                        answers.find((answer) => answer.question === question._id)?.selectedAnswer ===
                        choice.text
                      }
                      onChange={() => handleAnswerChange(question._id, choice.text)}
                    />
                    <label htmlFor={`${question._id}-${idx}`} className="form-check-label">
                      {choice.text}
                    </label>
                  </div>
                ))
              )}

              {question.type === "True/False" && (
                ["True", "False"].map((choice: string, idx: number) => (
                  <div className="form-check" key={choice}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${question._id}`}
                      id={`${question._id}-${idx}`}
                      value={choice}
                      checked={
                        answers.find((answer) => answer.question === question._id)?.selectedAnswer ===
                        choice
                      }
                      onChange={() => handleAnswerChange(question._id, choice)}
                    />
                    <label htmlFor={`${question._id}-${idx}`} className="form-check-label">
                      {choice}
                    </label>
                  </div>
                ))
              )}

              {question.type === "Fill in the Blank" && (
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name={`question-${question._id}`}
                    value={
                      answers.find((answer) => answer.question === question._id)?.selectedAnswer || ""
                    }
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizPreview;
