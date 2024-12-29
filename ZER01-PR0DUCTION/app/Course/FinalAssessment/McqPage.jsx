'use client';
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed and imported

export default function McqPage({ courseData, CourseId, user }) {
  const allMcqs = courseData?.FinalAssessment?.MCQs || [];
  const maxQuestions = 30; // Maximum number of questions to display
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Shuffle questions and options on component mount
  useEffect(() => {
    if (allMcqs.length > 0) {
      // Shuffle questions
      const shuffled = [...allMcqs].sort(() => Math.random() - 0.5);

      // Limit to maxQuestions
      const limitedQuestions = shuffled.slice(0, Math.min(maxQuestions, shuffled.length));

      // Shuffle options for each question
      const shuffledWithOptions = limitedQuestions.map((question) => ({
        ...question,
        Options: [...question.Options].sort(() => Math.random() - 0.5),
      }));

      setShuffledQuestions(shuffledWithOptions);
    }
  }, [allMcqs]);

  const totalQuestions = shuffledQuestions.length;

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
    shuffledQuestions.forEach((mcq, index) => {
      if (userAnswers[index] === mcq.CorrectOption) {
        correctCount += 1;
      }
    });
    const calculatedScore = (correctCount / totalQuestions) * 100;
    setScore(calculatedScore);
    setIsQuizCompleted(true);

    // Update the score in the database
    updateScore(calculatedScore);
  };

  // Update Score in Database
  const updateScore = async (calculatedScore) => {
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/score/forFinalMcq`, // Adjust API endpoint as needed
        {
          userId: user?.id,
          courseId: CourseId,
          score: calculatedScore,
        }
      );

      if (response.status === 200) {
        console.log("Score updated successfully:", response.data.message);
      } else {
        console.error("Failed to update the score:", response.data.message);
      }
    } catch (error) {
      console.error("Error while updating the score:", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      {/* Loading State */}
      {shuffledQuestions.length === 0 && (
        <p className="text-center text-xl font-semibold text-gray-500">No MCQs available.</p>
      )}

      {/* Quiz Section */}
      {!isQuizCompleted && shuffledQuestions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Question */}
          <div className="mb-6">
            <p className="text-xl font-medium mb-2 text-gray-700">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            <p className="text-2xl font-semibold text-gray-800">
              {shuffledQuestions[currentQuestionIndex].Question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-6">
            {shuffledQuestions[currentQuestionIndex].Options.map((option, i) => (
              <label key={i} className="block text-lg cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                <input
                  type="radio"
                  name={`mcq-${currentQuestionIndex}`}
                  value={option.Option}
                  checked={userAnswers[currentQuestionIndex] === option.Option}
                  onChange={() => handleOptionSelect(option.Option)}
                  className="mr-4"
                />
                {option.Option}
              </label>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={!userAnswers[currentQuestionIndex]} // Disable if no option selected
          >
            {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
          </button>
        </div>
      )}

      {/* Result Section */}
      {isQuizCompleted && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h4 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h4>
          <p className="text-xl font-semibold text-gray-800">
            Your Score: <span className="text-blue-500">{score.toFixed(2)}%</span>
          </p>
        </div>
      )}
    </div>
  );
}
