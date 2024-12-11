import React, { useState, useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import * as questionsClient from "./client";
import { useParams } from "react-router";
import {addQuestions,deleteQuestions,setQuestions,updateQuestions} from "./questionReducer";
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
  const {qid}=useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [answers, setAnswers] = useState<
    { question: string; selectedAnswer: string;correct:boolean }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { questions } = useSelector((state: any) => state.questionsReducer);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionsClient.findQuestionsForQuizzes(qid as string); // Replace with actual API URL
        if (!response) {
          throw new Error("Failed to fetch questions");
        }
        //console.log(response);
        const data: Question[] = response;
        dispatch(setQuestions(data));
        
        
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
      //console.log('questions',questions);
      setIsLoading(false);
    };

    fetchQuestions();
  }, [qid]);


  const handleAnswerChange = (question: string, selectedAnswer: string) => {
    setAnswers((prevAnswers) => {
        const updatedAnswers = prevAnswers.map((answer) =>
            answer.question === question ? { ...answer, selectedAnswer } : answer
          );
          const Question = questions.find((q:any) => q.id === question);

          if (!updatedAnswers.find((answer) => answer.question === Question)) {
            updatedAnswers.push({ question,
                 selectedAnswer, 
                 correct: Question ? Question.correctAnswer === selectedAnswer : false, 
                });
          }
          return updatedAnswers;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
        
        const Attemptanswers=answers.map((answer)=>{
            const question = questions.find((q:any) => q._id === answer.question);
            console.log('selected ans',answer.selectedAnswer,'correct ans',question.correctAnswer);
            return {
                question: answer.question,
                selectedAnswer: answer.selectedAnswer,
                correct: question ? question.correctAnswer === answer.selectedAnswer : false
            };
            
        });
        const score = calculateScore(Attemptanswers);
      const attempt = {
        attemptNumber: 1, 
        // answers: answers.map((answer) => {
        //   const question = questions.find((q:any) => q._id === answer.question);
        //   console.log('selected ans',answer.selectedAnswer,'correct ans',question.correctAnswer);
        //   return {
        //     question: answer.question,
        //     selectedAnswer: answer.selectedAnswer,
        //     correct: question ? question.correctAnswer === answer.selectedAnswer : false
        //   };
        // }),
        answers:Attemptanswers,
        score: score,
        completedAt: new Date(),
      };
      
      
      const response = await questionsClient.createAttempt(qid!, currentUser._id, attempt);
      setAnswers(attempt.answers);
      console.log('answers after submitting',attempt.answers);
      setSubmitted(true);
      console.log("Quiz attempt saved successfully!");
    } catch (err: any) {
      setError(err.message);
      console.error("Error submitting quiz attempt:", err);
    }
  };
  

  const calculateScore = (
    answers: { question: string; selectedAnswer: string; correct: boolean }[]
  ): number => {
    console.log('calculating score...');
    let score = 0;  
    console.log('answers',answers);
  
    for (const answer of answers) {
      const question = questions.find((q: any) => q._id === answer.question);
        console.log('question',question);
        console.log('correct?',answer.correct);
      if (question && answer.correct) {
        console.log('adding scores');
        console.log(question.points); 
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
        {questions.map((question:any, index:any) => (
          <div className="card mb-3" key={question.id}>
            <div className="card-body">
              <h5 className="card-title">
                Question {index + 1}: {question.questionText}
              </h5>
              {question.choices.map((choice:any,idx:number) => (
                <div className="form-check" key={choice}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question-${question._id}`}
                    id={`${question._id}-idx`}
                    value={choice.text}
                    // onChange={() =>
                    //   handleAnswerChange(question.id, choice)
                    // }
                    checked={
                        answers.find(
                          (answer) => answer.question === question._id
                        )?.selectedAnswer === choice.text
                      } // Set checked based on current state
                      onChange={() =>
                        handleAnswerChange(question._id, choice.text)
                      }
                  />
                  <label
                    htmlFor={`${question.id}-${choice}`}
                    className="form-check-label"
                  >
                    {choice.text}
                  </label>
                </div>
              ))}
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