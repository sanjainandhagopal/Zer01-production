'use client';
import React, { useState } from "react";

export default function McqPage({ courseData }) {
  const mcqs = courseData?.FinalAssessment?.MCQs || [];
  const totalQuestions = mcqs.length;

  // State Management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Handle Option Selection
  const handleOptionSelect = (selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: selectedOption,
    });
  };

  // Move to Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  // Calculate the Final Score
  const calculateScore = () => {
    let correctCount = 0;
    mcqs.forEach((mcq, index) => {
      if (userAnswers[index] === mcq.CorrectOption) {
        correctCount += 1;
      }
    });
    const calculatedScore = (correctCount / totalQuestions) * 100;
    setScore(calculatedScore);
    setIsQuizCompleted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4">Multiple Choice Questions</h3>

      {/* Loading State */}
      {mcqs.length === 0 && <p>No MCQs available.</p>}

      {/* Quiz Section */}
      {!isQuizCompleted && mcqs.length > 0 && (
        <div>
          {/* Question */}
          <p className="font-medium mb-4">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
          <p className="text-lg font-semibold mb-4">
            {mcqs[currentQuestionIndex].Question}
          </p>

          {/* Options */}
          <div className="ml-4">
            {mcqs[currentQuestionIndex].Options.map((option, i) => (
              <label key={i} className="block mb-2">
                <input
                  type="radio"
                  name={`mcq-${currentQuestionIndex}`}
                  value={option.Option}
                  checked={userAnswers[currentQuestionIndex] === option.Option}
                  onChange={() => handleOptionSelect(option.Option)}
                  className="mr-2"
                />
                {option.Option}
              </label>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={handleNextQuestion}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            disabled={!userAnswers[currentQuestionIndex]} // Disable if no option selected
          >
            {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
          </button>
        </div>
      )}

      {/* Result Section */}
      {isQuizCompleted && (
        <div className="mt-6">
          <h4 className="text-xl font-bold text-green-600 mb-4">
            Quiz Completed!
          </h4>
          <p className="text-lg font-semibold">
            Your Score: {score.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
