import React, { useEffect, useState } from "react";
import { getQuiz } from "./client"; // Assuming the API function
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizDetails = () => {
  const [quiz, setQuiz] = useState<any>(null); // Store quiz data
  const [closed,setClosed]=useState(false);
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  const [availabilityStatus, setAvailabilityStatus] = useState<string>("");
 
  const getAvailabilityStatus = (quizData: any) => {
    const currentDate = new Date();

    if (quizData?.availableDate && quizData?.untilDate) {
      const availableDate = new Date(quizData.availableDate);
      const untilDate = new Date(quizData.untilDate);

      if (currentDate < availableDate) {
        return `Not available until ${availableDate.toLocaleDateString()}`;
      } else if (currentDate > untilDate) {
        setClosed(true)
        return "Closed";
      } else {
        return "Available";
      }
    }

    return "No availability data"; // In case dates are not set
  };
  // Fetch quiz details when the component mounts
  useEffect(() => {
    const fetchQuizDetails = async () => {
        if (qid) {
      const quizData = await getQuiz(qid);
      setQuiz(quizData);
      const status = getAvailabilityStatus(quizData); // Get availability status after quiz data is fetched
        setAvailabilityStatus(status)
        }
    };
    fetchQuizDetails();
  }, [qid]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };
  const handleStartQuiz = () => {
    // Navigate to the quiz attempt page for students
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/view`)
  };


  // Ensure the quiz data is loaded
  if (!quiz) {
    return <div>Loading...</div>;
  }
  

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center' // Center all text inside the container
    }}>
        
        {currentUser.role === 'ADMIN' && (
  <div>
    <button
      onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/view`)}
      style={{
        margin: '10px 2px',
        padding: '8px 15px',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd'
      }}
    >
      Preview
    </button>
    <button
      onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
      style={{
        marginLeft: '10px',
        padding: '8px 15px',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#ffa500',
        color: '#fff',
        border: '1px solid #ddd',
      }}
    >
      Edit
    </button>
  </div>
)}
      <div style={{
        display: 'flex',
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center',
        flexDirection: 'column' // Stack the elements vertically
      }}>
        
        <h3 style={{ fontSize: '24px', fontWeight: '600' }}>{quiz.title}</h3>
       
        
      </div>

      
        <div style={{ marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', padding: '0', margin: '20px 0' }}>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Quiz Type:</strong> {quiz.type}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Points:</strong> {quiz.points}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Assignment Group:</strong> {quiz.assignmentGroup}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Time Limit:</strong> {quiz.timeLimit} minutes</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Access Code :</strong> {quiz.accessCode}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}</li>
            <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</li>

          </ul>
        </div>
       
        <div>
        {currentUser.role != 'ADMIN' && (availabilityStatus != "Closed") && (
          <button style={{
            padding: '12px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '50%',
            marginTop: '20px'
          }} onClick={handleStartQuiz}>Start Quiz</button>

          )}
          <br></br>
          {currentUser.role != 'ADMIN' && (
          <button style={{
            padding: '12px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '50%',
            marginTop: '20px'
          }}onClick={()=> navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`)}>Quiz Results</button>
        )}
        </div>
       
      

      {/* Table for Date/Time Details */}
      <div style={{ marginTop: "20px" }}>
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
            textAlign: "center",
            border: "1px solid #ddd", // Add border for clarity
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "8px", fontSize: "16px", fontWeight: "600", textAlign: "center" }}>
                <strong>Due</strong>
              </th>
              <th style={{ padding: "8px", fontSize: "16px", fontWeight: "600", textAlign: "center" }}>
                <strong>For</strong>
              </th>
              <th style={{ padding: "8px", fontSize: "16px", fontWeight: "600", textAlign: "center" }}>
                <strong>Available from</strong>
              </th>
              <th style={{ padding: "8px", fontSize: "16px", fontWeight: "600", textAlign: "center" }}>
                <strong>Until</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", fontSize: "16px" }}>{formatDate(quiz.dueDate)}</td>
              <td style={{ padding: "8px", fontSize: "16px" }}>Everyone</td>
              <td style={{ padding: "8px", fontSize: "16px" }}>{formatDate(quiz.availableDate)}</td>
              <td style={{ padding: "8px", fontSize: "16px" }}>{formatDate(quiz.untilDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizDetails;