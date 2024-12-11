import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getLastAttempt } from "./client"; // Import your function to fetch last attempt
import { useSelector } from "react-redux";

const QuizResultPage: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const studentId = currentUser._id; // Assuming studentId is in the URL params
  const { qid } = useParams(); // The quizId
  const { state } = useLocation(); // Can be used for navigation state (if needed)

  const [lastAttempt, setLastAttempt] = useState<any>(null); // To store the last attempt data
  const [error, setError] = useState<string | null>(null); // To store error if fetching fails

  // Fetch the last attempt data when the component mounts
  useEffect(() => {
    const fetchLastAttemptData = async () => {
      try {
        const data = await getLastAttempt(qid as string, studentId as string);
        setLastAttempt(data); // Store the data in state
      } catch (error) {
        setError("Failed to fetch last attempt data.");
        console.error(error);
      }
    };

    fetchLastAttemptData();
  }, [qid, studentId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!lastAttempt) {
    return <div>Loading...</div>;
  }

  const { answers, score, questions } = lastAttempt;

  // Ensure that `questions` exists and is an array before calling `find`
  const getQuestionText = (questionId: string) => {
    if (Array.isArray(questions)) {
      const question = questions.find((q: any) => q._id === questionId);
      return question ? question.questionText : "Unknown Question";
    }
    return "No questions available"; // Fallback if questions is undefined or not an array
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Quiz Results</h2>
      <h5>Your Score: {score}</h5>
      <div className="row">
        {answers?.map((answer: any, index: number) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Question {index + 1}</strong>
                </h5>
                <p className="card-text">
                  <strong>Question:</strong> {getQuestionText(answer.question)}
                </p>
                <p className="card-text">
                  <strong>Your Answer:</strong> {answer.selectedAnswer}
                </p>
                <p className="card-text">
                  <strong>Result:</strong>{" "}
                  <span style={{ color: answer.correct ? "green" : "red" }}>
                    {answer.correct ? "✔️ Correct" : "❌ Incorrect"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResultPage;
