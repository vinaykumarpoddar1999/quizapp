import { useState } from "react";
import { quizData } from "./data";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [end, setEnd] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(0);
  const [alert, setAlert]= useState(false)
  const handleAnswers = (qId, aId) => {
    setAnswers({ ...answers, [qId]: aId });
    console.log(answers);
  };
  const handleNext = () => {
    if(answers[currentQuestion+1]){
      setCurrentQuestion(currentQuestion + 1);
      setAlert(false)
    }
    else{
      setAlert(true)
    }
   
    if (currentQuestion == quizData.quiz.questions.length - 2) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  };

  const handleResult = () => {
    // const res =quizData.quiz.questions.reduce((question,acc)=>{if(question.correctAnswerId==answers[question.id]){
    //   acc=acc+1
    // }},0)

    const res = quizData.quiz.questions.filter((q) => {
      console.log(q.correctAnswerId, answers[q.id]);
      if (q.correctAnswerId == answers[q.id]) {
        return q;
      }
    });
    setResult(res.length);
    console.log(res);
  };

  return (
    <>
      {!start && !isSubmitted && (
        <div>
          <h1>{quizData.quiz.title}</h1>
          <p>{quizData.quiz.description}</p>
          <button
            onClick={() => {
              setStart(true);
            }}
          >
            Start Quiz
          </button>
        </div>
      )}

      {start && !isSubmitted && (
        <>
          <div>
            <h2>{quizData.quiz.questions[currentQuestion].question}</h2>
            {quizData.quiz.questions[currentQuestion].options.map(
              (option, index) => (
                <div>
                  <input
                    key={index}
                    type="radio"
                    name={quizData.quiz.questions[currentQuestion].id}
                    value={option.text}
                    checked={
                      option.id ==
                      answers[quizData.quiz.questions[currentQuestion].id]
                    }
                    onChange={() => {
                      handleAnswers(
                        quizData.quiz.questions[currentQuestion].id,
                        option.id
                      );
                    }}
                  />
                  <label>{option.text}</label>
                </div>
              )
            )}
          </div>
          {alert && <h2> Please Answer This Mandatory Question</h2>}
          <div style={{ display: "flex" }}>
            <div>
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
            </div>
            <div>
              {!end && (
                <button
                  disabled={
                    currentQuestion === quizData.quiz.questions.length - 1
                  }
                  onClick={() => {
                    handleNext();
                  }}
                >
                  Next
                </button>
              )}
              {end && (
                <button
                  onClick={() => {
                    setIsSubmitted(true);
                    handleResult();
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {isSubmitted && (
        <div>
          <h1>Quiz Finished</h1>
          <p>Your Result</p>
          <h1>{result}/10</h1>
          <h2>You are {result > 6 ? "Pass" : "Fail"}</h2>
        </div>
      )}
    </>
  );
}

export default App;
